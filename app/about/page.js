import Image from "next/image";
import Link from "next/link";

export default function AboutContent() {
  return (
    <>
      {/* Breadcrumb Area */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">About Us</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <Link href="/">Home</Link>
                <span> / </span>
                <a className="active">About Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Area */}
      <div className="rts-service-details-area rts-section-gap">
        <div className="container">
          <div className="row">
            {/* Left Content */}
            <div className="col-xl-8 col-md-12 col-sm-12 col-12">
              <div className="service-detials-step-1">
                <div className="thumbnail">
                  <Image
                    src="/assets/images/service/aboutus.png"
                    alt="business-area"
                    width={800}
                    height={500}
                  />
                </div>
                <h4 className="title">About "ALL CEYLON NURSES ‘UNION"</h4>
                <p className="disc">
                  Union recognized in the Sri Lankan trade union movement, which works to raise the professionalism of public sector nurses in the Sri Lankan nursing service, to secure their rights, and to organize the entire nursing community by equipping them with knowledge in order to build an optimal health service for the citizens.
                </p>

                <div className="row g-5 mt--30 mb--40">
                  {[
                    { title: "Union Start Date", value: "2007.01.23" },
                    { title: "Register Nurses", value: "10625" },
                    { title: "Unregister Nurses", value: "28,125" },
                    { title: "Government Nurses", value: "38750" },
                  ].map((item, index) => (
                    <div className="col-lg-6" key={index}>
                      <div className="service-details-card">
                        <div className="thumbnail">
                          <Image
                            src="/assets/images/service/icon/11.svg"
                            alt={item.title}
                            width={50}
                            height={50}
                            className="icon"
                          />
                        </div>
                        <div className="details">
                          <h6 className="title">{item.title}</h6>
                          <p className="disc">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-detials-step-3 mt--70 mt_md--50">
                <div className="row g-5 align-items-center">
                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="thumbnail sm-thumb-service">
                      <Image
                        src="/assets/images/service/vision.png"
                        alt="Service"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 mb_md--20 mb_sm--20">
                    <h4 className="title">Mission</h4>
                    <p className="disc">
                      Establishing a safer and free health service for the public, striving to achieve the qualitative and quantitative development of the Sri Lankan nursing community by organizing the nurses armed with knowledge and providing courage to secure their rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-xl-4 col-md-12 col-sm-12 col-12 mt_lg--60 pl--50 pl_md--0 pl-lg-controler pl_sm--0">
              {/* Download Widget */}
              <div className="rts-single-wized download service">
                <div className="wized-header">
                  <h5 className="title">Download</h5>
                </div>
                <div className="wized-body">
                  <div className="single-download-area">
                    <Image
                      src="/assets/images/service/icon/07.svg"
                      alt="Membership Form"
                      width={50}
                      height={50}
                    />
                    <div className="mid">
                      <h6 className="title">Membership Form</h6>
                      <span>Download</span>
                    </div>
                    <a className="rts-btn btn-primary" href="/assets/Membership Form-1.pdf">
                      <i className="fal fa-arrow-right"></i>
                    </a>
                  </div>

                  <div className="single-download-area">
                    <Image
                      src="/assets/images/service/icon/08.svg"
                      alt="Union Profile"
                      width={50}
                      height={50}
                    />
                    <div className="mid">
                      <h6 className="title">Union Profile</h6>
                      <span>Download</span>
                    </div>
                    <a className="rts-btn btn-primary" href="#">
                      <i className="fal fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Widget */}
              <div className="rts-single-wized contact service">
                <div className="wized-header">
                  <Link href="#">
                    <Image
                      src="/assets/images/logo/logo-1.png"
                      alt="Business_logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>
                <div className="wized-body">
                  <h5 className="title">
                    Need Help? We Are Here To Help You
                  </h5>
                  <Link className="rts-btn btn-primary" href="/contactus">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
