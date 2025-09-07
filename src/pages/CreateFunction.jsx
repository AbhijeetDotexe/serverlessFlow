import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, Copy, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import { useFunctions } from '../contexts/FunctionsContext';
import { useTheme } from '../contexts/ThemeContext';

const CreateFunction = () => {
  const [functionCode, setFunctionCode] = useState(`// Your serverless function
function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from serverless!',
      timestamp: new Date().toISOString(),
      event: event
    })
  };
}`);

  const [actionName, setActionName] = useState('hello-world');
  const [params, setParams] = useState('{}');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState({});

  const { addFunction } = useFunctions();
  const { isDark } = useTheme();

  const deployFunction = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          functionCode,
          params: JSON.parse(params || '{}'),
          actionName
        }),
      });

      const data = await response.json();
      setResult(data);
      
      // Add to functions list
      addFunction({
        id: data.activationId || Date.now().toString(),
        name: actionName,
        code: functionCode,
        ...data,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      setResult({
        error: error.message || 'Failed to deploy function'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [key]: true });
      setTimeout(() => {
        setCopied({ ...copied, [key]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
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
            Create 
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent animate-gradient-x"> Function</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Write, deploy, and test your serverless functions with our powerful editor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Function Code
              </h2>
              <div className="border border-gray-200/50 dark:border-gray-600/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  theme={isDark ? 'vs-dark' : 'vs-light'}
                  value={functionCode}
                  onChange={setFunctionCode}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Action Name
                </label>
                <input
                  type="text"
                  value={actionName}
                  onChange={(e) => setActionName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300 hover:shadow-md"
                  placeholder="my-function"
                />
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parameters (JSON)
                </label>
                <textarea
                  value={params}
                  onChange={(e) => setParams(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white resize-none transition-all duration-300 hover:shadow-md"
                  placeholder='{"key": "value"}'
                />
              </motion.div>
            </div>

            <motion.button
              onClick={deployFunction}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 flex items-center justify-center space-x-2 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Deploy & Run</span>
                </>
              )}
              </div>
            </motion.button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Deployment Results
              </h2>

              {!result && !isLoading && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Play className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Click "Deploy & Run" to see your results here
                  </p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Loader2 className="h-16 w-16 text-purple-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Deploying your function...
                  </p>
                </motion.div>
              )}

              {result && !result.error && (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {result.activationId && (
                    <motion.div 
                      className="bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/30 dark:to-success-800/30 border border-success-200 dark:border-success-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success-500" />
                          <span className="font-medium text-success-800 dark:text-success-300">
                            Activation ID
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.activationId, 'activationId')}
                          className="p-2 hover:bg-success-100 dark:hover:bg-success-800 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          {copied.activationId ? (
                            <CheckCircle className="h-4 w-4 text-success-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-success-600 dark:text-success-400" />
                          )}
                        </button>
                      </div>
                      <code className="block mt-2 text-sm text-success-700 dark:text-success-300 bg-success-100/50 dark:bg-success-800/30 p-3 rounded-xl font-mono">
                        {result.activationId}
                      </code>
                    </motion.div>
                  )}

                  {result.webUrl && (
                    <motion.div 
                      className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border border-primary-200 dark:border-primary-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-5 w-5 text-primary-500" />
                          <span className="font-medium text-primary-800 dark:text-primary-300">
                            Web URL
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(result.webUrl, 'webUrl')}
                            className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            {copied.webUrl ? (
                              <CheckCircle className="h-4 w-4 text-primary-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                            )}
                          </button>
                          <a
                            href={result.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-all duration-200 hover:scale-110"
                          >
                            <ExternalLink className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                          </a>
                        </div>
                      </div>
                      <code className="block mt-2 text-sm text-primary-700 dark:text-primary-300 bg-primary-100/50 dark:bg-primary-800/30 p-3 rounded-xl break-all font-mono">
                        {result.webUrl}
                      </code>
                    </motion.div>
                  )}

                  {result.result && (
                    <motion.div 
                      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-300">
                          Function Result
                        </span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(result.result, null, 2), 'result')}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          {copied.result ? (
                            <CheckCircle className="h-4 w-4 text-success-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-xl overflow-x-auto font-mono shadow-inner">
                        {JSON.stringify(result.result, null, 2)}
                      </pre>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {result && result.error && (
                <motion.div 
                  className="bg-gradient-to-r from-error-50 to-error-100 dark:from-error-900/30 dark:to-error-800/30 border border-error-200 dark:border-error-700 rounded-2xl p-4 shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-error-800 dark:text-error-300">
                      Deployment Error
                    </span>
                  </div>
                  <p className="text-error-700 dark:text-error-300">
                    {result.error}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateFunction;