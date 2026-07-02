# Patel Sales - React.js Migration

This is the React.js version of the Patel Sales wholesale food service supplies e-commerce site, migrated from Next.js to use Vite and React Router.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management (cart)
- **Heroicons** - Icons

## Project Structure

```
ReactJS/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore rules
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Root component with Router
    ├── styles/
    │   └── tailwind.css    # Tailwind styles
    ├── types/
    │   └── index.ts        # TypeScript type definitions
    ├── data/
    │   └── mockData.ts     # Mock data for products/categories
    ├── store/
    │   └── cartStore.ts     # Zustand cart state management
    ├── components/
    │   ├── Layout.tsx      # Main layout component
    │   ├── Header.tsx      # Site header
    │   ├── Footer.tsx      # Site footer
    │   ├── BottomNav.tsx   # Mobile bottom navigation
    │   ├── ProductCard.tsx # Product display card
    │   ├── ui/             # UI utility components
    │   │   ├── AppIcon.tsx
    │   │   └── AppImage.tsx
    │   ├── cart/           # Cart-related components
    │   │   ├── CartClientPage.tsx
    │   │   ├── CartEmpty.tsx
    │   │   ├── CartItemRow.tsx
    │   │   └── CartSummary.tsx
    │   └── products/       # Products page components
    │       ├── ProductsClientPage.tsx
    │       ├── ProductsSidebar.tsx
    │       ├── ProductsFilterDrawer.tsx
    │       └── ProductsSkeleton.tsx
    └── pages/
        ├── HomePage.tsx     # Home page
        ├── ProductsPage.tsx # Products listing page
        ├── CartPage.tsx     # Shopping cart page
        └── NotFoundPage.tsx # 404 page
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd ReactJS
npm install
```

This will install all required dependencies including:
- react, react-dom
- react-router-dom
- zustand
- @heroicons/react
- tailwindcss, postcss, autoprefixer
- vite, @vitejs/plugin-react
- TypeScript and ESLint packages

### 2. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:4028`

### 3. Build for Production

```bash
npm run build
```

The optimized build will be output to the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Key Changes from Next.js

### Routing
- **Next.js**: App Router with file-based routing (`app/` directory)
- **React**: React Router v6 with explicit route definitions in `Layout.tsx`

### Images
- **Next.js**: `next/image` component with optimization
- **React**: Standard `<img>` tags with custom `AppImage` component for loading states

### Links
- **Next.js**: `next/link` component
- **React**: `react-router-dom` Link component

### State Management
- Both versions use Zustand for cart state management
- Local storage persistence is maintained

### Styling
- Both versions use Tailwind CSS
- Custom utility classes preserved in `tailwind.css`

## Features

- **Product Catalog**: Browse products with filtering and sorting
- **Shopping Cart**: Add/remove items, quantity controls
- **Category Navigation**: Filter by product categories
- **Responsive Design**: Mobile-first with bottom navigation
- **Search**: Search products by name
- **Flash Sales**: Highlighted sale items with countdown
- **Trust Indicators**: Customer reviews, ratings, and trust badges

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Port Configuration

The dev server is configured to run on port 4028 to avoid conflicts with the Next.js version (which typically uses port 3000).

## Environment Variables

No environment variables are required for the current setup. If you need to add API endpoints or configuration, create a `.env` file in the ReactJS directory.

## Troubleshooting

### TypeScript Errors After Installation
If you see TypeScript errors after running `npm install`, try:
```bash
npm install --save-dev @types/react @types/react-dom
```

### Port Already in Use
If port 4028 is already in use, you can either:
1. Stop the process using port 4028
2. Change the port in `vite.config.ts` by modifying the `server.port` value

### Build Errors
If you encounter build errors:
1. Ensure all dependencies are installed: `npm install`
2. Clear the Vite cache: `rm -rf node_modules/.vite`
3. Try building again: `npm run build`

## Next Steps

To complete the migration:

1. **Copy Assets**: Copy images, fonts, favicon, and other static assets from the Next.js `public/` folder to the ReactJS `public/` folder
2. **API Integration**: Replace mock data with actual API calls
3. **Environment Variables**: Add any required environment variables for API endpoints
4. **Testing**: Test all user flows and functionality
5. **Deployment**: Deploy the `dist/` folder to your hosting provider

## Deployment

The `dist/` folder contains the production-ready files. You can deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting provider

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

For Netlify deployment:
```bash
npm run build
# Upload the dist/ folder to Netlify
```
