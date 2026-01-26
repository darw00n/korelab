'use client';

// ============================================
// KORELAB - Page d'Authentification
// Inscription/Connexion par téléphone (OTP)
// ============================================

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAuthStore } from '@/store/authStore';

// ===================
// TYPES
// ===================

type AuthStep = 'phone' | 'otp' | 'name';

// ===================
// PAGE PRINCIPALE (avec Suspense wrapper)
// ===================

export default function AuthPage() {
  return (
    <Suspense fallback={
      <MobileShell showHeader={false} showBottomNav={false}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-science-900 animate-spin" />
        </div>
      </MobileShell>
    }>
      <AuthPageContent />
    </Suspense>
  );
}

// ===================
// CONTENU DE LA PAGE
// ===================

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  
  const { 
    signInWithPhone, 
    verifyOtp, 
    updateProfile,
    authState, 
    isLoading, 
    error, 
    clearError,
    pendingPhone,
    user
  } = useAuthStore();

  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [fullName, setFullName] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (authState === 'authenticated') {
      router.push(redirectTo);
    }
  }, [authState, router, redirectTo]);

  // Reprendre le téléphone en attente
  useEffect(() => {
    if (pendingPhone && authState === 'awaiting_verification') {
      setPhone(pendingPhone.replace('+212', '0'));
      setStep('otp');
    }
  }, [pendingPhone, authState]);

  // Countdown pour renvoyer le code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ===================
  // HANDLERS
  // ===================

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const result = await signInWithPhone(phone);
    if (result.success) {
      setStep('otp');
      setCountdown(60);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    const result = await verifyOtp(phone, otpCode);
    if (result.success) {
      // Vérifier si c'est un nouvel utilisateur (pas de nom)
      if (!user?.profile?.full_name) {
        setStep('name');
      } else {
        router.push(redirectTo);
      }
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const result = await updateProfile({ full_name: fullName.trim() });
    if (result.success) {
      router.push(redirectTo);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    clearError();
    
    const result = await signInWithPhone(phone);
    if (result.success) {
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
    }
  };

  // ===================
  // RENDER
  // ===================

  return (
    <MobileShell showHeader={false} showBottomNav={false}>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="px-4 py-4">
          {step !== 'phone' && (
            <button
              onClick={() => {
                if (step === 'otp') setStep('phone');
                else if (step === 'name') setStep('otp');
              }}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Retour</span>
            </button>
          )}
          {step === 'phone' && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-science-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Accueil</span>
            </Link>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 px-4 py-8">
          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <PhoneStep
                phone={phone}
                setPhone={setPhone}
                onSubmit={handlePhoneSubmit}
                isLoading={isLoading}
                error={error}
              />
            )}

            {step === 'otp' && (
              <OtpStep
                phone={phone}
                otp={otp}
                onOtpChange={handleOtpChange}
                onOtpKeyDown={handleOtpKeyDown}
                onSubmit={handleOtpSubmit}
                onResend={handleResendOtp}
                countdown={countdown}
                isLoading={isLoading}
                error={error}
              />
            )}

            {step === 'name' && (
              <NameStep
                fullName={fullName}
                setFullName={setFullName}
                onSubmit={handleNameSubmit}
                isLoading={isLoading}
                error={error}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="px-4 py-6 text-center">
          <p className="font-sans text-xs text-text-muted">
            En continuant, vous acceptez nos{' '}
            <Link href="/conditions" className="underline">conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link href="/confidentialite" className="underline">politique de confidentialité</Link>
          </p>
        </footer>
      </div>
    </MobileShell>
  );
}

// ===================
// ÉTAPE 1: TÉLÉPHONE
// ===================

interface PhoneStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

function PhoneStep({ phone, setPhone, onSubmit, isLoading, error }: PhoneStepProps) {
  return (
    <motion.div
      key="phone"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="font-mono font-bold text-2xl text-science-900 tracking-wider mb-2">
          KORELAB.SC
        </h1>
        <p className="font-sans text-sm text-text-secondary">
          Votre routine capillaire personnalisée
        </p>
      </div>

      {/* Titre */}
      <div className="mb-8">
        <h2 className="font-mono font-bold text-xl text-science-900 uppercase tracking-wider mb-2">
          Connexion
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Entrez votre numéro de téléphone pour recevoir un code de vérification
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
            Numéro de téléphone
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-text-secondary">
              <span className="font-mono text-sm">🇲🇦</span>
              <span className="font-mono text-sm">+212</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="6 12 34 56 78"
              className="input pl-24"
              maxLength={10}
              required
              autoFocus
            />
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={isLoading || phone.length < 9}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Recevoir le code
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Avantages */}
      <div className="mt-8 space-y-3">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-text-secondary">
            Vos données sont sécurisées et ne seront jamais partagées
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-text-secondary">
            Inscription rapide en moins de 30 secondes
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ===================
// ÉTAPE 2: OTP
// ===================

interface OtpStepProps {
  phone: string;
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  countdown: number;
  isLoading: boolean;
  error: string | null;
}

function OtpStep({ 
  phone, 
  otp, 
  onOtpChange, 
  onOtpKeyDown, 
  onSubmit, 
  onResend,
  countdown,
  isLoading, 
  error 
}: OtpStepProps) {
  const isComplete = otp.every(digit => digit !== '');

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-science-900 rounded-full flex items-center justify-center">
          <Phone className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="font-mono font-bold text-xl text-science-900 uppercase tracking-wider mb-2">
          Vérification
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Entrez le code à 6 chiffres envoyé au
        </p>
        <p className="font-mono text-sm text-science-900 mt-1">
          +212 {phone}
        </p>
      </div>

      {/* Formulaire OTP */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Inputs OTP */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(index, e.target.value)}
              onKeyDown={(e) => onOtpKeyDown(index, e)}
              className="w-12 h-14 text-center font-mono text-xl font-bold border-2 border-slate-200 rounded-md focus:border-science-900 focus:ring-0 focus:outline-none transition-colors"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={isLoading || !isComplete}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Vérification...
            </>
          ) : (
            <>
              Vérifier
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Renvoyer le code */}
        <div className="text-center">
          {countdown > 0 ? (
            <p className="font-sans text-sm text-text-muted">
              Renvoyer le code dans {countdown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={isLoading}
              className="font-mono text-sm text-science-900 underline hover:no-underline"
            >
              Renvoyer le code
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

// ===================
// ÉTAPE 3: NOM (Nouveaux utilisateurs)
// ===================

interface NameStepProps {
  fullName: string;
  setFullName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

function NameStep({ fullName, setFullName, onSubmit, isLoading, error }: NameStepProps) {
  return (
    <motion.div
      key="name"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success-700" />
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="font-mono font-bold text-xl text-science-900 uppercase tracking-wider mb-2">
          Bienvenue !
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Comment souhaitez-vous qu'on vous appelle ?
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
            Votre prénom
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex: Fatima"
            className="input"
            required
            autoFocus
          />
        </div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          disabled={isLoading || !fullName.trim()}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              Commencer
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
