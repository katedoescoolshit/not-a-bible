# Migration Guide - Moving to New Workspace

## Overview

This guide helps you migrate the `not-a-bible` project to its own dedicated workspace for focused development.

## Pre-Migration Checklist

- [x] Project structure created
- [x] Internal documentation written
- [x] Technical specification complete
- [x] Development roadmap defined
- [x] Task tracker initialized
- [ ] Git repository initialized
- [ ] Dependencies documented

---

## Migration Steps

### Step 1: Copy Project to New Location

```bash
# Create new workspace directory
mkdir ~/not-a-bible-workspace

# Copy entire project
cp -r not-a-bible ~/not-a-bible-workspace/

# Navigate to new location
cd ~/not-a-bible-workspace/not-a-bible
```

### Step 2: Initialize Git Repository

```bash
# Initialize Git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.tsbuildinfo
.vercel
EOF

# Initial commit
git add .
git commit -m "Initial commit: Project structure and documentation"
```

### Step 3: Set Up Next.js Project

```bash
# Create a temporary directory for Next.js
mkdir temp-nextjs
cd temp-nextjs

# Initialize Next.js
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Move Next.js files to parent directory
mv * ../ 2>/dev/null || true
mv .* ../ 2>/dev/null || true
cd ..
rmdir temp-nextjs

# Install dependencies
npm install
```

### Step 4: Organize Project Structure

```bash
# Create necessary directories
mkdir -p public/bible-static
mkdir -p app/api/download
mkdir -p components/landing
mkdir -p lib/utils

# Move static Bible files
mv index.html public/bible-static/
mv landing.html public/landing-reference.html
mv data-import-helper.js scripts/
```

### Step 5: Configure Development Environment

Create `.cursorrules` file:

```bash
cat > .cursorrules << 'EOF'
# Not A Bible - Cursor Rules

## Project Context
This is "Not A Bible" - a dual-format Bible distribution system:
1. Next.js marketing/landing site
2. Static HTML Bible reader (fully offline)

## Mission
Digital preservation of scripture for unrestricted access.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Static HTML/CSS/JS for Bible reader

## Development Principles
- Static Bible: Zero dependencies, maximum compatibility
- Next.js Site: Modern, fast, SEO-optimized
- Privacy-first: No tracking by default
- Accessibility: WCAG 2.1 AA minimum

## File Organization
- `/app` - Next.js pages and routes
- `/components` - React components
- `/public/bible-static` - Static Bible reader
- `/lib` - Utilities and helpers
- `/scripts` - Build and data scripts
- `/.internal` - Project documentation

## Code Style
- TypeScript strict mode
- Tailwind for styling
- ESLint + Prettier
- Semantic HTML
- Accessible components

## Testing
- Jest for unit tests
- Playwright for E2E
- Lighthouse for performance
- axe-core for accessibility

## Documentation
See `.internal/` folder for:
- TECHNICAL_SPEC.md
- DEVELOPMENT_ROADMAP.md
- PROJECT_BRIEF.md
- TASK_TRACKER.md
EOF
```

### Step 6: Create README.md

```bash
cat > README.md << 'EOF'
# Not A Bible

**They can't delete what you already have.**

A fully offline-capable Bible designed for digital preservation and unrestricted access.

## Features

- ✅ 100% offline capable
- ✅ Zero dependencies
- ✅ No tracking or surveillance
- ✅ Public domain content (KJV)
- ✅ Works on any device
- ✅ Built to last decades

## Quick Start

### For Users
1. Download the ZIP file
2. Unzip anywhere
3. Open `index.html` in any browser
4. Start reading

### For Developers
```bash
# Clone repository
git clone [your-repo-url]

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
not-a-bible/
├── app/                    # Next.js pages
├── components/             # React components
├── public/
│   └── bible-static/      # Static Bible reader
├── lib/                   # Utilities
├── scripts/               # Build scripts
└── .internal/             # Documentation
```

## Documentation

- [Technical Specification](.internal/TECHNICAL_SPEC.md)
- [Development Roadmap](.internal/DEVELOPMENT_ROADMAP.md)
- [Project Brief](.internal/PROJECT_BRIEF.md)
- [Task Tracker](.internal/TASK_TRACKER.md)

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[License TBD - MIT recommended]

## Mission

Digital preservation is resistance. In an era where access to religious content is increasingly controlled, this project ensures scripture remains accessible, offline, and free.

---

Built with urgency. Shared with love. Preserved for eternity.
EOF
```

### Step 7: Open in Cursor

```bash
# Open project in Cursor
cursor .

# Or if cursor command not available:
# Open Cursor IDE manually and open this folder
```

---

## Post-Migration Tasks

### Immediate (Day 1)
- [ ] Verify all files copied correctly
- [ ] Test Next.js development server
- [ ] Verify static Bible files accessible
- [ ] Review all documentation
- [ ] Update task tracker

### Short-term (Week 1)
- [ ] Set up GitHub repository
- [ ] Configure Vercel deployment
- [ ] Source Bible data (KJV)
- [ ] Begin static Bible development
- [ ] Create landing page design

### Medium-term (Month 1)
- [ ] Complete static Bible core
- [ ] Populate Bible data
- [ ] Build Next.js landing site
- [ ] Testing and optimization
- [ ] Prepare for launch

---

## Workspace Configuration

### Recommended VS Code/Cursor Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens
- Error Lens

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Troubleshooting

### Issue: Next.js won't start
**Solution**: Delete `node_modules` and `.next`, then run `npm install`

### Issue: TypeScript errors
**Solution**: Run `npm run type-check` to see all errors

### Issue: Tailwind not working
**Solution**: Check `tailwind.config.ts` and ensure paths are correct

### Issue: Static Bible not loading
**Solution**: Check file paths in `public/bible-static/`

---

## Resources

### Bible Data Sources
- https://github.com/scrollmapper/bible_databases
- https://github.com/thiagobodruk/bible
- https://bible-api.com/

### Next.js Resources
- https://nextjs.org/docs
- https://tailwindcss.com/docs
- https://www.typescriptlang.org/docs

### Deployment
- https://vercel.com/docs
- https://docs.netlify.com/

---

## Contact

For questions or issues during migration:
- Check `.internal/` documentation
- Review task tracker
- Consult technical specification

---

**Migration Status**: Ready
**Last Updated**: November 21, 2025
**Next Steps**: Initialize Git and set up Next.js
