"use client"; // if using Next 13 app directory

import Image from "next/image";

export default function TeamPage() {
  return (
    <div>
      {/* Breadcrumb area */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Contact Us</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <a href="/">Home</a>
                <span> / </span>
                <a href="#" className="active">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact info cards */}
      <div className="rts-contact-area rts-section-gap">
        <div className="container">
          <div className="row g-5">
            {[{
              img: "/assets/images/contact/1.png",
              icon: "/assets/images/contact/shape/01.svg",
              title: "Call Us 24/7",
              info: "011-3077222",
              link: "tel:+0113077222"
            }, {
              img: "/assets/images/contact/2.png",
              icon: "/assets/images/contact/shape/02.svg",
              title: "Make A Quote",
              info: "info@acnu.lk",
              link: "mailto:info@acnu.lk"
            }, {
              img: "/assets/images/contact/3.png",
              icon: "/assets/images/contact/shape/03.svg",
              title: "Service Station",
              info: "949/4, Maradana Rd, Colombo 08",
              link: "#"
            }].map((card, idx) => (
              <div key={idx} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="single-contact-one-inner">
                  <div className="thumbnail">
                    <Image src={card.img} alt={card.title} width={500} height={300} />
                  </div>
                  <div className="content">
                    <div className="icone">
                      <Image src={card.icon} alt="icon" width={50} height={50} />
                    </div>
                    <div className="info">
                      <span>{card.title}</span>
                      <a href={card.link}>
                        <h5>{card.info}</h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="rts-contact-map-area">
        <div className="contaciner-fluid">
          <div className="row">
            <div className="col-12">
              <div className="contact-map-area-fluid">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.647821022213!2d79.860246!3d6.932629!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2590ad893eb7d%3A0x7f5d9c63459f8221!2s949%20Maradana%20Rd%2C%20Colombo%2001000!5e0!3m2!1sen!2slk!4v1699241849054!5m2!1sen!2slk"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="rts-contact-form-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rts-contact-fluid rts-section-gap">
                <div className="rts-title-area contact-fluid text-center mb--50">
                  <p className="pre-title">Get In Touch</p>
                  <h2 className="title">Needs Help? Let’s Get in Touch</h2>
                </div>
                <div className="form-wrapper">
                  <div id="form-messages"></div>
                  <form
                    id="contact-form"
                    action="https://reactheme.com/products/html/finbiz/mailer.php"
                    method="post"
                  >
                    <div className="name-email">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                      />
                      <input
                        type="text"
                        name="hospital"
                        placeholder="Hospital"
                        required
                      />
                    </div>

                    <div className="name-email">
                      <input
                        type="text"
                        name="id_number"
                        placeholder="ID Number"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject"
                    />

                    <textarea
                      placeholder="Type Your Message"
                      name="message"
                    ></textarea>

                    <button
                      type="submit"
                      className="rts-btn btn-primary"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
