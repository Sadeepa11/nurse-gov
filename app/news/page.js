"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LEGACY_NEWS } from "@/lib/legacy-news";

// Animation variant
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const formatDateLabel = (dateValue) => {
  if (!dateValue) return '—';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function NewsEventsPage() {
  const [remoteNews, setRemoteNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();

        if (!Array.isArray(data)) {
          setRemoteNews([]);
          return;
        }

        const normalized = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          type: item.type,
          category: item.type === 'event' ? 'Event' : 'News',
          createdAt: item.updatedAt || item.createdAt,
        }));

        setRemoteNews(normalized);
      } catch (error) {
        console.error(error);
        setRemoteNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const sortedRemoteNews = useMemo(() => {
    return [...remoteNews].sort((a, b) => {
      const bDate = b.createdAt || 0;
      const aDate = a.createdAt || 0;
      return new Date(bDate) - new Date(aDate);
    });
  }, [remoteNews]);

  const combinedNews = useMemo(() => {
    const filteredLegacy = LEGACY_NEWS.filter(
      (legacy) => !sortedRemoteNews.some((item) => item.title?.toLowerCase() === legacy.title.toLowerCase())
    );

    if (!sortedRemoteNews.length) {
      return filteredLegacy;
    }

    return [...sortedRemoteNews, ...filteredLegacy];
  }, [sortedRemoteNews]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">News & Events</h1>
            </div>
            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <a href="/">Home</a>
                <span> / </span>
                <a href="#" className="active">
                  News & Events
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="rts-blog-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-area-style-six text-center">
                <h2 className="title">Latest News and Events</h2>
              </div>
            </div>
          </div>

          <div className="row mt--10 g-5">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading...</p>
              </div>
            ) : combinedNews.length ? (
              combinedNews.map((item, index) => {
                const imageSrc = item.imageUrl || '/assets/images/blog/nblog1.png';
                const dateLabel = formatDateLabel(item.createdAt);
                const category = item.category || (item.type === 'event' ? 'Event' : 'News');
                return (
                  <div className="col-lg-4" key={item.id || `${item.title}-${index}`}>
                    <motion.div
                      className="rts-blog-area-style-seven"
                      variants={fadeUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                    >
                      <div className="thumbnail">
                        <Link href={`/news/${item.id}`}>
                          <img
                            src={imageSrc}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '260px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              display: 'block',
                            }}
                          />
                        </Link>
                        <div className="badge">
                          <span>{dateLabel}</span>
                        </div>
                      </div>
                      <div className="content-inner">
                        <div className="top-blog">
                          <span className="main">{category}</span>
                          <span> /by Admin</span>
                        </div>
                        <Link className="title" href={`/news/${item.id}`}>
                          <h5 className="title">{item.title}</h5>
                        </Link>
                        <div style={{ height: '20px' }} aria-hidden />
                        <Link className="rts-read-more btn-primary cursor-pointer" href={`/news/${item.id}`}>
                          <i className="far fa-arrow-right"></i>Read More
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p>No news or events are available right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
