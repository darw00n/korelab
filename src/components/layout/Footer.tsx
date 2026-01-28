'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Logo & Description */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">KORELAB</h2>
          <p className="text-sm text-slate-400">
            Cosmétique naturelle marocaine pour des cheveux sains et sublimes.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diagnostic" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Diagnostic
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/recettes" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Recettes DIY
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales-vente" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/politique-cookies" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-slate-800 pt-6 mb-6">
          <h3 className="text-sm font-semibold text-white mb-3 text-center">Contact</h3>
          <div className="flex flex-col items-center gap-2">
            <a 
              href="mailto:contact@korelab.ma" 
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@korelab.ma
            </a>
            <a 
              href="tel:+212000000000" 
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +212 0 00 00 00 00
            </a>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4" />
              Casablanca, Maroc
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KORELAB. Tous droits réservés.</p>
          <p className="mt-1">Fait avec 🌿 au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
