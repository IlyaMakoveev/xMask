# Backend Integration Guide: YooKassa & Subscriptions

This document provides a technical roadmap for backend engineers to implement the payment and subscription logic for the xMask Telegram Mini App.

## 1. Architecture Overview

The system follows a standard asynchronous payment flow:
1. **Frontend**: User clicks "Extend Subscription" -> calls Backend API.
2. **Backend**: Initiates payment with YooKassa -> returns `confirmation_url`.
3. **Frontend**: Redirects user to YooKassa or opens it in Telegram Browser.
4. **YooKassa**: Processes payment -> sends **Webhook** to Backend.
5. **Backend**: Validates Webhook -> Updates User Status -> Calls Remnawave API to extend traffic/date.

---

## 2. YooKassa Integration

### Prerequisites
- Shop ID and Secret Key (from YooKassa Dashboard).
- Server capable of receiving HTTPS POST webhooks.

### Initiating a Payment (Node.js Example)
```javascript
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

async function createPayment(userId, amount, planId) {
  const response = await axios.post('https://api.yookassa.ru/v3/payments', {
    amount: {
      value: amount.toFixed(2),
      currency: 'RUB'
    },
    confirmation: {
      type: 'redirect',
      return_url: 'https://t.me/your_bot/app'
    },
    capture: true,
    description: `Subscription extension for user ${userId}`,
    metadata: {
      user_id: userId,
      plan_id: planId
    }
  }, {
    auth: {
      username: process.env.YOOKASSA_SHOP_ID,
      password: process.env.YOOKASSA_SECRET_KEY
    },
    headers: {
      'Idempotence-Key': uuidv4()
    }
  });

  return response.data.confirmation.confirmation_url;
}
```

### Handling Webhooks
You must set up an endpoint (e.g., `/api/webhooks/yookassa`) to listen for `payment.succeeded`.

**Security Checklist:**
- Verify that the request comes from YooKassa IP addresses.
- Check the payment status in the payload.
- Use `metadata` to identify the user.

---

## 3. Subscription Management

Once a payment is confirmed, the backend must update the user's status.

### Logic Flow
1. **Identify User**: Extract `user_id` from payment metadata.
2. **Calculate Extension**: Based on `plan_id`, determine additional days (e.g., +30 days) and traffic (e.g., +100GB).
3. **Remnawave API Interaction**:
   - Call Remnawave API to update the inbound/user configuration.
   - Endpoint: `POST /api/v1/users/{uuid}`
   - Header: `X-API-KEY: your_admin_token`

### Database Schema Suggestion
| Field | Type | Description |
| :--- | :--- | :--- |
| `tg_id` | BigInt | Primary key (Telegram ID) |
| `remna_uuid` | UUID | User ID in Remnawave system |
| `expiry_date` | DateTime | Current subscription end date |
| `traffic_limit` | Int | Total allowed traffic in GB |

---

## 4. Frontend-Backend Contract

### GET `/api/user/stats`
Returns data for the Dashboard.
```json
{
  "usedTraffic": 42.5,
  "totalTraffic": 100,
  "expiryDate": "31.12.2024",
  "status": "active",
  "subscriptionLink": "vless://..."
}
```

### POST `/api/payments/create`
**Payload:** `{ "planId": "premium_30_days" }`
**Response:** `{ "url": "https://yookassa.ru/..." }`

---

## 5. Security Notes
- **Telegram InitData Validation**: All API calls from the Mini App must include `window.Telegram.WebApp.initData` in the headers. The backend **must** validate this data using your Bot Token to prevent spoofing.
- **Idempotency**: Always send an `Idempotence-Key` to YooKassa to prevent double charges on network retries.
