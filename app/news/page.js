"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Animation variant
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function NewsEventsPage() {
  // Future: load from JSON or API
  const news = [
    {
      img: "nblog1.png",
      date: "25. 05. 2023",
      cat: "Protest against Electricity",
      title: "Protest against tax bill, electricity bill, loan interest",
    },
    {
      img: "nblog2.png",
      date: "25. 05. 2023",
      cat: "Conference Kurunegala",
      title:
        "How should nursing management work? Conference, Kurunegala General Hospital",
    },
    {
      img: "nblog1.png",
      date: "25. 05. 2023",
      cat: "Protest against Electricity",
      title: "Protest against tax bill, electricity bill, loan interest",
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">News & Events</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <a href="/">Home</a>
                <span> / </span>
                <a href="#" className="active">
                  News & Events
                </a>
              </div>
            </div>
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
            {news.map((b, i) => (
              <div className="col-lg-4" key={i}>
                <motion.div
                  className="rts-blog-area-style-seven"
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="thumbnail">
                    <a href="#">
                      <Image
                        src={`/assets/images/blog/${b.img}`}
                        width={410}
                        height={260}
                        alt={b.title}
                      />
                    </a>
                    <div className="badge">
                      <span>{b.date}</span>
                    </div>
                  </div>
                  <div className="content-inner">
                    <div className="top-blog">
                      <span className="main">{b.cat}</span>
                      <span> /by Admin</span>
                    </div>
                    <a className="title" href="#">
                      <h5 className="title">{b.title}</h5>
                    </a>
                    <a
                      className="rts-read-more btn-primary"
                      href="/blog-details"
                    >
                      <i className="far fa-arrow-right"></i>Read More
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
