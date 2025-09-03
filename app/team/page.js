"use client";

import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  { name: "Ravindra Kahandawaarachchi", role: "President", image :  "/team/Ravindra.jpg" },
  { name: "S.B.Madhiwatha", role: "Chief Secretary", image :  "/team/SBMadiwaththa.jpg" },
  { name: "M.Vijekumar", role: "Deputy Secretary", image :  "/team/MVijayekumar.jpg" },
  { name: "Name", role: "Organizitaion Secretary", image :  "/team/OrganizingSecretary.jpg" },
  { name: "P.M.L.Weerasooriya", role: "Organizitaion Secretary", image :  "/team/PMLWeerasooriya.jpg" },
  { name: "Prabath K Palipana", role: "Education Secretary", image :  "/team/PrabathPalipana.jpeg" },
  { name: "Sanjeewa Munasinghe", role: "Media Secretary", image :  "/team/SanjeewaMunasinghe.jpg" },
  { name: "Sanjeewa Atambagaskada", role: "Editor", image :  "/team/SanjeewaAtambagaskada.jpg" },
  { name: "Neeta Pubudini.", role: "Treasurer", image :  "/team/NeetaPubudini.JPG" },
  { name: "D.M.G.S.D Daulagala ", role: "Co-Treasurer", image :  "/team/Co-Treasurer.jpg" }
];

export default function TeamPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Team</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <Link href="/">Home</Link>
                <span> / </span>
                <Link href="#" className="active">Team</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="rts-team-area style-3 rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rts-title-area team text-center">
                <p className="pre-title">Professionals Team</p>
                <h2 className="title">Our Union Leaders</h2>
              </div>
            </div>
          </div>

          <div className="row g-5 mt--20 mt_md--30 mt_sm--0 team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="team-inner-two inner team-card">
                  <div className="thumbnail">
                    <a href="team-details.html">
                      <Image
                        src={member.image}
                        alt={`${member.name} — ${member.role}`}
                        fill
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 300px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority={idx < 4}
                      />
                    </a>
                    <div className="social">
                      <a href="#"><i className="fab fa-facebook-f"></i></a>
                      <a href="#"><i className="fab fa-twitter"></i></a>
                      <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                  </div>
                  <div className="inner-content">
                    <div className="header">
                      <h5 className="title">{member.name}</h5>
                      <span>{member.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}