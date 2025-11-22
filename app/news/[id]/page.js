import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readData } from "../../../lib/file-db";
import { LEGACY_NEWS, findLegacyNewsById } from "../../../lib/legacy-news";

export const dynamic = "force-dynamic";

const DATA_FILENAME = "news-events.json";

const formatDateLabel = (dateValue) => {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeEntry = (entry) => {
  if (!entry) return null;
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    imageUrl: entry.imageUrl,
    type: entry.type || "news",
    category: entry.category,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    author: entry.author || "Admin",
  };
};

async function loadNewsItem(id) {
  const items = await readData(DATA_FILENAME);
  const stored = items.find((item) => item.id === id);
  if (stored) {
    return normalizeEntry(stored);
  }
  const legacy =
    findLegacyNewsById(id) || LEGACY_NEWS.find((item) => item.id === id);
  return normalizeEntry(legacy);
}

export async function generateMetadata({ params }) {
  const entry = await loadNewsItem(params.id);
  if (!entry) {
    return {
      title: "News item not found | ACNU",
    };
  }
  return {
    title: `${entry.title} | ACNU News`,
    description: entry.description
      ? entry.description.slice(0, 150)
      : undefined,
  };
}

const styles = `
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #1f2937;
    background: white;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .back-link:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateX(-4px);
    border-color: #374151;
  }
  .type-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: white;
    fontSize: 0.75rem;
    fontWeight: 700;
    letterSpacing: 0.1em;
    textTransform: uppercase;
    boxShadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  }
  .category-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: 999px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
    fontSize: 0.8rem;
    fontWeight: 500;
  }
  .share-button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .share-button:hover {
    transform: translateY(-4px);
  }
  .share-button-facebook {
    background: #1877f2;
    box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
  }
  .share-button-facebook:hover {
    box-shadow: 0 8px 20px rgba(24, 119, 242, 0.4);
  }
  .share-button-twitter {
    background: #1da1f2;
    box-shadow: 0 4px 12px rgba(29, 161, 242, 0.3);
  }
  .share-button-twitter:hover {
    box-shadow: 0 8px 20px rgba(29, 161, 242, 0.4);
  }
  .share-button-linkedin {
    background: #0a66c2;
    box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
  }
  .share-button-linkedin:hover {
    box-shadow: 0 8px 20px rgba(10, 102, 194, 0.4);
  }
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border-radius: 999px;
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
  }
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
  }
  .hero-image-container {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    .hero-image-container {
      height: 350px;
      border-radius: 12px;
    }
  }
`;

export default async function NewsDetailPage({ params }) {
  const entry = await loadNewsItem(params.id);

  if (!entry) {
    notFound();
  }

  const displayDate = formatDateLabel(entry.updatedAt || entry.createdAt);
  const imageSrc = entry.imageUrl || "/assets/images/blog/nblog1.png";
  const backHref = "/news";
  const typeLabel = entry.type === "event" ? "Event" : "News";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <article style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* Header Section */}
        <div style={{ 
          padding: '40px 0 60px',
          background: '#f9fafb'
        }}>
          <div className="container">
            <Link href={backHref} className="back-link">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back to News &amp; Events
            </Link>

            <div style={{ maxWidth: '900px', marginTop: '32px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span className="type-badge">
                  {typeLabel}
                </span>
                {entry.category && (
                  <span className="category-badge">
                    {entry.category}
                  </span>
                )}
              </div>

              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                fontWeight: 800, 
                lineHeight: 1.2, 
                marginBottom: '24px',
                color: '#111827'
              }}>
                {entry.title}
              </h1>

              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                flexWrap: 'wrap', 
                fontSize: '0.95rem', 
                alignItems: 'center',
                color: '#6b7280'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fca5a5 0%, #dc2626 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                  }}>
                    {entry.author.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: '900', color: '#374151' , fontSize: '10px' }}>By {entry.author}</span>
                </div>
                <div style={{ 
                  width: '4px', 
                  height: '4px', 
                  borderRadius: '50%', 
                  background: '#d1d5db' 
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight:'bold' }}>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <time>{displayDate}</time>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="container" style={{ marginTop: '0', paddingBottom: '60px' }}>
          <div className="hero-image-container">
            <Image
              src={imageSrc}
              alt={entry.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(min-width: 1200px) 1140px, 100vw"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="container" style={{ paddingBottom: '80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <section style={{ 
              fontSize: '1.125rem', 
              lineHeight: 1.8, 
              color: '#374151',
            }}>
              {entry.description
                ? entry.description.split(/\n{2,}/).map((paragraph, index) => (
                    <p key={index} style={{ 
                      marginBottom: '1.5rem',
                      textAlign: 'justify'
                    }}>
                      {paragraph}
                    </p>
                  ))
                : <p>No description available.</p>}
            </section>

            <hr style={{ 
              margin: '48px 0', 
              border: 'none',
              borderTop: '2px solid #e5e7eb'
            }} />

            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '16px', 
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '700', color: '#374151', fontSize: '0.95rem' }}>Share:</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://acnu.lk/news/${entry.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-facebook"
                    aria-label="Share on Facebook"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://acnu.lk/news/${entry.id}`)}&text=${encodeURIComponent(entry.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-twitter"
                    aria-label="Share on Twitter"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://acnu.lk/news/${entry.id}`)}&title=${encodeURIComponent(entry.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-linkedin"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link href={backHref} className="cta-button" style={{ fontSize: '15px' }}>
                View All {entry.type === 'event' ? 'Events' : 'News'}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}