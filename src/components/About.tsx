import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PARAGRAPHS = [
  'Sound and technology artist, experimental composer, and researcher of sound and music culture. Born in Vladivostok in 1997, he currently lives, studies, and works between Vladivostok and Moscow.',
  'He creates experimental electronic and electroacoustic music grounded in improvisation, listening, and working with unstable media environments. His research focuses on the production, description, reception, and archiving of sound, as well as the relationships between memory, media materiality, and processes of loss. He develops interactive technological installations in which sound, images, and physical media serve as tools for exploring memory and its modes of representation.',
  'In 2024, he participated in the workshop programme at Garage Museum of Contemporary Art and Vaults, the art production centre at House of Culture GES-2. In 2025, he received a SCAN AWARDS prize in the “Project of the Year” category.',
];

export default function About() {
  const [ref, isInView] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} id="about" className="py-16 flex items-center bg-bg-secondary">
      <div className="container mx-auto px-6 md:px-8 max-w-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-text mb-6 font-mono">About me</h2>
          <div className="space-y-4 text-text-muted leading-relaxed font-mono text-base md:text-lg">
            {PARAGRAPHS.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
