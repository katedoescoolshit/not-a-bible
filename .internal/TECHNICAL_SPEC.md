# Not A Bible - Technical Specification

## Architecture Overview

### Two-Part System

```
not-a-bible/
├── Next.js Site (Marketing/Landing)
│   ├── Modern web framework
│   ├── SEO optimized
│   ├── Download functionality
│   └── Hosted on Vercel/Netlify
│
└── Static Bible (Offline Reader)
    ├── Pure HTML/CSS/JS
    ├── Zero dependencies
    ├── Single file capable
    └── Distributed as ZIP
```

## Component 1: Next.js Landing Site

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Hosting**: Vercel (recommended) or Netlify
- **Analytics**: Optional, privacy-focused (Plausible/Fathom)

### Features
- Hero section with mission statement
- Download functionality (ZIP generation)
- Feature showcase
- FAQ section
- GitHub integration
- SEO optimization
- Open Graph tags for social sharing

### Pages
1. **Home** (`/`) - Landing page with download
2. **About** (`/about`) - Mission and story
3. **FAQ** (`/faq`) - Common questions
4. **Contribute** (`/contribute`) - How to help
5. **Read Online** (`/read`) - Embedded static Bible

### API Routes
- `/api/download` - Generate and serve ZIP file
- `/api/stats` (optional) - Download statistics

## Component 2: Static HTML Bible

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling (no preprocessors)
- **Vanilla JavaScript** - ES6+ (no frameworks)
- **LocalStorage** - Bookmarks and preferences

### File Structure
```
bible-static/
├── index.html          # Main reader interface
├── data/
│   ├── kjv.json       # Bible data (KJV)
│   └── metadata.json  # Book/chapter info
├── styles/
│   └── reader.css     # Embedded or separate
└── scripts/
    └── reader.js      # Embedded or separate
```

### Features

#### Core Functionality
- Book/chapter navigation
- Verse display
- Search functionality (client-side)
- Bookmarks (localStorage)
- Reading history (localStorage)
- Font size adjustment
- Theme toggle (light/dark)

#### Advanced Features (Phase 2)
- Cross-references
- Study notes
- Verse highlighting
- Copy/share verses
- Reading plans
- Offline search indexing

### Data Format

#### Bible Data Structure
```json
{
  "Genesis": {
    "chapters": 50,
    "verses": {
      "1": [
        "In the beginning God created the heaven and the earth.",
        "And the earth was without form..."
      ]
    }
  }
}
```

#### Metadata Structure
```json
{
  "version": "KJV",
  "books": [
    {
      "name": "Genesis",
      "testament": "Old",
      "chapters": 50,
      "verses": 1533
    }
  ]
}
```

## Performance Requirements

### Static Bible
- **Load Time**: < 2 seconds on 3G
- **File Size**: < 15 MB total (including all data)
- **Memory**: < 50 MB RAM usage
- **Compatibility**: IE11+ (graceful degradation)

### Next.js Site
- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **SEO Score**: 100

## Browser Support

### Static Bible (Maximum Compatibility)
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- IE 11 (basic functionality)
- Mobile browsers (iOS Safari 11+, Chrome Android 60+)

### Next.js Site (Modern Browsers)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Sources

### Primary Source
- **King James Version (KJV)** - Public domain
- Source: https://github.com/scrollmapper/bible_databases

### Future Sources
- American Standard Version (ASV) - Public domain
- World English Bible (WEB) - Public domain
- Other public domain translations

## Security Considerations

### Static Bible
- No external requests (fully offline)
- No user data collection
- No cookies or tracking
- LocalStorage only for user preferences
- XSS prevention (sanitize any user input)

### Next.js Site
- HTTPS only
- CSP headers
- No sensitive data storage
- Rate limiting on download endpoint
- CORS configuration

## Deployment Strategy

### Next.js Site
1. **Development**: Local development server
2. **Staging**: Vercel preview deployments
3. **Production**: Vercel production deployment
4. **Domain**: Custom domain with SSL

### Static Bible Distribution
1. **GitHub Releases**: Version-tagged releases
2. **Direct Download**: Served from Next.js site
3. **CDN**: Optional CDN for faster downloads
4. **Mirrors**: Community-hosted mirrors

## Version Control

### Git Strategy
- **Main Branch**: Production-ready code
- **Develop Branch**: Active development
- **Feature Branches**: Individual features
- **Release Tags**: Semantic versioning (v1.0.0)

### Release Process
1. Develop feature in branch
2. Merge to develop
3. Test thoroughly
4. Merge to main
5. Tag release
6. Deploy to production
7. Create GitHub release with ZIP

## Testing Strategy

### Static Bible
- **Manual Testing**: Cross-browser testing
- **Automated Testing**: Playwright for E2E
- **Performance Testing**: Lighthouse CI
- **Accessibility Testing**: axe-core

### Next.js Site
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Playwright
- **E2E Tests**: Playwright
- **Visual Regression**: Percy or Chromatic

## Monitoring & Analytics

### Static Bible
- No tracking by default
- Optional: Privacy-focused analytics (user opt-in)
- Error logging: None (fully offline)

### Next.js Site
- **Analytics**: Plausible or Fathom (privacy-focused)
- **Error Tracking**: Sentry (optional)
- **Performance**: Vercel Analytics
- **Uptime**: UptimeRobot or similar

## Backup & Redundancy

### Code
- GitHub repository (primary)
- GitLab mirror (backup)
- Local backups

### Data
- Bible data in version control
- Multiple data source backups
- Community mirrors

### Hosting
- Primary: Vercel
- Backup: Netlify
- Self-hosting instructions provided

## Documentation Requirements

### User Documentation
- README.md - Project overview
- USAGE.md - How to use the Bible reader
- FAQ.md - Common questions
- CONTRIBUTING.md - How to contribute

### Developer Documentation
- TECHNICAL_SPEC.md - This document
- API.md - API documentation (if applicable)
- DEPLOYMENT.md - Deployment instructions
- DEVELOPMENT.md - Development setup

## Future Technical Considerations

### Potential Enhancements
- Progressive Web App (PWA) version
- Mobile app wrapper (Capacitor/React Native)
- Desktop app (Electron)
- Browser extension
- API for third-party integrations

### Scalability
- CDN for static assets
- Edge functions for dynamic content
- Database for user accounts (optional)
- GraphQL API (optional)

---

**Last Updated**: November 21, 2025
**Version**: 1.0.0-draft
**Status**: In Development
