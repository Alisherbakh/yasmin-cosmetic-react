# Yasmin — Cosmetics Store (Frontend)

Customer storefront for **Yasmin**, an online cosmetics shop. Built with React, TypeScript and Redux Toolkit, connected to the [Yasmin backend](https://github.com/Alisherbakh/yasmin-cosmetic) (Express + MongoDB).

## Features

- **Home page** — popular and new products, store statistics, active users, events and testimonials
- **Products** — browse by collection (skincare, makeup, hair care, body care, fragrance, gifts), search, sort, and product detail page
- **Basket** — add, remove and change quantities; saved in the browser
- **Orders** — paused / processing / finished tabs; pay or cancel a paused order, confirm a processing one
- **User page** — profile and settings
- **Help page** — FAQ and terms
- **Mobile layout** — app bar, tab bar and bottom sheets
- **Real-time** — Socket.io connection through a React context

## Tech stack

React 18 · TypeScript · Redux Toolkit · React Router · MUI · Axios · Socket.io client · Swiper · SweetAlert2

## Getting started

Requirements: Node.js and Yarn. The backend must be running (default port `3003`).

```bash
yarn install
```

Create `.env`:

```
REACT_APP_API_URL=http://localhost:3003
```

Run:

```bash
yarn start          # development, http://localhost:3000
yarn build          # production build in build/
yarn start:prod     # serve the build on port 3204
```

## Deployment

`deploy.sh` pulls `master`, installs dependencies, builds and starts the app with PM2 (`YASMIN-REACT`).

```bash
./deploy.sh
```

## Project structure

```
src/app/screens      pages: homePage, productsPage, ordersPage, userPage, helpPage
src/app/components   headers, footer, auth modal, shared UI
src/app/services     API calls (MemberService, ProductService, OrderService)
src/app/hooks        useBasket, useGlobals, useDeviceDetect
src/app/context      global and socket context
src/lib              config, types, enums, static data
src/css              page styles and mobile styles
```
