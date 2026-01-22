# CryptoFeeCalc Frontend (Nuxt 3)

## Обзор
- Nuxt 3 (Vue 3, SSR), TypeScript.
- Интерфейс калькулятора комиссий TRON.

## Ключевые файлы
- `pages/index.vue` — форма, запрос к API, вывод результата.
- `types/api.ts` — общие типы API (синхронизируются из backend).
- `nuxt.config.ts` — конфигурация Nuxt, runtime config.
- `scripts/generate-robots.js` — генерация robots.txt.
- `public/` — статические ассеты.

## Переменные окружения
- `NUXT_PUBLIC_API_BASE` — base URL API.

## Скрипты
- `npm run dev` — локальная разработка.
- `npm run build` — production build.
- `npm run start` — preview.
- `npm run type-check` — проверка типов.

## Важно
- `types/api.ts` обновляется из репозитория API при коммитах в `cryptofeecalc-api`.
