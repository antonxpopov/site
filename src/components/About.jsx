import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function About() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-4 flex items-center bg-bg-secondary"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-container">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg bg-gradient-to-br from-text-muted to-border flex items-center justify-center shadow-xl border border-border hover:border-text transition-all duration-300">
              <div className="w-28 h-28 md:w-44 md:h-44 rounded-lg bg-bg border-2 border-text-muted flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-bold text-text font-mono">IP</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-text mb-4 font-mono">
              About Me
            </h2>
            <div className="space-y-2 md:space-y-4 text-text-muted leading-relaxed font-mono text-base md:text-lg">
              <p>
                I specialize in creating high-quality audio content for film, advertising, and media projects.
              </p>
              <p>
                My approach is based on attention to detail and understanding how sound affects the perception of visual content.
              </p>
              <p>
                I work with various genres and formats, from short films to corporate videos and music projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
