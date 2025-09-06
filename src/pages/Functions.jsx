import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Eye, 
  ExternalLink, 
  Code, 
  Calendar,
  Plus,
  Zap
} from 'lucide-react';
import { useFunctions } from '../contexts/FunctionsContext';

const Functions = () => {
  const { functions } = useFunctions();

  const handleRunAgain = async (func) => {
    try {
      const response = await fetch('/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          functionCode: func.code,
          params: func.params || {},
          actionName: func.name
        }),
      });

      const data = await response.json();
      console.log('Function executed:', data);
      // You could update the function with new execution data here
    } catch (error) {
      console.error('Failed to run function:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your 
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent animate-gradient-x"> Functions</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage and monitor your deployed serverless functions.
              </p>
            </div>
            
            <Link
              to="/create"
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Function
            </Link>
          </div>
        </motion.div>

        {functions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-900/60 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/30 max-w-2xl mx-auto shadow-2xl">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="h-20 w-20 text-primary-400 dark:text-primary-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Functions Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Create your first serverless function to get started with our platform.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Function
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functions.map((func, index) => (
              <motion.div
                key={func.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gradient-to-br from-white/70 to-gray-50/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/30 hover:border-primary-300/50 dark:hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/50 dark:from-primary-900/20 dark:to-accent-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Code className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {func.name}
                      </h3>
                      {func.createdAt && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(func.createdAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {func.activationId && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-gray-100/60 to-gray-200/60 dark:from-gray-700/40 dark:to-gray-600/40 rounded-2xl backdrop-blur-sm">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Activation ID
                    </span>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
                      {func.activationId}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <motion.button
                    onClick={() => handleRunAgain(func)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 hover:from-success-200 hover:to-success-300 dark:hover:from-success-800/50 dark:hover:to-success-700/50 text-success-700 dark:text-success-300 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-4 w-4" />
                    <span>Run</span>
                  </motion.button>

                  {func.activationId && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                      to={`/logs?id=${func.activationId}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 hover:from-primary-200 hover:to-primary-300 dark:hover:from-primary-800/50 dark:hover:to-primary-700/50 text-primary-700 dark:text-primary-300 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Logs</span>
                    </Link>
                    </motion.div>
                  )}

                  {func.webUrl && (
                    <motion.a
                      href={func.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 hover:from-accent-200 hover:to-accent-300 dark:hover:from-accent-800/50 dark:hover:to-accent-700/50 text-accent-700 dark:text-accent-300 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open</span>
                    </motion.a>
                  )}
                </div>

                {func.result && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl backdrop-blur-sm">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Last Result
                    </span>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 mt-1 truncate font-mono">
                      {JSON.stringify(func.result, null, 2).substring(0, 100)}
                      {JSON.stringify(func.result, null, 2).length > 100 && '...'}
                    </pre>
                  </div>
                )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Functions;