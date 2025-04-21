# Deepak Kumar - Personal Website

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Modern UI with Tailwind CSS
- TypeScript support
- Easy deployment to Vercel
- Contact form
- Project showcase
- Professional bio

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

## Deployment

This website is optimized for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect it as a Next.js project and deploy it

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint
- PostCSS
- @tailwindcss/typography

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
```

## Customization

1. Update the content in `src/app/page.tsx`
2. Modify the projects list in `src/components/Projects.tsx`
3. Update contact information in `src/components/Contact.tsx`
4. Customize styles in `tailwind.config.js`

## License

MIT
