'use client';

// ============================================
// KORELAB - Page Diagnostic
// Page du wizard Skin-Match
// ============================================

import React from 'react';
import { MobileShell } from '@/components/layout/MobileShell';
import { DiagnosticWizard } from '@/components/diagnostic/DiagnosticWizard';

export default function DiagnosticPage() {
  return (
    <MobileShell showBottomNav={false} headerTitle="Diagnostic">
      <DiagnosticWizard />
    </MobileShell>
  );
}

