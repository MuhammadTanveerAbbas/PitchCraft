# PitchCraft

**AI-Powered Startup Pitch Generator**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B00?style=flat&logo=ai&logoColor=white)

---

## What is PitchCraft?

PitchCraft uses AI to generate structured startup pitches in under 60 seconds. Enter your idea, and get a complete pitch with market analysis, features, roadmap, and viability rating.

**Generated Content:**
- Elevator Pitch
- Market Analysis
- Key Features (3-5)
- Monetization Strategy
- MVP Roadmap
- Pitch Deck Outline
- Viability Rating (1-5 stars)
- Markdown Export

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **AI:** Groq (Llama 3.3 70B)
- **Auth:** Supabase
- **Payments:** Stripe
- **Deployment:** Vercel

---

## Features

- Fast generation (under 60 seconds)
- 24+ industry categories
- Complete pitch structure
- Market analysis & insights
- Markdown export
- User authentication
- Free & paid plans
- Dashboard with analytics
- Responsive design

---

## Setup

### Prerequisites
- Node.js 18+
- Groq API key ([Get one here](https://console.groq.com))
- Supabase account ([Sign up](https://supabase.com))
- Stripe account (optional, for payments)

### Installation

```bash
git clone https://github.com/MuhammadTanveerAbbas/pitchcraft.git
cd pitchcraft
npm install
```

### Environment Variables

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

---

## What PitchCraft Is NOT

- Not a replacement for market research
- Not legal or financial advice
- Not a guarantee of funding
- Not industry-specific expertise

PitchCraft accelerates your pitch creation process but doesn't replace the hard work of building a real business.

---

## License

MIT License

---

## Author

**Muhammad Tanveer Abbas**

[Portfolio](https://muhammadtanveerabbas.vercel.app/) • [GitHub](https://github.com/MuhammadTanveerAbbas) • [LinkedIn](https://linkedin.com/in/muhammadtanveerabbas)