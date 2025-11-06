# FrontStory – Campaign Cost & Revenue Report

Small **React + TypeScript + Vite** dashboard to manage ad campaigns.

## Features
- Table: Name, Start, End, Clicks, Cost, Revenue, **Profit = Revenue − Cost**
- Add / Delete campaigns
- Sort by name, dates, profit
- **LocalStorage** persistence (first run seeds demo data)

## Tech
React 18 · TypeScript · Vite · Plain CSS · LocalStorage

## Quick start
```bash
npm i
npm run dev        # http://localhost:5173
npm run build
npm run preview    # http://localhost:4173
```

## Structure
```bash
src/
  App.tsx                  # state, sorting, persistence
  components/
    CampaignForm.tsx       # controlled form + minimal validation
    CampaignTable.tsx      # sortable table, profit highlight, delete
  lib/storage.ts           # typed localStorage helpers (+ seed flag)
  index.css
```

## Notes

- I used ChatGPT to fix a Node version issue (migrated to Node 20 via nvm).
- I double-checked docs for TS syntax:
  - Vite + React: https://vite.dev/guide/
  - React + TypeScript: https://react.dev/learn/typescript
  - Type-only imports (import type): https://www.typescriptlang.org/docs/handbook/2/modules.html#import-type

- Seeding: the first run loads 2 demo campaigns; afterward LocalStorage is the source of truth. To reset, clear fs_campaigns_v1 and fs_campaigns_initialized_v1 in LocalStorage.
