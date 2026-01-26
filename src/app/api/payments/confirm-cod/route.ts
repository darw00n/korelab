// ============================================
// KORELAB - API Confirm Cash on Delivery
// Confirme une commande avec paiement à la livraison
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper to create admin client (lazy initialization)
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    if (!supabaseAdmin) {
      console.error('Supabase credentials not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const { orderId } = body;

    // Validation
    if (!orderId) {
      return NextResponse.json(
        { error: 'ID de commande requis' },
        { status: 400 }
      );
    }

    // Mettre à jour la commande
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        payment_method: 'cash_on_delivery',
        payment_status: 'pending',
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Erreur mise à jour commande:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la confirmation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error('Erreur confirmation COD:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation' },
      { status: 500 }
    );
  }
}
