"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="rts-footer-area footer-one rts-section-gapTop bg-footer-one">
      <div className="container bg-shape-f1">
        {/* Newsletter */}
        <div className="row">
          <div className="col-12">
            <div className="rts-cta-wrapper">
              <div className="background-cta">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="cta-left-wrapepr">
                      <p className="cta-disc">Latest Business Ideas</p>
                      <h3 className="title">Sign Up Newsletter</h3>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <form
                      className="cta-input-arae"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        required
                      />
                      <button type="submit" className="rts-btn btn-primary">
                        Subscribe Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer columns */}
        <div className="row pt--120 pt_sm--80 pb--80 pb_sm--40">
          {/* Quick Links */}
          <div className="col-xl-4 col-md-6">
            <div className="footer-one-single-wized">
              <div className="wized-title">
                <h5 className="title">Quick Links</h5>
                <Image
                  src="/assets/images/footer/under-title.png"
                  width={150}
                  height={8}
                  alt="footer"
                />
              </div>
              <div className="quick-link-inner">
                <ul className="links">
                  <li>
                    <Link href="/about">
                      <i className="far fa-arrow-right"></i> About
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <i className="far fa-arrow-right"></i> Gallery
                    </Link>
                  </li>
                  <li>
                    <Link href="/team">
                      <i className="far fa-arrow-right"></i> Members
                    </Link>
                  </li>
                  <li>
                    <Link href="/applications">
                      <i className="far fa-arrow-right"></i> Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy">
                      <i className="far fa-arrow-right"></i> Privacy & Policy
                    </Link>
                  </li>
                </ul>
                <ul className="links margin-left-70">
                  <li>
                    <Link href="/login">
                      <i className="far fa-arrow-right"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <i className="far fa-arrow-right"></i> Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/news">
                      <i className="far fa-arrow-right"></i> News & Updates
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-xl-4 col-md-6">
            <div className="footer-one-single-wized mid-bg">
              <div className="wized-title">
                <h5 className="title">Contact Us</h5>
                <Image
                  src="/assets/images/footer/under-title.png"
                  width={150}
                  height={8}
                  alt="footer"
                />
              </div>
              <div className="opening-time-inner">
                <div className="info">
                  <span>Call Us 24/7 :- </span>
               
                  <a href="tel:+25621452156">011-307 7222</a>
                </div>
                <div className="single">
                  <div className="info">
                    <span>Work with us:- </span>
                    <a href="mailto:info@acnu.lk ">info@acnu.lk</a>
                  </div>
                </div>
                <div className="single">
                  <div className="info">
                    <span>Our Location:- </span>
                    <br />
                    <a href="#">
                      All Ceylon Nurses Union Service Station,
                          <br />
                      949/4, Maradana Rd,
                          <br />
                      Colombo 08
                   
                      
                    </a>
                  </div>
                </div>
                <Link href="/contactus" className="rts-btn btn-primary contact-us">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="col-xl-4 col-md-6">
            <div className="footer-one-single-wized margin-left-65">
              <div className="wized-title">
                <h5 className="title">Popular Updates</h5>
                <Image
                  src="/assets/images/footer/under-title.png"
                  width={150}
                  height={8}
                  alt="footer"
                />
              </div>
              <div className="post-wrapper">
                <div className="single-footer-post mb--30">
                  <div className="left-thumbnail">
                    <Image
                      src="/assets/images/footer/post/1.png"
                      width={72}
                      height={60}
                      alt="post-1"
                    />
                  </div>
                  <div className="post-right">
                    <p>
                      <i className="fal fa-clock"></i>25. 05. 2023
                    </p>
                    <Link href="/blog-details">
                      <h6 className="title">
                        Protest against tax bill, electricity bill, loan interest
                      </h6>
                    </Link>
                    <Link className="red-more" href="/blog-details">
                      Read More<i className="far fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="single-footer-post">
                  <div className="left-thumbnail">
                    <Image
                      src="/assets/images/footer/post/2.png"
                      width={72}
                      height={60}
                      alt="post-2"
                    />
                  </div>
                  <div className="post-right">
                    <p>
                      <i className="fal fa-clock"></i> 25. 05. 2023
                    </p>
                    <Link href="/blog-details">
                      <h6 className="title">
                        How should nursing management work? Conference, Kurunegala
                      </h6>
                    </Link>
                    <Link className="red-more" href="/blog-details">
                      Read More<i className="far fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="rts-copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <p>
                    © {new Date().getFullYear()} All Rights Reserved. Powered by Phoenix Business Soutions

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
