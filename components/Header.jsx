"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  // prevent body scroll when sidebar is open
  useEffect(() => {
    const { body } = document;
    if (isSidebarOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Header Top */}
      <header className="header--sticky header-one">
        <div className="header-top header-top-one bg-1">
          <div className="container">
            <div className="row">
              {/* Left */}
              <div className="col-lg-6 d-xl-block d-none">
                <div className="left">
                  <div className="mail">
                    <a href="mailto:info@acnu.lk ">
                      <i className="fal fa-envelope"></i> info@acnu.lk
                    </a>
                  </div>
                  <div className="working-time">
                    <p>
                      <i className="fas fa-phone-alt"></i> Hotline : 011-3077222
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="col-lg-6 d-xl-block d-none">
                <div className="right">
                  <ul className="top-nav">

                      <li>
                      <Link
                        href="/applications"
                      
                      >
                       Applications
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://application.slnif.com/nurses/acnu/register"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register
                      </a>
                    </li>
                    <li>
                      <Link href="#">Login</Link>
                    </li>
                  </ul>
                  <ul className="social-wrapper-one">
                    <li>
                      <a href="https://web.facebook.com/profile.php?id=100069812386000"><i className="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a className="mr--0" href="#"><i className="fab fa-linkedin-in"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Right */}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main-one bg-white">
          <div className="container">
            <div className="row">
              {/* Logo */}
              <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6">
                <div className="thumbnail">
                  <Link href="/">
                    <Image
                      src="/assets/images/logo/logo-1.png"
                      width={200}
                      height={90}
                      alt="ACNU logo"
                    />
                  </Link>
                </div>
              </div>

              {/* Nav + Buttons */}
              <div className="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-6">
                <div className="main-header">
                  <nav className="nav-main mainmenu-nav d-none d-xl-block">
                    <ul className="mainmenu">
                      <li><Link className="nav-link" href="/">HOME</Link></li>
                      <li><Link className="nav-link" href="/about">ABOUT</Link></li>
                      <li><Link className="nav-link" href="/gallery">GALLERY</Link></li>
                      <li><Link className="nav-link" href="/team">MEMBERS</Link></li>
                      <li><Link className="nav-link" href="/contactus">CONTACT US</Link></li>
                      <li><Link className="nav-link" href="/news">NEWS AND EVENTS</Link></li>
                      {/* <li><Link className="nav-item" href="/applications">APPLICATIONS</Link></li> */}
                      
                    </ul>
                  </nav>

                  <div className="button-area">
                    {/* <Link
                      href="/login"
                      className="rts-btn btn-primary ml--20 ml_sm--5 header-one-btn quote-btn"
                    >
                      MEMBER LOGIN
                    </Link> */}

                    {/* Sidebar toggle */}
                    <button
                      id="menu-btn"
                      type="button"
                      aria-label="Open menu"
                      aria-expanded={isSidebarOpen}
                      aria-controls="side-bar"
                      onClick={() => setSidebarOpen(true)}
                      className="menu rts-btn btn-primary-alta ml--20 ml_sm--5"
                    >
                      <Image
                        className="menu-dark"
                        src="/assets/images/icon/menu.png"
                        width={20}
                        height={20}
                        alt="Menu icon"
                      />
                      <Image
                        className="menu-light"
                        src="/assets/images/icon/menu-light.png"
                        width={20}
                        height={20}
                        alt="Menu icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* /Nav + Buttons */}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar (offcanvas) */}
      <div
        id="side-bar"
        className={`side-bar${isSidebarOpen ? " active" : ""}`}
        role="dialog"
        aria-modal="true"
        style={{
          display: isSidebarOpen ? "block" : "none", // fallback so it works without theme JS
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "400px",
          maxWidth: "90vw",
          background: "#fff",
          zIndex: 1001,
          boxShadow: "0 0 0 1px rgba(0,0,0,.05), 0 24px 48px rgba(0,0,0,.2)",
          overflowY: "auto",
          transition: "transform .3s ease",
        }}
      >
        <button
          className="close-icon-menu"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
        >
          <i className="far fa-times"></i>
        </button>

        <div className="rts-sidebar-menu-desktop" style={{ padding: "24px" }}>
          <Link className="logo-1" href="/">
            <Image
              className="logo"
              src="/assets/images/logo/logo-1.png"
              width={200}
              height={90}
              alt="finbiz_logo"
            />
          </Link>

          {/* Desktop body (kept) */}
          <div className="body d-none d-xl-block" style={{ marginTop: 16 }}>
            <p className="disc">
              Life for the nurses for the wellbeing of people.
              <br />
              හෙදියට ජීවිතයක්, ජනතාවට සුව දිවියක්
            </p>

            <div className="get-in-touch">
              <div className="h6 title">Get In Touch</div>
              <div className="wrapper">
                <div className="single">
                  <i className="fas fa-phone-alt"></i>
                  <a href="#"> 011-3077222</a>
                </div>
                <div className="single">
                  <i className="fas fa-envelope"></i>
                  <a href="#">info@acnu.lk</a>
                </div>
                <div className="single">
                  <i className="fas fa-globe"></i>
                  <a href="#">www.acnu.lk</a>
                </div>
                <div className="single">
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="#">All Ceylon Nurses Union
                    Service Station,
                    949/4, Maradana Rd,
                    Colombo 08</a>
                </div>
              </div>
              <div className="social-wrapper-two menu">
                <a href="https://web.facebook.com/profile.php?id=100069812386000"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                   <a href="https://wa.me/94710500058"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>

          {/* Mobile body */}
          <div className="body-mobile d-block d-xl-none" style={{ marginTop: 16 }}>
            <nav className="nav-main mainmenu-nav">
              <ul className="mainmenu">
                <li><Link className="nav-link" href="/">HOME</Link></li>
                <li><Link className="nav-link" href="/about">ABOUT</Link></li>
                <li><Link className="nav-link" href="/gallery">GALLERY</Link></li>
                <li><Link className="nav-link" href="/team">MEMBERS</Link></li>
                <li><Link className="nav-link" href="/contactus">CONTACT US</Link></li>
                <li><Link className="nav-link" href="/news">NEWS AND EVENTS</Link></li>
                <li><Link className="nav-link" href="/applications">APPLICATIONS</Link></li>
              </ul>
            </nav>
            <div className="social-wrapper-two menu mobile-menu">
              <a href="https://web.facebook.com/profile.php?id=100069812386000"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            
              <a href="https://wa.me/94710500058"><i className="fab fa-whatsapp"></i></a>
            </div>
            <a href="#" className="rts-btn btn-primary ml--20 ml_sm--5 header-one-btn quote-btnmenu">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      {/* Click-away overlay */}
      <div
        id="anywhere-home"
        onClick={() => setSidebarOpen(false)}
        style={{
          display: isSidebarOpen ? "block" : "none",
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 1000,
        }}
      />

      {/* Optional search bar (toggle if you need it) */}
      {isSearchOpen && (
        <div
          className="search-input-area"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 72,
            background: "#fff",
            zIndex: 1100,
            boxShadow: "0 2px 12px rgba(0,0,0,.08)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              id="searchInput1"
              className="search-input"
              type="text"
              placeholder="Search by keyword or #"
              style={{ flex: 1, border: "1px solid #ddd", padding: "10px 12px", borderRadius: 6 }}
            />
            <button><i className="far fa-search"></i></button>
            <button
              id="close"
              className="search-close-icon"
              onClick={() => setSearchOpen(false)}
              style={{ marginLeft: 8 }}
              aria-label="Close search"
            >
              <i className="far fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
