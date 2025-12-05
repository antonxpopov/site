import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { OptimizedImage } from './OptimizedImage';
import type { Project } from '../types';
import { ANIMATION_DELAYS } from '../constants/animations';

interface PortfolioCardProps {
  project: Project;
  index: number;
}

const PortfolioCard = memo(function PortfolioCard({
  project,
  index,
}: PortfolioCardProps) {
  const [ref, isInView] = useIntersectionObserver<HTMLAnchorElement>({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  });

  const imageUrl = useMemo(
    () => project.imageUrl || '/images/placeholder.jpg',
    [project.imageUrl]
  );

  const transition = useMemo(
    () => ({
      duration: 0.6,
      delay: index * ANIMATION_DELAYS.CARD,
    }),
    [index]
  );

  return (
    <motion.a
      ref={ref}
      href={`/project/${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={transition}
      className="bg-bg-secondary rounded-lg overflow-hidden border border-border hover:border-text-muted transition-all duration-300 h-full flex flex-col group block focus:outline-none focus:ring-2 focus:ring-text-muted"
      aria-label={`View project: ${project.title}`}
    >
      <div className="relative w-full h-48 bg-bg overflow-hidden">
        <OptimizedImage
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          priority={index < 3}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-text mb-3 font-mono group-hover:text-text transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted mb-4 text-sm leading-relaxed font-mono flex-grow">
          {project.description}
        </p>
        <span className="inline-block mt-auto text-text hover:text-text-muted font-mono font-medium transition-all duration-300 group-hover:translate-x-1">
          Learn More →
        </span>
      </div>
    </motion.a>
  );
});

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;

