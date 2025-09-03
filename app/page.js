"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Simple animation helpers
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <>
      {/* BANNER / HERO with Swiper */}
      <section className="rts-banner-area rts-banner-one">
        <Swiper
          className="mySwiper banner-one"
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
        >
          {["one", "two", "three"].map((cls, idx) => (
            <SwiperSlide key={idx} className={cls}>
              <div className="banner-one-inner text-start">
                <motion.h1
                  className="title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ALL CEYLON NURSES ‘UNION
                </motion.h1>

                <motion.a
                  href="#"
                  className="rts-btn btn-primary color-h-black"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  Get Consultant
                </motion.a>

                <Image
                  className="shape-img one"
                  src="/assets/images/banner/shape/01.png"
                  alt="banner_business"
                  width={220}
                  height={120}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* floating shapes */}
        <div className="animation-img">
          <Image
            className="shape-img two"
            src="/assets/images/banner/shape/02.png"
            alt="banner_business"
            width={220}
            height={120}
          />
          <Image
            className="shape-img three"
            src="/assets/images/banner/shape/03.png"
            alt="banner_business"
            width={220}
            height={120}
          />
        </div>
      </section>

      {/* WORKING PROCESS / STATS */}
      <section className="rts-working-process rts-section-gapBottom">
        <div className="container">
          <div className="row mt--20">
            {[
              { icon: "22.svg", title: "Union Start Date", val: "2007.01.23" },
              { icon: "23.svg", title: "Register Nurses", val: "10625" },
              { icon: "24.svg", title: "Unregister Nurses", val: "28,125" },
              { icon: "22.svg", title: "Government Nurses", val: "38750" },
            ].map((c, i) => (
              <div className="col-xl-3 col-md-4" key={i}>
                <motion.div
                  className="rts-single-service-style-process text-center"
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="icon">
                    <Image
                      src={`/assets/images/service/icon/${c.icon}`}
                      width={150}
                      height={150}
                      alt=""
                    />
                  </div>
                  <h5 className="title">{c.title}</h5>
                  <p className="disc">{c.val}</p>
                  <a href="#" className="rts-btn btn-primary-5 rounded-2">
                    <i className="fal fa-arrow-right"></i>
                  </a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="rts-about-area rts-section-gap bg-about-sm-shape">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Left text */}
            <div className="col-lg-6 col-md-12 order-lg-1 order-2 mt_md--50 mt_sm--50">
              <div className="rts-title-area">
                <p className="pre-title">More About Us</p>
                <h2 className="title">Life for the nurses for the wellbeing of people.</h2>
              </div>

              <motion.div
                className="about-inner"
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="disc">
                  Union recognized in the Sri Lankan trade union movement, which works to raise the
                  professionalism of public sector nurses in the Sri Lankan nursing service, to
                  secure their rights, and to organize the entire nursing community by equipping
                  them with knowledge in order to build an optimal health service for the citizens.
                </p>

                {/* Founder + call */}
                <div className="row about-founder-wrapper align-items-center mt--40">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="author-inner">
                      <a className="thumbnail" href="#">
                        <Image
                          src="/team/Ravindra.jpg"
                          width={72}
                          height={72}
                          alt="finbiz_founder"
                        />
                      </a>
                      <div className="founder-details">
                        <a href="/team-details">
                          <h6 className="title">S.Ravinda Kahadawaaarachi</h6>
                        </a>
                        <span>President</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 mt_sm--20">
                    <div className="author-call-option">
                      <Image
                        className="authore-call"
                        src="/assets/images/about/call.svg"
                        width={32}
                        height={32}
                        alt="call_founder"
                      />
                      <div className="call-details">
                        <span>Call us anytime</span>
                        <a href="tel:+94113077222">
                          <h6 className="title">: 011-3077222</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right image */}
            <div className="col-lg-6 col-md-12 order-lg-2 order-1">
              <motion.div
                className="about-one-thumbnail"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/assets/images/about/main/about1.png"
                  width={620}
                  height={420}
                  alt="about-finbiz"
                />
                <div className="experience">
                  <div className="left single">
                    <h2 className="title">17+</h2>
                    <p className="time">Years</p>
                  </div>
                  <div className="right single">
                    <p className="disc">
                      Established
                      <br /> as a
                      <br /> Union
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rts-callto-acation-area rts-callto-acation-area4 bg-call-to-action-two">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <motion.div
                className="cta-two-wrapper"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="title-area">
                  <h3 className="title">
                    ALL CEYLON NURSES’ UNION
                    <br />
                   All Ceylon Nurses Union Represents Sri Lankan Nurses, Focusing on Their Rights, Welfare, Fair Wages, And Better Working Conditions.
                  </h3>
                </div>
               
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG CARDS */}
      <section className="rts-blog-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-area-style-six text-center">
                <h2 className="title">Latest News and Events</h2>
              </div>
            </div>
          </div>

          <div className="row mt--10 g-5">
            {[
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
            ].map((b, i) => (
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
                        alt="blog-area"
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
                    <a className="rts-read-more btn-primary" href="/blog-details">
                      <i className="far fa-arrow-right"></i>Read More
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM CAROUSEL
      <section className="rts-team-area rts-section-gap bg-team">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rts-title-area team text-center">
                <p className="pre-title">Professionals Team</p>
                <h2 className="title">Our Union Leaders</h2>
              </div>
            </div>
          </div>

          <div className="row g-5 mt--0">
            <Swiper
              className="mySwiperh1_team"
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2800, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {[
                { name: "S.Ravinda", role: "President" },
                { name: "S.B Madhiwatha", role: "Secretary" },
                { name: "Saman Vijethilaka", role: "Deputy Secretary" },
                { name: "Amila Rathnayaka", role: "Corresponding Secretary" },
              ].map((m, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    className="team-single-one-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="team-image-area">
                      <a href="/team-details">
                        <Image
                          src="/assets/images/team/tm/team1.png"
                          width={320}
                          height={360}
                          alt="Business_Team_single"
                        />
                        <div className="team-social">
                          <div className="main">
                            <i className="fal fa-plus"></i>
                          </div>
                          <div className="team-social-one">
                            <i className="fab fa-youtube"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="single-details">
                      <a href="/team-details">
                        <h5 className="title">{m.name}</h5>
                      </a>
                      <p>{m.role}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section> */}

  

      {/* Back-to-top circle (static; add JS if needed) */}
      <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </>
  );
}
