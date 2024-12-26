# Bingo Game Server

Socket.IO server for the Bingo game application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
CLIENT_URL=https://your-netlify-url.netlify.app
```

3. Run development server:
```bash
npm run dev
```

## Deployment

1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set CLIENT_URL=https://your-netlify-url.netlify.app
```

3. Deploy:
```bash
git push heroku main
```