import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Copy, CheckCircle, Terminal, Loader2, RefreshCw } from 'lucide-react';

const Logs = () => {
  const [searchParams] = useSearchParams();
  const [activationId, setActivationId] = useState(searchParams.get('id') || '');
  const [activations, setActivations] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActivations, setIsLoadingActivations] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchActivations();
    if (searchParams.get('id')) {
      setActivationId(searchParams.get('id'));
      fetchLogs(searchParams.get('id'));
    }
  }, [searchParams]);

  const fetchActivations = async () => {
    setIsLoadingActivations(true);
    try {
      const response = await fetch('http://localhost:3000/project/logs');
      const data = await response.json();
      console.log("Logs API response: ", data);

      // Use the correct key from your API response
      setActivations(data.logs || []);
    } catch (error) {
      console.error('Error fetching activations:', error);
    } finally {
      setIsLoadingActivations(false);
    }
  };

  const fetchLogs = async (id) => {
    if (selectedLogs[id]) {
      setSelectedLogs(prev => {
        const newLogs = { ...prev };
        delete newLogs[id];
        return newLogs;
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/logs/${id}`);
      const data = await response.json();
      
      let logsContent;
      if (data.logs && typeof data.logs === 'object' && data.logs.logs && Array.isArray(data.logs.logs)) {
        logsContent = data.logs.logs.join('\n');
      } else if (Array.isArray(data.logs)) {
        logsContent = data.logs.join('\n');
      } else if (typeof data.logs === 'string') {
        logsContent = data.logs;
      } else {
        logsContent = `No logs found for activation ID: ${id}\nRaw response: ${JSON.stringify(data, null, 2)}`;
      }
      
      setSelectedLogs(prev => ({
        ...prev,
        [id]: logsContent
      }));
    } catch (error) {
      setSelectedLogs(prev => ({
        ...prev,
        [id]: `Error fetching logs: ${error.message}`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (activationId.trim()) {
      fetchLogs(activationId);
    }
  };

  const copyLogs = async (logs) => {
    try {
      await navigator.clipboard.writeText(logs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy logs');
    }
  };

  const downloadLogs = (logs, id) => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${id}-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatLogDisplay = (logs) => {
    if (!logs) return 'No logs available';
    
    return logs.split('\n').map((line, index) => {
      let className = 'text-success-400';
      if (line.includes('ERROR') || line.includes('error') || line.includes('Error')) {
        className = 'text-error-400';
      } else if (line.includes('WARN') || line.includes('warn') || line.includes('Warning')) {
        className = 'text-warning-400';
      } else if (line.includes('INFO') || line.includes('info')) {
        className = 'text-info-400';
      } else if (line.includes('DEBUG') || line.includes('debug')) {
        className = 'text-gray-400';
      }
      
      return (
        <div key={index} className={className}>
          {line}
        </div>
      );
    });
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
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/30 sticky top-24 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Search Logs
                </h2>
                <motion.button
                  onClick={fetchActivations}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <RefreshCw className={`h-5 w-5 ${isLoadingActivations ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {/* Search Box */}
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

                {/* Fetch Button */}
                <motion.button
                  onClick={handleSearch}
                  disabled={!activationId.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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

                {/* Recent Activations */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recent Activations
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {isLoadingActivations ? (
                      <div className="text-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary-600" />
                      </div>
                    ) : activations.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No activations found
                      </p>
                    ) : (
                      activations.map((activation) => (
                        <motion.div
                          key={activation._id}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 cursor-pointer hover:shadow-md transition-all"
                          onClick={() => {
                            setActivationId(activation.activationId);
                            fetchLogs(activation.activationId);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {activation.activationId}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {activation.uuid}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                {formatDate(activation.createdAt)}
                              </p>
                            </div>
                            {selectedLogs[activation.activationId] && (
                              <div className="w-2 h-2 bg-success-500 rounded-full ml-2"></div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Logs Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
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
                  {!activationId && (
                    <motion.div 
                      className="text-center py-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Terminal className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">
                        Select an activation to view logs
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

                  {activationId && selectedLogs[activationId] && (
                    <div className="relative">
                      <div className="flex items-center justify-end space-x-2 mb-4">
                        <motion.button
                          onClick={() => copyLogs(selectedLogs[activationId])}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs flex items-center space-x-1 transition-colors"
                        >
                          {copied ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </motion.button>
                        <motion.button
                          onClick={() => downloadLogs(selectedLogs[activationId], activationId)}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs flex items-center space-x-1 transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </motion.button>
                      </div>
                      
                      <div className="text-success-400 whitespace-pre-wrap break-words leading-relaxed space-y-1">
                        {formatLogDisplay(selectedLogs[activationId])}
                      </div>
                    </div>
                  )}
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
