/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    const permanent = true;
    return [
      { source: "/:lang(en|zh)/capabilities", destination: "/:lang/companies", permanent },
      { source: "/:lang(en|zh)/what-we-do", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/what-we-do/enter-the-uk", destination: "/:lang/capabilities", permanent },
      {
        source: "/:lang(en|zh)/what-we-do/building-uk-presence",
        destination: "/:lang/capabilities",
        permanent
      },
      {
        source: "/:lang(en|zh)/what-we-do/launch-in-the-uk",
        destination: "/:lang/capabilities#industry-presence-events",
        permanent
      },
      {
        source: "/:lang(en|zh)/what-we-do/create-in-the-uk",
        destination: "/:lang/capabilities#creative-production-brand-assets",
        permanent
      },
      { source: "/:lang(en|zh)/services", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/services/uk-market-entry", destination: "/:lang/capabilities", permanent },
      {
        source: "/:lang(en|zh)/services/events-exhibitions",
        destination: "/:lang/capabilities#industry-presence-events",
        permanent
      },
      {
        source: "/:lang(en|zh)/services/commercial-production",
        destination: "/:lang/capabilities#creative-production-brand-assets",
        permanent
      },
      {
        source: "/:lang(en|zh)/services/research-innovation",
        destination: "/:lang/capabilities#institutional-expert-collaboration",
        permanent
      },
      { source: "/:lang(en|zh)/industries", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/industries/:path*", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/expertise", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/expertise/:path*", destination: "/:lang/capabilities", permanent },
      {
        source: "/:lang(en|zh)/talent",
        destination: "/:lang/capabilities#creators-talent-cultural-partnerships",
        permanent
      },
      { source: "/:lang(en|zh)/for-agencies", destination: "/:lang/capabilities", permanent },
      { source: "/:lang(en|zh)/work/london-celebrity-event-coverage", destination: "/:lang/work", permanent },
      {
        source: "/:lang(en|zh)/work/fashion-campaign-production-london",
        destination: "/:lang/capabilities#creative-production-brand-assets",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/ai-product-video-uk-market",
        destination: "/:lang/capabilities#creative-production-brand-assets",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/beauty-creator-content-sprint",
        destination: "/:lang/capabilities#creators-talent-cultural-partnerships",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/automotive-event-presenter-support",
        destination: "/:lang/capabilities#industry-presence-events",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/jewellery-editorial-shoot",
        destination: "/:lang/capabilities#creative-production-brand-assets",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/uk-brand-launch-roadshow",
        destination: "/:lang/capabilities#industry-presence-events",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/investor-strategic-partner-roadshow-production",
        destination: "/:lang/capabilities",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/product-demonstration-buyer-roadshow",
        destination: "/:lang/capabilities#industry-presence-events",
        permanent
      },
      {
        source: "/:lang(en|zh)/work/innovation-university-industry-roadshow",
        destination: "/:lang/capabilities#institutional-expert-collaboration",
        permanent
      },
      { source: "/:lang(en|zh)/work/teal-editorial-series", destination: "/:lang/work", permanent },
      { source: "/:lang(en|zh)/work/commercial-fashion-styling", destination: "/:lang/work", permanent },
      { source: "/:lang(en|zh)/work/creative-beauty-makeup", destination: "/:lang/work", permanent }
    ];
  },
  async headers() {
    const production = process.env.RELEASE_PROFILE === "production";
    const scriptSrc = production
      ? "script-src 'self' 'unsafe-inline'"
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          scriptSrc,
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "media-src 'self' blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'"
        ].join("; ")
      },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" }
    ];
    if (production)
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains"
      });
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
