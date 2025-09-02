# Deployment Guide

This guide covers how to deploy your personal portfolio web app to Vercel and migrate from your existing WordPress site to your new Next.js portfolio at `aysajaneziz.com`.

## Quick Start - Vercel Deployment (Recommended)

Vercel is the recommended platform for deploying Next.js applications due to its seamless integration and performance optimizations.

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal portfolio web app"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/personal-portfolio-web-app.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Visit [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Deploy**: Click "Deploy" and wait for the build to complete

### Step 3: Configure Custom Domain

1. **In your Vercel project dashboard**, go to "Settings" > "Domains"
2. **Add your domains**:
   - Primary: `aysajaneziz.com`
   - Alias: `www.aysajaneziz.com`
3. **Configure DNS at KnownHost**:
   
   **Important**: You'll need to update your DNS settings at KnownHost (your domain registrar) to point to Vercel:
   
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   TTL: 3600 (or Auto)
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 (or Auto)
   ```

4. **Remove old WordPress hosting records**: Delete any existing A records pointing to your old WordPress hosting
5. **Wait for DNS propagation** (typically 1-4 hours, can take up to 24 hours)
6. **Verify domain configuration** in Vercel dashboard
7. **HTTPS is automatic** with Vercel (SSL certificate issued automatically)

## Alternative Deployment Options

### Netlify

1. **Connect your GitHub repo** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add custom domain** in site settings

### Static Export (for Traditional Hosting)

If you prefer static hosting:

1. **Update next.config.js**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true
     }
   }
   ```

2. **Build and export**:
   ```bash
   npm run build
   ```

3. **Upload the `out/` directory** to your hosting provider

## Environment Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Site Configuration
SITE_URL=https://aysajaneziz.com
SITE_NAME="Dr. Aysajan Eziz Portfolio"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Contact Form (Optional)
CONTACT_EMAIL=contact@aysajaneziz.com

# SEO
NEXT_PUBLIC_SITE_VERIFICATION=google-verification-code
```

### Production Environment

In your Vercel dashboard, add these environment variables:
- `SITE_URL`: `https://aysajaneziz.com`
- `SITE_NAME`: `Dr. Aysa Janez Iz Portfolio`
- Add any analytics or service keys as needed

## Pre-Deployment Checklist

### Content Preparation
- [ ] Add your actual content to replace placeholder text
- [ ] Upload profile images and project screenshots to `/public/`
- [ ] Create an Open Graph image (`/public/og-image.png`) - 1200x630px
- [ ] Add favicon files (`/public/favicon.ico`, `/public/icon-192x192.png`, etc.)

### SEO Optimization
- [ ] Update the Google verification code in `app/layout.tsx`
- [ ] Replace placeholder email addresses with real ones
- [ ] Verify all meta descriptions and titles are accurate
- [ ] Test the RSS feed at `/feed.xml`
- [ ] Verify sitemap at `/sitemap.xml`

### Content Migration
- [ ] Run the content migration script to import existing blog posts:
  ```bash
  node scripts/migrate-content.js --all
  ```
- [ ] Review and edit migrated content as needed
- [ ] Update internal links to use the new site structure

### Testing
- [ ] Test all pages in development: `npm run dev`
- [ ] Verify responsive design on mobile devices
- [ ] Test mathematical equations render correctly
- [ ] Check code syntax highlighting works
- [ ] Validate all forms and contact information
- [ ] Run build command: `npm run build`
- [ ] Test the production build locally: `npm start`

## Post-Deployment Tasks

### Domain Migration from WordPress/KnownHost

**IMPORTANT**: This process will replace your existing WordPress site. Consider these steps carefully:

1. **Backup your current WordPress site**:
   - Export WordPress content via WordPress Admin → Tools → Export
   - Download any important files/images from your current site
   - Save database backup if needed (contact KnownHost support if required)

2. **Test your new Next.js site**:
   - Verify the Vercel deployment works at the temporary Vercel URL
   - Test all pages, navigation, and functionality
   - Ensure all content appears correctly

3. **Update DNS records at KnownHost**:
   - Log into your KnownHost control panel
   - Navigate to DNS management for `aysajaneziz.com`
   - **Remove old WordPress hosting A records**
   - **Add new Vercel DNS records** (as specified in Step 3 above)

4. **Monitor the transition**:
   - DNS propagation typically takes 1-4 hours
   - Use tools like `dig aysajaneziz.com` or online DNS checkers to verify
   - Your old WordPress site will stop being accessible once DNS propagates

5. **Post-migration cleanup**:
   - Cancel WordPress hosting with KnownHost (if no longer needed)
   - Update any external links or business cards with new site structure
   - Set up 301 redirects in Vercel if your URL structure changed significantly

### Analytics Setup

1. **Google Analytics 4**:
   - Create a GA4 property
   - Add the tracking ID to your environment variables
   - Implement tracking code if desired

2. **Google Search Console**:
   - Add and verify your domain
   - Submit your sitemap (`/sitemap.xml`)
   - Monitor indexing and search performance

3. **Performance Monitoring**:
   - Monitor Core Web Vitals
   - Set up uptime monitoring
   - Test page load speeds

## Troubleshooting

### Common Issues

**Build Failures**:
- Check for TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure all required dependencies are installed

**Deployment Issues**:
- Check environment variables are set correctly
- Verify build commands match your hosting platform
- Review deployment logs for specific error messages

**DNS Issues**:
- DNS changes typically take 1-4 hours to propagate (rarely up to 24 hours)
- Use `dig aysajaneziz.com` or online DNS checkers to verify records
- Clear your browser cache and DNS cache
- If DNS isn't propagating, double-check KnownHost DNS settings

**Content Issues**:
- Verify MDX files have proper frontmatter
- Check that all referenced images exist in `/public/`
- Test math rendering and code highlighting

### Getting Help

If you encounter issues:

1. **Vercel-specific**: Check Vercel's function logs and deployment logs in dashboard
2. **Domain issues**: Verify DNS settings in KnownHost control panel
3. **Build issues**: Run `npm run build` locally to test
4. **Content issues**: Check browser developer tools for console errors
5. **DNS propagation**: Use online DNS checkers or `dig aysajaneziz.com` command

## Security Considerations

- **HTTPS**: Always use HTTPS (automatic with modern hosting platforms)
- **Content Security Policy**: Consider implementing CSP headers
- **Environment Variables**: Never commit sensitive data to Git
- **Regular Updates**: Keep dependencies updated for security patches

## Maintenance

### Regular Tasks
- Update blog posts and research publications
- Keep project information current
- Monitor and respond to contact form submissions
- Review analytics data for insights

### Technical Maintenance
- Update dependencies regularly: `npm update`
- Monitor site performance and Core Web Vitals
- Backup your content and configuration
- Review and update SEO optimization

---

## Summary: Deployment Steps for aysajaneziz.com

**Quick Checklist:**
1. ✅ Push your code to GitHub
2. ✅ Deploy to Vercel (connects to GitHub automatically)
3. ✅ Add domains `aysajaneziz.com` and `www.aysajaneziz.com` in Vercel dashboard
4. ✅ Update DNS records at KnownHost to point to Vercel
5. ✅ Wait for DNS propagation (1-4 hours)
6. ✅ Verify your new site is live at `aysajaneziz.com`

**Result**: Your WordPress site will be replaced with this modern, ultra-fast Next.js portfolio that loads instantly and showcases your work beautifully.

---

*Your portfolio is now ready for deployment! This modern, fast, and SEO-optimized site will serve as an excellent platform for sharing your work and expertise with the world.*