const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

const initI18next = () => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      preload: ['en'],
      backend: {
        loadPath: path.join(__dirname, 'locales/{{lng}}/translation.json'),
      },
    });
};

const i18nextMiddlewareHandler = i18nextMiddleware.handle(i18next);

module.exports = { initI18next, i18nextMiddlewareHandler };