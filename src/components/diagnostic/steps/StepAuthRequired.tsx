'use client';

// ============================================
// KORELAB - Step Auth Required
// Écran d'inscription obligatoire avant les résultats
// ============================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Shield,
  Gift,
  History,
  ChevronDown,
  TestTube
} from 'lucide-react';
import { useAuthStore, COUNTRY_CODES, TEST_PHONE_NUMBERS } from '@/store/authStore';

// ===================
// TYPES
// ===================

interface StepAuthRequiredProps {
  onAuthenticated: () => void;
}

type AuthSubStep = 'intro' | 'phone' | 'otp' | 'name';

// ===================
// COMPOSANT PRINCIPAL
// ===================

export function StepAuthRequired({ onAuthenticated }: StepAuthRequiredProps) {
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

  const [subStep, setSubStep] = useState<AuthSubStep>('intro');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('212'); // Default: Maroc
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [fullName, setFullName] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isTestMode, setIsTestMode] = useState(false);

  // Vérifier si déjà connecté
  useEffect(() => {
    if (authState === 'authenticated') {
      onAuthenticated();
    }
  }, [authState, onAuthenticated]);

  // Reprendre le téléphone en attente
  useEffect(() => {
    if (pendingPhone && authState === 'awaiting_verification') {
      setPhone(pendingPhone.replace('+212', '0'));
      setSubStep('otp');
    }
  }, [pendingPhone, authState]);

  // Countdown
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
    
    const result = await signInWithPhone(phone, countryCode);
    if (result.success) {
      setSubStep('otp');
      setCountdown(60);
    }
  };
  
  // Utiliser un numéro de test
  const handleUseTestNumber = () => {
    setPhone('600000000');
    setCountryCode('212');
    setIsTestMode(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`auth-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`auth-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    const result = await verifyOtp(phone, otpCode, countryCode);
    if (result.success) {
      if (!user?.profile?.full_name) {
        setSubStep('name');
      } else {
        onAuthenticated();
      }
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const result = await updateProfile({ full_name: fullName.trim() });
    if (result.success) {
      onAuthenticated();
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    clearError();
    
    const result = await signInWithPhone(phone, countryCode);
    if (result.success) {
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
    }
  };

  // ===================
  // RENDER
  // ===================

  return (
    <div className="min-h-full bg-white px-4 py-8 flex flex-col">
      {subStep === 'intro' && (
        <IntroScreen onContinue={() => setSubStep('phone')} />
      )}

      {subStep === 'phone' && (
        <PhoneScreen
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          showCountryPicker={showCountryPicker}
          setShowCountryPicker={setShowCountryPicker}
          onSubmit={handlePhoneSubmit}
          onBack={() => setSubStep('intro')}
          onUseTestNumber={handleUseTestNumber}
          isLoading={isLoading}
          error={error}
          isTestMode={isTestMode}
        />
      )}

      {subStep === 'otp' && (
        <OtpScreen
          phone={phone}
          countryCode={countryCode}
          otp={otp}
          onOtpChange={handleOtpChange}
          onOtpKeyDown={handleOtpKeyDown}
          onSubmit={handleOtpSubmit}
          onResend={handleResendOtp}
          onBack={() => setSubStep('phone')}
          countdown={countdown}
          isLoading={isLoading}
          error={error}
          isTestMode={isTestMode}
        />
      )}

      {subStep === 'name' && (
        <NameScreen
          fullName={fullName}
          setFullName={setFullName}
          onSubmit={handleNameSubmit}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

// ===================
// ÉCRAN D'INTRO
// ===================

interface IntroScreenProps {
  onContinue: () => void;
}

function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-science-900 rounded-full flex items-center justify-center">
          <Lock className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-8">
        <h2 className="font-mono font-bold text-xl text-science-900 uppercase tracking-wider mb-3">
          Votre Analyse est Prête !
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Créez votre compte pour accéder à vos résultats personnalisés et les sauvegarder.
        </p>
      </div>

      {/* Avantages */}
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
          <CheckCircle className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-sm font-bold text-science-900 uppercase">
              Résultats Personnalisés
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Votre routine capillaire sur-mesure basée sur votre diagnostic
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
          <History className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-sm font-bold text-science-900 uppercase">
              Historique Sauvegardé
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Retrouvez vos diagnostics et suivez l'évolution de vos cheveux
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-md">
          <Gift className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-sm font-bold text-science-900 uppercase">
              Offres Exclusives
            </p>
            <p className="font-sans text-xs text-text-secondary mt-1">
              -10% sur votre première commande et des offres personnalisées
            </p>
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div className="mt-auto">
        <button
          onClick={onContinue}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          Créer mon compte
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center mt-4">
          <span className="font-sans text-xs text-text-muted">
            Inscription rapide par SMS • 30 secondes
          </span>
        </p>
      </div>
    </motion.div>
  );
}

// ===================
// ÉCRAN TÉLÉPHONE
// ===================

interface PhoneScreenProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  showCountryPicker: boolean;
  setShowCountryPicker: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onUseTestNumber: () => void;
  isLoading: boolean;
  error: string | null;
  isTestMode: boolean;
}

function PhoneScreen({ 
  phone, 
  setPhone, 
  countryCode,
  setCountryCode,
  showCountryPicker,
  setShowCountryPicker,
  onSubmit, 
  onBack,
  onUseTestNumber,
  isLoading, 
  error,
  isTestMode
}: PhoneScreenProps) {
  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-science-900 mb-6"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span className="font-mono text-xs uppercase tracking-wider">Retour</span>
      </button>

      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-science-900 rounded-full flex items-center justify-center">
          <Phone className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="font-mono font-bold text-lg text-science-900 uppercase tracking-wider mb-2">
          Votre Numéro
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Nous vous envoyons un code de vérification par SMS
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="flex-1 flex flex-col">
        <div className="mb-4">
          <label className="block font-mono text-xs uppercase tracking-wider text-science-900 mb-2">
            Numéro de téléphone
          </label>
          
          <div className="flex gap-2">
            {/* Sélecteur de pays */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryPicker(!showCountryPicker)}
                className="flex items-center gap-1 h-12 px-3 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 transition-colors"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="font-mono text-sm">+{countryCode}</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>
              
              {/* Dropdown pays */}
              {showCountryPicker && (
                <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-md shadow-lg z-50">
                  {COUNTRY_CODES.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(country.code);
                        setShowCountryPicker(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors ${
                        country.code === countryCode ? 'bg-slate-100' : ''
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-sans text-sm flex-1 text-left">{country.name}</span>
                      <span className="font-mono text-xs text-text-muted">+{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input téléphone */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder={selectedCountry.example}
              className="input flex-1"
              maxLength={15}
              required
              autoFocus
            />
          </div>
        </div>

        {/* Mode test */}
        {isTestMode && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md mb-4">
            <TestTube className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="font-sans text-xs text-amber-700">
              Mode test activé. OTP: <span className="font-mono font-bold">123456</span>
            </p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mb-4"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Sécurité */}
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-text-muted" />
          <p className="font-sans text-xs text-text-muted">
            Vos données sont sécurisées et ne seront jamais partagées
          </p>
        </div>
        
        {/* Bouton numéro de test */}
        <button
          type="button"
          onClick={onUseTestNumber}
          className="flex items-center justify-center gap-2 text-text-muted hover:text-science-900 transition-colors mb-4"
        >
          <TestTube className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Utiliser un numéro de test</span>
        </button>

        {/* Bouton */}
        <div className="mt-auto">
          <button
            type="submit"
            disabled={isLoading || phone.length < 6}
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
        </div>
      </form>
    </motion.div>
  );
}

// ===================
// ÉCRAN OTP
// ===================

interface OtpScreenProps {
  phone: string;
  countryCode: string;
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
  countdown: number;
  isLoading: boolean;
  error: string | null;
  isTestMode: boolean;
}

function OtpScreen({ 
  phone,
  countryCode,
  otp, 
  onOtpChange, 
  onOtpKeyDown, 
  onSubmit, 
  onResend,
  onBack,
  countdown,
  isLoading, 
  error,
  isTestMode
}: OtpScreenProps) {
  const isComplete = otp.every(digit => digit !== '');
  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-science-900 mb-6"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span className="font-mono text-xs uppercase tracking-wider">Retour</span>
      </button>

      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="font-mono font-bold text-lg text-science-900 uppercase tracking-wider mb-2">
          Vérification
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Code envoyé au <span className="font-mono">{selectedCountry.flag} +{countryCode} {phone}</span>
        </p>
        {isTestMode && (
          <p className="font-mono text-xs text-amber-600 mt-2">
            Mode test - OTP: 123456
          </p>
        )}
      </div>

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="flex-1 flex flex-col">
        {/* Inputs OTP */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`auth-otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(index, e.target.value)}
              onKeyDown={(e) => onOtpKeyDown(index, e)}
              className="w-11 h-14 text-center font-mono text-xl font-bold border-2 border-slate-200 rounded-md focus:border-science-900 focus:ring-0 focus:outline-none transition-colors"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mb-4"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Renvoyer le code */}
        <div className="text-center mb-6">
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

        {/* Bouton */}
        <div className="mt-auto">
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
                Voir mes résultats
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ===================
// ÉCRAN NOM
// ===================

interface NameScreenProps {
  fullName: string;
  setFullName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

function NameScreen({ fullName, setFullName, onSubmit, isLoading, error }: NameScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Icône */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success-700" />
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="font-mono font-bold text-lg text-science-900 uppercase tracking-wider mb-2">
          Bienvenue !
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Une dernière étape : comment souhaitez-vous qu'on vous appelle ?
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="flex-1 flex flex-col">
        <div className="mb-4">
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
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mb-4"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Bouton */}
        <div className="mt-auto">
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
                Voir mes résultats
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default StepAuthRequired;
