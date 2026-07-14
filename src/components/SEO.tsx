import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  canonicalUrl?: string;
  schemaMarkup?: object | object[];
}

export default function SEO({
  title,
  description = "The Prachar Setu — Premium Website Development Company, Digital Marketing Agency, AI Automation, Logo Design, and Google Business Profile Optimization expert. Founded by Narayan Kumar Vaishnav. Serving Pathalgaon, Jashpur, Raigarh, Raipur, Bilaspur, Ambikapur, Korba, Surguja, Chhattisgarh, Odisha, and PAN India. High-speed websites, Meta ads, Google Maps rankings, and custom automation.",
  keywords = "The Prachar Setu, Prachar Setu, Narayan Kumar Vaishnav, Website Development, Website Developer, Website Design, Website Company, Website Agency, Business Website, Portfolio Website, Landing Page, Ecommerce Website, Website Maintenance, Website Speed Optimization, Google Business Profile, Google Maps Listing, Digital Marketing, Meta Ads, Google Ads, Social Media Marketing, AI Automation, AI Chatbot, AI Video Generation, AI Image Generation, SEO, Branding, Logo Design, Graphic Design, Video Editing, Poster Design, Thumbnail Design, Pathalgaon, Jashpur, Raigarh, Raipur, Bilaspur, Ambikapur, Korba, Surguja, Chhattisgarh, Odisha, India",
  ogType = "website",
  canonicalUrl = "https://thepracharsetu.com/",
  schemaMarkup
}: SEOProps) {
  const finalTitle = `${title} | The Prachar Setu`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Helper to set/update meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    
    // Open Graph / Facebook Meta
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:site_name', "The Prachar Setu");
    setMetaTag('property', 'og:image', "https://thepracharsetu.com/favicon.png");
    
    // Twitter Meta
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', "https://thepracharsetu.com/favicon.png");

    // 3. Handle Canonical URL
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonicalUrl);
    }

    // 4. Build Default Multi-Schema Graph
    const baseOrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://thepracharsetu.com/#organization",
      "name": "The Prachar Setu",
      "url": "https://thepracharsetu.com",
      "logo": "https://thepracharsetu.com/favicon.png",
      "founder": {
        "@type": "Person",
        "name": "Narayan Kumar Vaishnav"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "thepracharsetu@gmail.com",
        "availableLanguage": ["English", "Hindi"]
      }
    };

    const baseLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://thepracharsetu.com/#localbusiness",
      "name": "The Prachar Setu",
      "url": "https://thepracharsetu.com",
      "logo": "https://thepracharsetu.com/favicon.png",
      "founder": {
        "@type": "Person",
        "name": "Narayan Kumar Vaishnav"
      },
      "priceRange": "₹₹",
      "telephone": "+91-9999999999",
      "image": "https://thepracharsetu.com/favicon.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Road, Pathalgaon",
        "addressLocality": "Pathalgaon",
        "addressRegion": "Chhattisgarh",
        "postalCode": "496118",
        "addressCountry": "IN"
      },
      "areaServed": [
        "Pathalgaon", "Jashpur", "Raigarh", "Raipur", "Bilaspur", 
        "Ambikapur", "Korba", "Surguja", "Chhattisgarh", "Odisha", "India"
      ]
    };

    const baseWebsiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://thepracharsetu.com/#website",
      "name": "The Prachar Setu",
      "url": "https://thepracharsetu.com",
      "publisher": {
        "@id": "https://thepracharsetu.com/#organization"
      }
    };

    const founderSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://thepracharsetu.com/#founder",
      "name": "Narayan Kumar Vaishnav",
      "jobTitle": "Founder & CEO of The Prachar Setu",
      "worksFor": {
        "@id": "https://thepracharsetu.com/#organization"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does The Prachar Setu provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Prachar Setu offers premium Website Development (Business websites, landing pages, and e-commerce), Google Business Profile & Maps Listing optimization, Digital Marketing (Meta & Google Ads), AI Automation solutions, and branding assets like Logo & Poster design."
          }
        },
        {
          "@type": "Question",
          "name": "Where is The Prachar Setu located, and which locations do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are based in Pathalgaon, Jashpur, Chhattisgarh, and actively serve clients in Raigarh, Raipur, Bilaspur, Ambikapur, Korba, Surguja, other districts of Chhattisgarh, Odisha, and all across India."
          }
        },
        {
          "@type": "Question",
          "name": "Who is the founder of The Prachar Setu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Prachar Setu was founded by Narayan Kumar Vaishnav to empower local business owners with premium-class high-speed digital solutions."
          }
        }
      ]
    };

    const finalSchemas = schemaMarkup 
      ? (Array.isArray(schemaMarkup) ? schemaMarkup : [schemaMarkup])
      : [baseOrganizationSchema, baseLocalBusinessSchema, baseWebsiteSchema, founderSchema, faqSchema];

    // 5. Inject Schemas
    const existingScript = document.getElementById('seo-schema-script');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'seo-schema-script';
    schemaScript.setAttribute('type', 'application/ld+json');
    schemaScript.innerHTML = JSON.stringify(finalSchemas);
    document.head.appendChild(schemaScript);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('seo-schema-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [finalTitle, description, keywords, ogType, canonicalUrl, schemaMarkup]);

  return null;
}
