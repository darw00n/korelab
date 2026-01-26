# Configuration Twilio pour l'authentification SMS

## 1. Prérequis

- Compte Twilio : https://www.twilio.com/try-twilio
- Numéro Twilio ou Messaging Service configuré

## 2. Récupérer vos clés Twilio

1. Connectez-vous à https://console.twilio.com/
2. Sur la page d'accueil, vous trouverez :
   - **Account SID** : `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Auth Token** : Cliquez sur "Show" pour le révéler

3. Pour le **Messaging Service SID** :
   - Allez dans **Messaging > Services**
   - Créez un service ou utilisez un existant
   - Copiez le **SID** : `MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 3. Configuration des variables d'environnement

### Pour Supabase Local

Créez ou éditez le fichier `.env` dans le dossier racine :

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Puis redémarrez Supabase :
```bash
supabase stop
supabase start
```

### Pour Supabase Cloud (Production)

1. Allez dans votre projet Supabase
2. **Authentication > Providers > Phone**
3. Activez "Phone" provider
4. Sélectionnez "Twilio" 
5. Remplissez :
   - Account SID
   - Auth Token
   - Message Service SID (ou Twilio Phone Number)

## 4. Numéros de test (sans envoyer de vrais SMS)

Pour tester sans consommer de crédits SMS, utilisez ces numéros de test :

| Numéro (format international) | Code OTP |
|-------------------------------|----------|
| +15555550100                  | 123456   |
| +15555550101                  | 123456   |
| +15555550102                  | 123456   |
| +33600000000                  | 123456   |
| +212600000000                 | 123456   |

Ces numéros sont configurés dans `supabase/config.toml` sous `[auth.sms.test_otp]`.

## 5. Configuration du Webhook (optionnel)

Si vous utilisez ngrok pour les webhooks :

```
https://b37ffaebc48e.ngrok-free.app/api/webhooks/twilio
```

Configurez ce webhook dans Twilio Console > Phone Numbers > Manage > Active Numbers > [Votre numéro] > Messaging > Webhook.

## 6. Vérification

1. Lancez l'application : `npm run dev`
2. Allez sur http://localhost:3000/diagnostic
3. Faites le diagnostic jusqu'à l'écran d'inscription
4. Utilisez un numéro de test ou votre vrai numéro
5. Entrez le code OTP

## Dépannage

### "Phone provider not enabled"
- Vérifiez que `enable_signup = true` dans `[auth.sms]` du config.toml

### "Invalid phone number"
- Utilisez le format international (+33, +212, etc.)
- Vérifiez que le numéro est valide

### "Rate limit exceeded"
- Attendez 30 secondes entre les envois (configuré dans `max_frequency`)

### SMS non reçu (en production)
- Vérifiez votre solde Twilio
- Vérifiez les logs dans Twilio Console > Monitor > Logs
