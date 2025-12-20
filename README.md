# Nikita Polyanskii - Academic Website

A modern academic website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, neutral color scheme with accent colors and smooth animations
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive**: Mobile-first design that works on all devices
- **Static Export**: Optimized for GitHub Pages deployment
- **Fast**: Static site generation for optimal performance

## Pages

- **Home**: Hero section with introduction and quick stats
- **About**: Bio, education, experience, and research interests
- **Publications**: Filterable list of academic publications
- **Research**: Current and completed research projects

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## Customization

### Personal Information

Update the following files with your information:

- `src/app/layout.tsx` - Site metadata (title, description)
- `src/app/page.tsx` - Home page content and stats
- `src/app/about/page.tsx` - Bio, education, experience
- `src/components/Header.tsx` - Your name in the navigation
- `src/components/Footer.tsx` - Social links and contact

### Publications

Edit `src/data/publications.json` to add your publications:

```json
{
  "id": "1",
  "title": "Publication Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference/Journal Name",
  "year": 2024,
  "abstract": "Abstract text...",
  "doi": "10.1000/example",
  "pdf": "/papers/example.pdf",
  "tags": ["Topic 1", "Topic 2"]
}
```

### Research Projects

Edit `src/data/projects.json` to add your projects:

```json
{
  "id": "1",
  "title": "Project Title",
  "description": "Project description...",
  "status": "ongoing",
  "year": "2023 - Present",
  "tags": ["Topic 1"],
  "links": {
    "github": "https://github.com/...",
    "paper": "/publications",
    "demo": null
  }
}
```

### Profile Image

Add your profile image to `public/images/profile.jpg` and uncomment the Image component in `src/app/about/page.tsx`.

## Deployment

This site is configured for automatic deployment to GitHub Pages. Push to the `main` branch to trigger a deployment.

### Manual Deployment

1. Run `npm run build`
2. The `out/` directory contains the static site
3. Push the contents to GitHub Pages

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
