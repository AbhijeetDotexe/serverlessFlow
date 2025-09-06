import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateFunction from './pages/CreateFunction';
import Functions from './pages/Functions';
import Logs from './pages/Logs';
import { ThemeProvider } from './contexts/ThemeContext';
import { FunctionsProvider } from './contexts/FunctionsContext';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <ThemeProvider>
      <FunctionsProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-accent-400/20 to-success-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-300/10 to-accent-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
            
            <Navbar />
            
            <AnimatePresence mode="wait">
              <motion.main
                key={currentPath}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="pt-16 relative z-10"
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<CreateFunction />} />
                  <Route path="/functions" element={<Functions />} />
                  <Route path="/logs" element={<Logs />} />
                </Routes>
              </motion.main>
            </AnimatePresence>

            <Footer />
          </div>
        </Router>
      </FunctionsProvider>
    </ThemeProvider>
  );
}

export default App;