"use client";

import Image from "next/image";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <>
  

      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Gallery</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <Link href="/">Home</Link>
                <span> / </span>
                <Link href="#" className="active">
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="portfolio-area style-4 pt--120 pb--120 pt_xs--60 pt_xs--60">
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="item">
                  <div className="portfolio-wrapper">
                    <div className="img-fluid">
                      <Image
                        src={`/assets/images/product/${id}.png`}
                        alt="Portfolio Img"
                        width={400}
                        height={300}
                        className="w-100"
                      />
                    </div>
                    <div className="single-portfolio">
                      <span>Sri Lanka</span>
                      <h4 className="portfolio-title text-white">
                        ALL CEYLON NURSES’ UNION
                      </h4>
                    </div>
                    <Link className="pf-btn" href="/project-details">
                      <i className="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </>
  );
}
