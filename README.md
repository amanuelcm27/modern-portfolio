# Amanuel Firew Lema Portfolio

A modern, interactive one-page portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, and React Three Fiber.

The site highlights backend engineering, Django specialization, and AI-focused work through immersive visuals, scroll storytelling, 3D interactions, and animated UI sections.

## Highlights

- Futuristic hero section with animated 3D particle background and blended portrait treatment
- Smooth section flow with animated reveals and micro-interactions
- Featured project spotlight for Kazana Lighthouse
- Interactive projects grid with modal details
- Animated skills visualization
- Tech stack node network with hover interactions on desktop
- Mobile-friendly fallback tech stack list
- Floating right navigation with desktop hover labels and mobile collapsible menu
- Contact form with inline validation (Zod + React Hook Form)
- Server-side email delivery through Resend API route

## Sections

- Hero
- About Me
- Featured Project (Kazana Lighthouse)
- Projects
- Skills
- Tech Stack
- Contact

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js via @react-three/fiber and @react-three/drei
- React Hook Form
- Zod
- Resend

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Environment Variables

Create a `.env.local` file in the project root with:

```env
RESEND_API_KEY=your_resend_api_key
```

This key is used by the server route at `src/app/api/contact/route.ts` to send contact form submissions to:

- amanuelfirew27@gmail.com

## Notes

- Keep `RESEND_API_KEY` private (do not use `NEXT_PUBLIC_` prefix for secret keys).
- If email sending fails in production, verify your Resend sender/domain settings.
