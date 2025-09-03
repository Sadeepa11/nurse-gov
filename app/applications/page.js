"use client";

import Link from "next/link";

const applications = [
  { 
    name: "Membership Form", 
    description: "General membership application", 
    file: "/applications/MembershipForm.pdf"
  }
];

export default function ApplicationsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Applications</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <Link href="/">Home</Link>
                <span> / </span>
                <Link href="#" className="active">Applications</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rts-application-area rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="rts-title-area text-center mb-4">
                <p className="pre-title">Downloadable Forms</p>
                <h2 className="title">Our Applications</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>View</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={idx}>
                      <td>{app.name}</td>
                      <td>{app.description}</td>
                      <td>
                        <a 
                          href={app.file} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark btn-lg text-decoration-none"
                        >
                          View
                        </a>
                      </td>
                      <td>
                        <a 
                          href={app.file} 
                          download 
                          className="btn btn-danger btn-lg  text-decoration-none"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
