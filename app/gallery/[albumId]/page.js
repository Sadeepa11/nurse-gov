import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { readData } from '@/lib/file-db';

// export const dynamic = 'force-dynamic'; // Disabled for Static Export

const DATA_FILE = 'galleries.json';

async function getAlbum(albumId) {
  const albums = await readData(DATA_FILE);
  if (!Array.isArray(albums)) return null;
  return albums.find((album) => album.id === albumId) || null;
}

function sortImages(images = []) {
  return [...images].sort((a, b) => {
    const aDate = a.createdAt || 0;
    const bDate = b.createdAt || 0;
    return new Date(bDate) - new Date(aDate);
  });
}

export async function generateMetadata({ params }) {
  const albumId = decodeURIComponent(params.albumId);
  const album = await getAlbum(albumId);
  if (!album) {
    return {
      title: 'Album Not Found | Gallery',
    };
  }

  return {
    title: `${album.albumTitle || 'Gallery'} | ACNU Gallery`,
    description: album.description || 'Gallery album',
  };
}

export default async function AlbumDetailPage({ params }) {
  const albumId = decodeURIComponent(params.albumId);
  const album = await getAlbum(albumId);

  if (!album) {
    notFound();
  }

  const images = sortImages(Array.isArray(album.images) ? album.images : []);

  return (
    <>
      <div className="rts-breadcrumb-area breadcrumb-bg bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 breadcrumb-1">
              <h1 className="title">{album.albumTitle || 'Album'}</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="bread-tag">
                <Link href="/">Home</Link>
                <span> / </span>
                <Link href="/gallery">Gallery</Link>
                <span> / </span>
                <span className="active">{album.albumTitle || 'Album'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="portfolio-area style-4 pt--120 pb--120 pt_xs--60">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <div className="rts-title-area text-center mb-4">
                <p className="pre-title">{album.description || 'Album Gallery'}</p>
                <h2 className="title">{album.albumTitle || 'Album'}</h2>
                <p className="disc">
                  {images.length} photo{images.length === 1 ? '' : 's'} in this album.
                </p>
              </div>
            </div>
          </div>

          {images.length ? (
            <div className="row">
              {images.map((image) => (
                <div key={image.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="item">
                    <div className="portfolio-wrapper">
                      <div
                        className="img-fluid"
                        style={{ width: '100%', height: '250px', overflow: 'hidden' }}
                      >
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={image.url}
                            alt={image.altText || album.albumTitle || 'Gallery Photo'}
                            width={400}
                            height={300}
                            className="w-100"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        </a>
                      </div>
                      <div className="single-portfolio">
                        <span>{album.description || 'Gallery'}</span>
                        <h4 className="portfolio-title text-white">{album.albumTitle || 'Album'}</h4>
                      </div>
                      <a className="pf-btn" href={image.url} target="_blank" rel="noopener noreferrer">
                        <i className="fal fa-external-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              <div className="col-12 text-center">
                <p>This album does not contain any photos yet.</p>
              </div>
            </div>
          )}

          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link href="/gallery" className="rts-btn btn-primary">
                Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
