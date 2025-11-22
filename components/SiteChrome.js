'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

const ADMIN_PREFIX = '/admin';

const SiteChrome = ({ children }) => {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith(ADMIN_PREFIX);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollProgress />
    </>
  );
};

export default SiteChrome;
