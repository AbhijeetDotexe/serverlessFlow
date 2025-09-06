import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code, 
  Globe, 
  BarChart3, 
  Shield, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Deployment',
      description: 'Deploy your serverless functions in seconds with our lightning-fast infrastructure.',
      gradient: 'from-warning-400 to-error-500',
      bgGradient: 'from-warning-50 to-error-50 dark:from-warning-900/20 dark:to-error-900/20',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Write code in your favorite language with our intuitive code editor and debugging tools.',
      gradient: 'from-primary-500 to-accent-600',
      bgGradient: 'from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Automatically scale globally with edge computing and intelligent load balancing.',
      gradient: 'from-success-400 to-primary-600',
      bgGradient: 'from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Monitor performance, track usage, and get insights with comprehensive logging.',
      gradient: 'from-accent-400 to-error-500',
      bgGradient: 'from-accent-50 to-error-50 dark:from-accent-900/20 dark:to-error-900/20',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Built-in security features including authentication, authorization, and encryption.',
      gradient: 'from-primary-400 to-accent-600',
      bgGradient: 'from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20',
    },
    {
      icon: DollarSign,
      title: 'Cost Efficient',
      description: 'Pay only for what you use with our transparent, usage-based pricing model.',
      gradient: 'from-success-400 to-success-600',
      bgGradient: 'from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20',
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      text: 'No server management required',
    },
    {
      icon: Clock,
      text: 'Millisecond cold start times',
    },
    {
      icon: Rocket,
      text: 'Auto-scaling capabilities',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-success-500/20 dark:from-primary-400/20 dark:via-accent-400/20 dark:to-success-400/20 animate-gradient-xy"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-accent-500/20 to-success-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-r from-success-500/20 to-primary-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-r from-warning-500/20 to-error-500/20 rounded-full blur-2xl animate-bounce-slow"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-success-600 dark:from-primary-400 dark:via-accent-400 dark:to-success-400 bg-clip-text text-transparent animate-gradient-x">
                Build. Deploy. Scale.
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Serverless Functions Made Simple.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Experience the future of cloud computing with our next-generation serverless platform. 
              Deploy functions instantly, monitor in real-time, and scale effortlessly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/create"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/functions"
                className="group relative inline-flex items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white border-2 border-gray-200/50 dark:border-gray-600/50 hover:border-primary-300 dark:hover:border-primary-500 font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-900/20 dark:to-accent-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                View Functions
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="h-5 w-5 text-success-500" />
                  <span>{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose 
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent"> ServerlessFlow</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the power of modern serverless computing with features designed for developers who demand excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative p-8 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/30 hover:border-white/40 dark:hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 overflow-hidden`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-success-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                <div className="relative">
                  <motion.div 
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-success-500/10 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-success-400/10 animate-gradient-x"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-gradient-to-r from-accent-400/20 to-success-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Go 
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent animate-gradient-x"> Serverless</span>?
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building the future with our serverless platform.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
              to="/create"
                className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-primary-500/25 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
              Create Your First Function
                  <Rocket className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
                </div>
            </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;