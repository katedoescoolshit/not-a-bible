# Firebase Setup Guide - Not A Bible

## ✅ Firebase Project Created!

**Project ID**: `not-a-bible`
**Project URL**: https://not-a-bible.firebaseapp.com

---

## 🚀 Next Steps

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialize Firebase in Your Project

```bash
# In your Next.js project folder
firebase init

# Select:
☑ Firestore
☑ Functions
☑ Hosting
☑ Storage
☑ Extensions

# Use existing project: not-a-bible
```

### 3. Install Firebase Extensions

#### A. Stripe Payments Extension
```bash
firebase ext:install stripe/firestore-stripe-payments
```

**Configuration:**
- Products collection: `products`
- Customers collection: `customers`
- Stripe webhook secret: (get from Stripe dashboard)

#### B. Trigger Email Extension
```bash
firebase ext:install firebase/firestore-send-email
```

**Configuration:**
- SMTP connection: Use SendGrid or Gmail
- Email documents collection: `mail`
- Default FROM address: downloads@notabible.com

---

## 📁 Project Structure

```
not-a-bible/
├── firebase.json           # Firebase config
├── firestore.rules         # Database security rules
├── storage.rules           # Storage security rules
├── functions/              # Cloud Functions
│   ├── index.js           # Main functions file
│   └── package.json
├── public/                 # Static files
│   └── bible-complete.html
└── src/                    # Next.js app
    ├── firebase-config.js  # Firebase initialization
    └── ...
```

---

## 🔥 Firestore Collections

### `/purchases`
```javascript
{
  email: "user@example.com",
  amount: 10,
  currency: "usd",
  timestamp: Timestamp,
  stripePaymentId: "pi_xxx",
  downloadCount: 0,
  downloadLink: "https://...",
  status: "completed"
}
```

### `/downloads`
```javascript
{
  purchaseId: "xxx",
  email: "user@example.com",
  timestamp: Timestamp,
  ipAddress: "xxx.xxx.xxx.xxx",
  userAgent: "Mozilla/5.0..."
}
```

### `/mail` (for email extension)
```javascript
{
  to: "user@example.com",
  message: {
    subject: "Your Bible Download",
    html: "<html>...</html>",
    text: "Plain text version"
  }
}
```

---

## 🔒 Security Rules

### Firestore Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Purchases - only functions can write
    match /purchases/{purchaseId} {
      allow read: if request.auth != null && 
                     resource.data.email == request.auth.token.email;
      allow write: if false; // Only Cloud Functions
    }
    
    // Downloads - only functions can write
    match /downloads/{downloadId} {
      allow read: if false;
      allow write: if false; // Only Cloud Functions
    }
    
    // Mail - only functions can write
    match /mail/{mailId} {
      allow read: if false;
      allow write: if false; // Only Cloud Functions
    }
  }
}
```

### Storage Rules (`storage.rules`)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Downloads folder - public read
    match /downloads/{fileName} {
      allow read: if true;
      allow write: if false; // Only admins
    }
  }
}
```

---

## ⚡ Cloud Functions

### `functions/index.js`

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret);

admin.initializeApp();

// Handle successful Stripe payment
exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      functions.config().stripe.webhook_secret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Create purchase record
    const purchaseRef = await admin.firestore().collection('purchases').add({
      email: paymentIntent.receipt_email,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      stripePaymentId: paymentIntent.id,
      downloadCount: 0,
      status: 'completed'
    });

    // Generate download link
    const downloadLink = `https://not-a-bible.web.app/api/download?id=${purchaseRef.id}`;

    // Update purchase with download link
    await purchaseRef.update({ downloadLink });

    // Trigger email
    await admin.firestore().collection('mail').add({
      to: paymentIntent.receipt_email,
      message: {
        subject: 'Your Complete Scripture Collection',
        html: generateEmailHTML(downloadLink),
        text: generateEmailText(downloadLink)
      }
    });
  }

  res.json({ received: true });
});

// Generate download link
exports.generateDownload = functions.https.onCall(async (data, context) => {
  const { purchaseId } = data;
  
  // Verify purchase exists
  const purchaseDoc = await admin.firestore()
    .collection('purchases')
    .doc(purchaseId)
    .get();
  
  if (!purchaseDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Purchase not found');
  }

  // Increment download count
  await purchaseDoc.ref.update({
    downloadCount: admin.firestore.FieldValue.increment(1)
  });

  // Log download
  await admin.firestore().collection('downloads').add({
    purchaseId,
    email: purchaseDoc.data().email,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    ipAddress: context.rawRequest.ip,
    userAgent: context.rawRequest.headers['user-agent']
  });

  // Return download URL
  const bucket = admin.storage().bucket();
  const file = bucket.file('downloads/bible-complete.html');
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 3600000 // 1 hour
  });

  return { downloadUrl: url };
});

function generateEmailHTML(downloadLink) {
  return `
    <html>
      <body style="font-family: monospace; max-width: 600px; margin: 0 auto;">
        <h1>YOUR COMPLETE SCRIPTURE COLLECTION</h1>
        <p>You now own scripture. All of it. Forever.</p>
        
        <h2>What's Included:</h2>
        <ul>
          <li>66 Protestant books</li>
          <li>7 Catholic additions</li>
          <li>15+ Lost books</li>
          <li>Gnostic gospels</li>
          <li>Early Church writings</li>
        </ul>

        <p><a href="${downloadLink}" style="display: inline-block; padding: 16px 32px; background: #000; color: #fff; text-decoration: none; font-weight: bold;">DOWNLOAD NOW</a></p>

        <h3>How to Use:</h3>
        <ol>
          <li>Click the download button</li>
          <li>Save the file to your computer</li>
          <li>Double-click to open</li>
          <li>Works offline forever</li>
        </ol>

        <p><strong>Save it to:</strong></p>
        <ul>
          <li>Your computer</li>
          <li>USB drive</li>
          <li>Cloud storage</li>
          <li>Email to yourself as backup</li>
        </ul>

        <p>This file will work in 2045 the same way it works today.</p>
        <p><strong>They can't delete what you already have.</strong></p>

        <hr>
        <p style="font-size: 12px; color: #666;">
          This link works forever. Save this email.<br>
          Questions? Reply to this email.
        </p>
      </body>
    </html>
  `;
}

function generateEmailText(downloadLink) {
  return `
YOUR COMPLETE SCRIPTURE COLLECTION

You now own scripture. All of it. Forever.

Download: ${downloadLink}

What's included:
- 66 Protestant books
- 7 Catholic additions
- 15+ Lost books
- Gnostic gospels
- Early Church writings

How to use:
1. Click the download link
2. Save the file
3. Double-click to open
4. Works offline forever

They can't delete what you already have.
  `;
}
```

---

## 📤 Upload Bible File to Storage

```bash
# Upload the complete Bible HTML
firebase storage:upload bible-complete.html downloads/bible-complete.html

# Or use the Firebase Console:
# https://console.firebase.google.com/project/not-a-bible/storage
```

---

## 🧪 Testing

### Test Payment Flow
```bash
# Use Stripe test mode
# Test card: 4242 4242 4242 4242
# Any future expiry, any CVC
```

### Test Email Delivery
```bash
# Trigger a test email
firebase functions:shell
> sendDownloadEmail({email: 'test@example.com'})
```

### Test Download
```bash
# Generate a test download link
firebase functions:shell
> generateDownload({purchaseId: 'test123'})
```

---

## 🚀 Deploy

```bash
# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

---

## 📊 Monitor

**Firebase Console**: https://console.firebase.google.com/project/not-a-bible

**Check:**
- Functions logs
- Firestore data
- Storage usage
- Analytics
- Crash reports

---

## 💰 Stripe Setup

1. **Create Stripe account**: https://stripe.com
2. **Get API keys**: Dashboard → Developers → API keys
3. **Set webhook**: Dashboard → Developers → Webhooks
   - URL: `https://us-central1-not-a-bible.cloudfunctions.net/handleStripeWebhook`
   - Events: `payment_intent.succeeded`
4. **Configure Firebase**:
```bash
firebase functions:config:set stripe.secret="sk_test_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."
```

---

## ✅ Launch Checklist

- [ ] Firebase project created
- [ ] Extensions installed (Stripe + Email)
- [ ] Cloud Functions deployed
- [ ] Bible file uploaded to Storage
- [ ] Security rules configured
- [ ] Stripe connected
- [ ] Email templates tested
- [ ] Payment flow tested
- [ ] Download flow tested
- [ ] Analytics configured

---

**Status**: Firebase configured and ready
**Next**: Build the Next.js PWA
**Timeline**: Ready to start development
