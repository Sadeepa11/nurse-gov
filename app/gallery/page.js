"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PLACEHOLDER_ITEMS = Array.from({ length: 60 }, (_, index) => {
  const id = index + 1;
  return {
    key: `placeholder-${id}`,
    url: `/assets/images/product/${id}.png`,
    title: "ALL CEYLON NURSES’ UNION",
    subtitle: "Sri Lanka",
    href: "/project-details",
    source: "placeholder",
  };
});

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch gallery data");
        const data = await res.json();

        if (!Array.isArray(data)) {
          setAlbums([]);
          return;
        }

        const sanitizedAlbums = data.map((album) => ({
          id: album.id || `album-${Math.random().toString(36).slice(2)}`,
          albumTitle: album?.albumTitle?.trim() || "Gallery",
          description: album?.description?.trim() || "Sri Lanka",
          createdAt: album?.createdAt || null,
          updatedAt: album?.updatedAt || album?.createdAt || null,
          images: Array.isArray(album?.images)
            ? album.images
                .filter((image) => image?.url)
                .map((image, idx) => ({
                  id: image.id || `${album.id || "album"}-${idx}`,
                  url: image.url,
                  altText: image.altText || album.albumTitle || "Gallery Photo",
                  createdAt: image.createdAt || album.updatedAt || album.createdAt || null,
                }))
            : [],
        }));

        setAlbums(sanitizedAlbums);
      } catch (error) {
        console.error("Unable to load gallery items:", error);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const sortedAlbums = useMemo(() => {
    return [...albums].sort((a, b) => {
      const aDate = a.updatedAt || a.createdAt || 0;
      const bDate = b.updatedAt || b.createdAt || 0;
      return new Date(bDate) - new Date(aDate);
    });
  }, [albums]);
  const legacyItems = PLACEHOLDER_ITEMS;

  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Gallery</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="portfolio-area style-4 pt--120 pb--120 pt_xs--60">
        <div className="container">
          {loading ? (
            <div className="row">
              <div className="col-12 text-center">
                <p>Loading albums...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <div className="rts-title-area text-center mb-4">
                    <p className="pre-title">Photo Albums</p>
                    <h2 className="title">Latest Uploads</h2>
                    <p className="disc">
                      Discover our newest albums. Click any card to view the full gallery.
                    </p>
                  </div>
                </div>
              </div>

              {sortedAlbums.length ? (
                <div className="row">
                  {sortedAlbums.map((album) => {
                    const coverImage = album.images[0]?.url || "/assets/images/product/1.png";
                    return (
                      <div key={album.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <Link
                          href={`/gallery/${encodeURIComponent(album.id)}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            className="item"
                            style={{
                              cursor: "pointer",
                              height: "100%",
                            }}
                          >
                            <div className="portfolio-wrapper">
                              <div
                                className="img-fluid"
                                style={{ width: "100%", height: "250px", overflow: "hidden" }}
                              >
                                <Image
                                  src={coverImage}
                                  alt={album.albumTitle}
                                  width={400}
                                  height={300}
                                  className="w-100"
                                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                />
                              </div>
                              <div className="single-portfolio">
                                <span>{album.description}</span>
                                <h4 className="portfolio-title text-white">{album.albumTitle}</h4>
                                <p style={{ fontSize: "0.85em", marginTop: "8px" }}>
                                  {album.images.length} photo{album.images.length === 1 ? "" : "s"}
                                </p>
                              </div>
                              <div
                                className="pf-btn"
                                style={{
                                  background: "white",
                                  borderRadius: "50%",
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                  pointerEvents: "none",
                                }}
                              >
                                <i className="fal fa-long-arrow-right" style={{ color: "#17a2b8" }}></i>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="row">
                  <div className="col-12 text-center">
                    <p>No albums have been uploaded yet. Enjoy our highlights below.</p>
                  </div>
                </div>
              )}

              <div className="row mt-5">
                <div className="col-12">
                  <div className="rts-title-area text-center mb-4">
                    <p className="pre-title">Legacy Gallery</p>
                    <h2 className="title">Highlights Archive</h2>
                    <p className="disc">These are the classic gallery items previously showcased on our site.</p>
                  </div>
                </div>
              </div>

              <div className="row">
                {legacyItems.map((item) => (
                  <div key={item.key} className="col-lg-4 col-md-6 col-sm-12">
                    <div className="item">
                      <div className="portfolio-wrapper">
                        <div
                          className="img-fluid"
                          style={{ width: "100%", height: "250px", overflow: "hidden" }}
                        >
                          <Image
                            src={item.url}
                            alt={item.title}
                            width={400}
                            height={300}
                            className="w-100"
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="single-portfolio">
                          <span>{item.subtitle}</span>
                          <h4 className="portfolio-title text-white">{item.title}</h4>
                        </div>
                        <Link className="pf-btn" href={item.href}>
                          <i className="fal fa-long-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
