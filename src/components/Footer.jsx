import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-success-500/10 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-success-400/10 animate-gradient-x"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur-lg opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 dark:from-primary-400 dark:via-accent-400 dark:to-primary-300 bg-clip-text text-transparent">
              ServerlessFlow
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto"
          >
            Build, deploy, and scale serverless functions with ease. 
            The future of cloud computing is here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span>Made with</span>
            <Heart className="h-4 w-4 text-error-500 animate-pulse" />
            <span>for developers</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;