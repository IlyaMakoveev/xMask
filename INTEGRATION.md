# Инструкция по интеграции xMask

Это руководство поможет вам превратить статичный интерфейс в работающее приложение для продажи и управления VPN-подписками (VLESS).

## 1. Архитектура системы

1.  **Frontend**: Данное React-приложение (Telegram Mini App).
2.  **Backend**: Сервер (Node.js/Python/Go), который проверяет сессию Telegram и общается с БД.
3.  **VPN Panel**: Сервер с установленным Xray (рекомендуется использовать панели вроде **3x-ui**, **Marzban** или **Dante**).

## 2. Настройка бэкенда (API)

Бэкенд должен реализовывать минимум один эндпоинт для получения статистики пользователя.

### Проверка авторизации
Telegram передает данные в `window.Telegram.WebApp.initData`. Бэкенд **обязан** проверять подпись этих данных (hash) с помощью вашего `BOT_TOKEN`, чтобы убедиться, что запрос пришел именно от реального пользователя.

### Пример эндпоинта статистики (Node.js/Express)
```javascript
app.get('/api/user/stats', (req, res) => {
  const initData = req.headers['x-tg-data'];
  if (!isValidTelegramData(initData, BOT_TOKEN)) {
    return res.status(403).send('Unauthorized');
  }

  const tgUser = parseTelegramData(initData).user;
  
  // 1. Ищем пользователя в БД или запрашиваем API панели (например, 3x-ui)
  // 2. Формируем ответ в формате UserStats (см. types.ts)
  res.json({
    usedTraffic: 15.4, 
    totalTraffic: 100,
    expiryDate: '20.10.2024',
    status: 'active',
    subscriptionLink: 'vless://uuid@host:port?params#name'
  });
});
```

## 3. Интеграция с VLESS сервером

Для выдачи реальных подписок используйте API популярных панелей управления:

*   **3x-ui**: Имеет встроенный API на порту 2053.
*   **Marzban**: Мощный API на Python.

Когда пользователь оплачивает подписку:
1.  Ваш бэкенд вызывает API панели для создания или продления клиента.
2.  Обновляет дату истечения (`expiry_time`) в панели.

## 4. Настройка Telegram Bot

1.  Перейдите к **@BotFather**.
2.  Создайте нового бота `/newbot` и Mini App `/newapp`.
3.  Вставьте URL вашего развернутого фронтенда (обязательно **HTTPS**).

## 5. Прием платежей через YooMoney (Quickpay)

Приложение использует форму Quickpay для перенаправления пользователя на оплату.

### Настройка в кабинете YooMoney:
1. Зайдите в [Настройки уведомлений](https://yoomoney.ru/transfer/myservices/http-notification).
2. Укажите ваш **Notification URL** (например, `https://api.your-vpn.com/webhooks/yoomoney`).
3. Скопируйте **Секретное слово** (Secret) для проверки подлинности уведомлений.

### Обработка уведомления на бэкенде (Node.js):
Когда оплата пройдет, YooMoney отправит POST-запрос на ваш сервер.

```javascript
const crypto = require('crypto');

app.post('/webhooks/yoomoney', (req, res) => {
  const {
    notification_type, operation_id, amount, withdraw_amount,
    currency, datetime, sender, codepro, label, sha1_hash
  } = req.body;

  // 1. Проверка подписи (sha1_hash)
  // Формула: notification_type&operation_id&amount&currency&datetime&sender&codepro&notification_secret&label
  const secret = 'ВАШЕ_СЕКРЕТНОЕ_СЛОВО';
  const checkString = `${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&${secret}&${label}`;
  const myHash = crypto.createHash('sha1').update(checkString).digest('hex');

  if (myHash !== sha1_hash) {
    return res.status(400).send('Invalid signature');
  }

  // 2. label содержит ID пользователя Telegram (переданный из Payment.tsx)
  const userId = label;
  
  // 3. Продлеваем подписку
  console.log(`Пользователь ${userId} оплатил ${amount} руб.`);
  // Здесь вызываем API панели и обновляем БД
  
  res.status(200).send('OK');
});
```

## 6. Безопасность и SSL

*   **HTTPS**: Обязателен для Telegram Mini Apps и для приема уведомлений от YooMoney.
*   **CORS**: Настройте разрешение запросов с домена фронтенда.
*   **Secrets**: Никогда не публикуйте `BOT_TOKEN` и `Yoomoney Secret` в открытом доступе.
