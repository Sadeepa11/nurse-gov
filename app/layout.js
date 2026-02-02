// app/layout.js
import "./globals.css";
import "./styles/swiper.min.css";
import "./styles/fontawesome-5.css";
import "./styles/animate.min.css";
import "./styles/unicons.css";
import "./styles/bootstrap.min.css";
import "./theme.css";

import SiteChrome from "@/components/SiteChrome";
import Script from "next/script";

export const Metadata = {
  title: "ALL CEYLON NURSES’ UNION | SRI LANKA",
  description: "Life for the nurses for the wellbeing of people.",
};

// IMPORTANT: If deploying to a subdirectory, set this to '/subfolder_name' (must match next.config.mjs)
const ASSET_PREFIX = '';

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon - served from /public/assets/images */}
        <link rel="shortcut icon" href={`${ASSET_PREFIX}/assets/images/fav.png`} />
        <title>ACNU | All Ceylon Nurses' Union</title>
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>

        {/* Scripts using next/script for optimal loading */}
        <Script src={`${ASSET_PREFIX}/assets/js/vendor/jquery.min.js`} strategy="beforeInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/vendor/jqueryui.js`} strategy="beforeInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/vendor/waypoint.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/plugins/swiper.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/plugins/counterup.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/plugins/sal.min.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/vendor/bootstrap.min.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/vendor/waw.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/plugins/contact.form.js`} strategy="afterInteractive" />
        <Script src={`${ASSET_PREFIX}/assets/js/main.js`} strategy="afterInteractive" />

      </body>
    </html>
  );
}

