import { memo } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Contact } from '../types';
import { ANIMATION_DELAYS } from '../constants/animations';

// Material Design Icons as SVG components
const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const MusicIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const contacts: Contact[] = [
  {
    name: 'Email',
    icon: EmailIcon,
    url: 'mailto:ivan.petrov@sound.ru',
    label: 'ivan.petrov@sound.ru'
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    url: 'https://instagram.com/ivan_petrov_sound',
    label: '@ivan_petrov_sound'
  },
  {
    name: 'Telegram',
    icon: TelegramIcon,
    url: 'https://t.me/ivan_petrov_sound',
    label: '@ivan_petrov_sound'
  },
  {
    name: 'SoundCloud',
    icon: MusicIcon,
    url: 'https://soundcloud.com/ivan-petrov-sound',
    label: 'ivan-petrov-sound'
  }
];

const Contacts = memo(function Contacts() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="contacts"
      className="min-h-[80vh] flex items-center bg-bg py-16"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-container w-full">
        <h2 className="text-2xl md:text-3xl font-medium text-text mb-8 text-center font-mono">
          Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => {
            const IconComponent = contact.icon;
            const transition = {
              duration: 0.6,
              delay: index * ANIMATION_DELAYS.CONTACT,
            };

            return (
              <motion.a
                key={contact.name}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={transition}
                className="flex flex-col items-center gap-4 p-6 bg-bg-secondary rounded-lg border border-border hover:border-text-muted transition-all duration-300 group hover:scale-105"
              >
                <div className="text-text-muted group-hover:text-text transition-colors group-hover:scale-110 transition-transform duration-300">
                  <IconComponent />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg font-mono text-text mb-1 group-hover:text-text-muted transition-colors">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-text-muted font-mono">
                    {contact.label}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
});

Contacts.displayName = 'Contacts';

export default Contacts;

