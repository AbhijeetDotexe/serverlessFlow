import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, Copy, CheckCircle, Terminal, Loader2 } from 'lucide-react';

const Logs = () => {
  const [searchParams] = useSearchParams();
  const [activationId, setActivationId] = useState(searchParams.get('id') || '');
  const [logs, setLogs] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchLogs(searchParams.get('id'));
    }
  }, [searchParams]);

  useEffect(() => {
    if (logs && logs !== typewriterText) {
      setTypewriterText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index < logs.length) {
          setTypewriterText(logs.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 10);

      return () => clearInterval(timer);
    }
  }, [logs]);

  const fetchLogs = async (id) => {
    setIsLoading(true);
    setLogs('');
    setTypewriterText('');

    try {
      const response = await fetch(`/logs/${id}`);
      const data = await response.json();
      
      if (data.logs) {
        setLogs(data.logs);
      } else if (data.error) {
        setLogs(`Error: ${data.error}`);
      } else {
        setLogs('No logs found for this activation ID');
      }
    } catch (error) {
      setLogs(`Error fetching logs: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (activationId.trim()) {
      fetchLogs(activationId);
    }
  };

  const copyLogs = async () => {
    try {
      await navigator.clipboard.writeText(logs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy logs');
    }
  };

  const downloadLogs = () => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${activationId}-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Function 
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent animate-gradient-x"> Logs</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            View real-time logs and debug information for your serverless functions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/30 sticky top-24 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Search Logs
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activation ID
                  </label>
                  <input
                    type="text"
                    value={activationId}
                    onChange={(e) => setActivationId(e.target.value)}
                    placeholder="Enter activation ID..."
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                <motion.button
                  onClick={handleSearch}
                  disabled={!activationId.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Fetch Logs</span>
                    </>
                  )}
                  </div>
                </motion.button>

                {logs && (
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={copyLogs}
                      className="flex-1 bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 hover:from-success-200 hover:to-success-300 dark:hover:from-success-800/50 dark:hover:to-success-700/50 text-success-700 dark:text-success-300 font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>

                    <motion.button
                      onClick={downloadLogs}
                      className="flex-1 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 hover:from-primary-200 hover:to-primary-300 dark:hover:from-primary-800/50 dark:hover:to-primary-700/50 text-primary-700 dark:text-primary-300 font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Logs Display Section */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
              {/* Terminal glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-success-500/5 via-primary-500/5 to-accent-500/5 opacity-50 animate-pulse-slow"></div>
              
              <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Terminal className="h-5 w-5 text-success-400" />
                  </motion.div>
                  <span className="text-success-400 font-semibold">Function Logs</span>
                </div>
                {activationId && (
                  <span className="text-xs text-gray-400 font-mono bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-700/50">
                    {activationId}
                  </span>
                )}
              </div>

              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 min-h-[500px] font-mono text-sm relative overflow-hidden border border-gray-800/50 shadow-inner">
                {/* Matrix-like background effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-success-500/20 via-transparent to-transparent"></div>
                </div>
                
                {!logs && !isLoading && (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Terminal className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-400">
                      Enter an activation ID to view logs
                    </p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Loader2 className="h-16 w-16 text-success-400 animate-spin mx-auto mb-4" />
                    <motion.p 
                      className="text-success-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Fetching logs...
                    </motion.p>
                  </motion.div>
                )}

                {typewriterText && (
                  <div className="relative">
                    <pre className="text-success-400 whitespace-pre-wrap break-words leading-relaxed">
                      {typewriterText}
                      <motion.span 
                        className="text-success-300"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ▋
                      </motion.span>
                    </pre>
                  </div>
                )}

                {/* Terminal-like decorative elements */}
                <div className="absolute top-2 left-2 flex space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-error-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 bg-warning-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 bg-success-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  ></motion.div>
                </div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Logs;