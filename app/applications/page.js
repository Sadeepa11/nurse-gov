"use client";

import { useEffect, useMemo, useState } from "react";

const LEGACY_APPLICATIONS = [
  {
    id: 'legacy-membership-form',
    title: 'Membership Form',
    description: 'General membership application',
    fileUrl: '/applications/MembershipForm.pdf',
    status: 'active',
    createdAt: '2020-01-01T00:00:00.000Z',
    updatedAt: '2020-01-01T00:00:00.000Z',
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/applications', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load applications');
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const visibleApplications = useMemo(() => {
    const ordered = [...applications]
      .filter((item) => (item.status || 'active') === 'active')
      .sort((a, b) => {
        const bDate = b.updatedAt || b.createdAt || 0;
        const aDate = a.updatedAt || a.createdAt || 0;
        return new Date(bDate) - new Date(aDate);
      });

    const legacyToInclude = LEGACY_APPLICATIONS.filter(
      (legacy) => !ordered.some((app) => app.title?.toLowerCase() === legacy.title.toLowerCase())
    );

    if (!ordered.length) {
      return legacyToInclude;
    }

    return [...ordered, ...legacyToInclude];
  }, [applications]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">Applications</h1>
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
              {loading ? (
                <p>Loading...</p>
              ) : (
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
                    {visibleApplications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.title}</td>
                        <td>{app.description || '—'}</td>
                        <td>
                          <a
                            href={app.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-dark btn-lg text-decoration-none"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a
                            href={app.fileUrl}
                            download
                            className="btn btn-danger btn-lg text-decoration-none"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                    {!visibleApplications.length && (
                      <tr>
                        <td colSpan={4} className="text-center py-4">
                          No applications available at the moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
