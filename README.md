# LewdVerse Premium Website

A premium cinematic website for LewdVerse - Advanced Intimacy Technology.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (product database)
- Jupiter swap widget

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                 # Main router
├── main.tsx              # Entry point
├── index.css             # Global styles + animations
├── components/
│   ├── Header.tsx        # Navigation
│   ├── Footer.tsx        # Footer with Jupiter widget
│   ├── Hero.tsx          # Hero section with video
│   ├── Products.tsx      # Product grid
│   ├── About.tsx         # About section
│   └── ProductDetail.tsx # Product detail page
├── context/
│   └── CartContext.tsx    # Shopping cart state
├── lib/
│   └── supabase.ts       # Supabase client + types
└── pages/
    ├── HomePage.tsx
    ├── ProductsPage.tsx
    ├── AboutPage.tsx
    └── CartPage.tsx
```

## Contract Address

`EpDExDuYGp1Sg7c9TQgdEWMzSmmzCm1JWh1pvD9epump`

## Assets Required

- `/betaerselogo1.png` - Logo
- `/rapidsave.com_the_future_of_intimacy-csrm5mhpouxf1.mp4` - Hero video
- `/9379ab7275d1f03461cf0fc67630b3d4.png` - About section image