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
    usedTraffic: 15.4, // измеряется в ГБ
    totalTraffic: 100,
    expiryDate: '20.10.2024',
    status: 'active',
    subscriptionLink: 'vless://uuid@host:port?params#name'
  });
});
```

## 3. Интеграция с VLESS сервером

Для выдачи реальных подписок используйте API популярных панелей управления:

*   **3x-ui**: Имеет встроенный API на порту 2053. Позволяет программно создавать "Inbounds" и "Clients".
*   **Marzban**: Мощный API на Python, идеально подходит для автоматизации больших проектов.

Когда пользователь оплачивает подписку:
1.  Ваш бэкенд вызывает API панели для создания нового UUID.
2.  Бэкенд сохраняет UUID в базе данных.
3.  При открытии Mini App бэкенд возвращает готовую ссылку `vless://...`.

## 4. Настройка Telegram Bot

1.  Перейдите к **@BotFather** в Telegram.
2.  Создайте нового бота `/newbot`.
3.  Используйте команду `/newapp` для создания Mini App.
4.  Вставьте URL вашего развернутого фронтенда (обязательно **HTTPS**).
5.  Получите короткую ссылку вида `t.me/your_bot/app_name`.

## 5. Изменения в коде фронтенда

Чтобы приложение начало получать реальные данные, измените функцию `fetchStats` в `components/Dashboard.tsx`:

```typescript
const fetchStats = async () => {
  setLoading(true);
  try {
    const tg = window.Telegram?.WebApp;
    const response = await fetch('https://your-api.com/api/user/stats', {
      headers: {
        'x-tg-data': tg?.initData || '' // Передаем данные авторизации
      }
    });
    const result = await response.json();
    setData(result);
  } catch (error) {
    console.error("Ошибка загрузки данных", error);
  } finally {
    setLoading(false);
  }
};
```

## 6. Безопасность и SSL

*   **HTTPS**: Telegram Mini Apps работают только через защищенное соединение. Используйте Cloudflare или Let's Encrypt.
*   **CORS**: Не забудьте настроить CORS на вашем бэкенде, чтобы разрешить запросы с домена, где размещен фронтенд.
*   **Token**: Никогда не храните `BOT_TOKEN` на фронтенде. Он должен быть только на сервере (бэкенде).
