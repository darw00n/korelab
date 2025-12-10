'use client';

// ============================================
// KORELAB - Page d'Accueil
// Landing page avec CTA vers le diagnostic
// ============================================

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Leaf, 
  Star, 
  ArrowRight,
  Play,
  Shield,
  Truck
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useTranslation } from '@/lib/i18n/context';

// ===================
// PAGE PRINCIPALE
// ===================

export default function HomePage() {
  return (
    <MobileShell>
      <div className="px-4 py-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Features */}
        <FeaturesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Final */}
        <CTASection />
      </div>
    </MobileShell>
  );
}

// ===================
// HERO SECTION
// ===================

function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-8">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-50 border border-accent-200 rounded-full mb-4"
      >
        <Leaf className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-accent">{t('home.hero.badge')}</span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-secondary-900 leading-tight mb-4"
      >
        {t('home.hero.title_line1')}
        <span className="text-primary block">{t('home.hero.title_line2')}</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-secondary-600 text-lg mb-6"
      >
        {t('home.hero.description')}
      </motion.p>

      {/* CTA Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/diagnostic"
          className="btn-primary w-full text-lg py-4"
        >
          <Sparkles className="w-5 h-5" />
          {t('home.hero.cta_button')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-6 mt-6"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary-900">4.9</p>
          <p className="text-sm text-secondary-500">{t('home.hero.stats.rating_label')}</p>
        </div>
        <div className="w-px h-10 bg-secondary-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary-900">5000+</p>
          <p className="text-sm text-secondary-500">{t('home.hero.stats.clients_label')}</p>
        </div>
      </motion.div>
    </section>
  );
}

// ===================
// FEATURES SECTION
// ===================

function FeaturesSection() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      titleKey: 'home.features.natural_title',
      descKey: 'home.features.natural_description',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      titleKey: 'home.features.shipping_title',
      descKey: 'home.features.shipping_description',
    },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-center p-4 bg-white rounded-xl border border-secondary-200"
          >
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-primary">
              {feature.icon}
            </div>
            <p className="font-semibold text-secondary-900 text-sm">{t(feature.titleKey)}</p>
            <p className="text-xs text-secondary-500 mt-1">{t(feature.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ===================
// TESTIMONIALS SECTION
// ===================

function TestimonialsSection() {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      nameKey: 'home.testimonials.testimonial_1.name',
      cityKey: 'home.testimonials.testimonial_1.city',
      textKey: 'home.testimonials.testimonial_1.text',
      rating: 5,
    },
    {
      nameKey: 'home.testimonials.testimonial_2.name',
      cityKey: 'home.testimonials.testimonial_2.city',
      textKey: 'home.testimonials.testimonial_2.text',
      rating: 5,
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-secondary-900 mb-4">
        {t('home.testimonials.section_title')}
      </h2>

      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.nameKey}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="p-4 bg-white rounded-xl border border-secondary-200"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>

            {/* Text */}
            <p className="text-secondary-700 text-sm mb-3">
              "{t(testimonial.textKey)}"
            </p>

            {/* Author */}
            <p className="text-sm">
              <span className="font-semibold text-secondary-900">{t(testimonial.nameKey)}</span>
              <span className="text-secondary-500"> · {t(testimonial.cityKey)}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Video CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4"
      >
        <a
          href="https://tiktok.com/@korelab"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-4 bg-secondary-900 text-white rounded-xl"
        >
          <Play className="w-5 h-5" />
          <span className="font-medium">{t('home.testimonials.video_cta')}</span>
        </a>
      </motion.div>
    </section>
  );
}

// ===================
// CTA SECTION
// ===================

function CTASection() {
  const { t } = useTranslation();
  
  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="p-6 bg-gradient-to-br from-primary to-primary-700 rounded-2xl text-white text-center"
      >
        <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-90" />
        <h3 className="text-xl font-bold mb-2">
          {t('home.cta.title')}
        </h3>
        <p className="text-white/80 mb-4">
          {t('home.cta.subtitle')}
        </p>
        <Link
          href="/diagnostic"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-primary font-semibold rounded-xl hover:bg-secondary-50 transition-colors"
        >
          {t('home.cta.button')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}

