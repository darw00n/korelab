// ============================================
// KORELAB - Service Email (Resend)
// ============================================

import { Resend } from 'resend';

// ===================
// CONFIGURATION
// ===================

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'KORELAB <noreply@korelab.ma>';

// Initialiser Resend (null si pas configuré)
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ===================
// TYPES
// ===================

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode?: string;
  };
  paymentMethod: 'card' | 'cash_on_delivery';
}

interface ShippingEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// ===================
// TEMPLATES HTML
// ===================

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KORELAB</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: bold;">KORELAB</h1>
              <p style="margin: 5px 0 0; color: #1e293b; font-size: 12px;">Cosmétique Naturelle Marocaine</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px; background-color: #1e293b; border-radius: 0 0 16px 16px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; text-align: center;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 12px;">
                Des questions ? Contactez-nous à 
                <a href="mailto:contact@korelab.ma" style="color: #f59e0b;">contact@korelab.ma</a>
              </p>
              <p style="margin: 0; color: #475569; font-size: 11px;">
                © 2026 KORELAB. Tous droits réservés.
              </p>
              <p style="margin: 10px 0 0; font-size: 10px;">
                <a href="https://korelab.ma/politique-confidentialite" style="color: #64748b;">Confidentialité</a>
                &nbsp;•&nbsp;
                <a href="https://korelab.ma/conditions-generales-vente" style="color: #64748b;">CGV</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function orderConfirmationTemplate(data: OrderEmailData): string {
  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #334155; color: #e2e8f0;">
        ${item.name} <span style="color: #94a3b8;">x${item.quantity}</span>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #334155; text-align: right; color: #e2e8f0;">
        ${item.price * item.quantity} MAD
      </td>
    </tr>
  `).join('');

  return baseTemplate(`
    <h2 style="margin: 0 0 8px; color: #f59e0b; font-size: 20px;">Merci pour votre commande !</h2>
    <p style="margin: 0 0 24px; color: #94a3b8; font-size: 14px;">
      Bonjour ${data.customerName}, votre commande a bien été enregistrée.
    </p>
    
    <!-- Order ID -->
    <div style="background-color: #0f172a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">Numéro de commande</p>
      <p style="margin: 4px 0 0; color: #f59e0b; font-size: 18px; font-weight: bold;">#${data.orderId}</p>
    </div>
    
    <!-- Items -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      ${itemsHtml}
      <tr>
        <td style="padding: 8px 0; color: #94a3b8;">Sous-total</td>
        <td style="padding: 8px 0; text-align: right; color: #e2e8f0;">${data.subtotal} MAD</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8;">Livraison</td>
        <td style="padding: 8px 0; text-align: right; color: #e2e8f0;">${data.shipping === 0 ? 'Gratuite' : `${data.shipping} MAD`}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; color: #ffffff; font-weight: bold; font-size: 16px;">Total</td>
        <td style="padding: 12px 0; text-align: right; color: #f59e0b; font-weight: bold; font-size: 18px;">${data.total} MAD</td>
      </tr>
    </table>
    
    <!-- Shipping Address -->
    <div style="background-color: #0f172a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">Adresse de livraison</p>
      <p style="margin: 0; color: #e2e8f0; font-size: 14px;">
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.city}${data.shippingAddress.postalCode ? `, ${data.shippingAddress.postalCode}` : ''}
      </p>
    </div>
    
    <!-- Payment Method -->
    <p style="margin: 0; color: #94a3b8; font-size: 13px;">
      Mode de paiement : <strong style="color: #e2e8f0;">
        ${data.paymentMethod === 'card' ? 'Carte bancaire' : 'Paiement à la livraison'}
      </strong>
    </p>
    
    ${data.paymentMethod === 'cash_on_delivery' ? `
      <p style="margin: 16px 0 0; padding: 12px; background-color: #f59e0b20; border-radius: 8px; color: #f59e0b; font-size: 13px;">
        💰 Préparez ${data.total} MAD en espèces pour le livreur.
      </p>
    ` : ''}
  `);
}

function shippingNotificationTemplate(data: ShippingEmailData): string {
  return baseTemplate(`
    <h2 style="margin: 0 0 8px; color: #f59e0b; font-size: 20px;">Votre commande est en route ! 🚚</h2>
    <p style="margin: 0 0 24px; color: #94a3b8; font-size: 14px;">
      Bonjour ${data.customerName}, votre commande #${data.orderId} a été expédiée.
    </p>
    
    ${data.trackingNumber ? `
      <div style="background-color: #0f172a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">Numéro de suivi</p>
        <p style="margin: 4px 0 0; color: #f59e0b; font-size: 18px; font-weight: bold;">${data.trackingNumber}</p>
      </div>
    ` : ''}
    
    ${data.estimatedDelivery ? `
      <p style="margin: 0 0 24px; color: #e2e8f0; font-size: 14px;">
        📅 Livraison estimée : <strong>${data.estimatedDelivery}</strong>
      </p>
    ` : ''}
    
    <p style="margin: 0; color: #94a3b8; font-size: 13px;">
      Vous recevrez un appel du livreur avant la livraison.
    </p>
  `);
}

// ===================
// FONCTIONS D'ENVOI
// ===================

/**
 * Envoyer un email de confirmation de commande
 */
export async function sendOrderConfirmation(data: OrderEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: data.customerEmail,
      subject: `Confirmation de commande #${data.orderId} - KORELAB`,
      html: orderConfirmationTemplate(data),
    });

    if (error) {
      console.error('Error sending order confirmation:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Error sending order confirmation:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Envoyer une notification d'expédition
 */
export async function sendShippingNotification(data: ShippingEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: data.customerEmail,
      subject: `Votre commande #${data.orderId} est en route ! - KORELAB`,
      html: shippingNotificationTemplate(data),
    });

    if (error) {
      console.error('Error sending shipping notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Error sending shipping notification:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Vérifier si le service email est configuré
 */
export function isEmailConfigured(): boolean {
  return !!resend;
}
