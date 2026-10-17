import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center bg-bg relative overflow-hidden py-16"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-container text-left relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-text mb-6 font-mono tracking-tight"
        >
          Anton Popov
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-muted mb-8 font-mono"
        >
          Soundartist from Far East
        </motion.p>
      </div>
    </motion.section>
  );
}
