// app/layout.tsx
// import { Metadata } from "next";
// We keep global CSS minimal and link vendor CSS via <link> (served from /public/assets)
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Metadata = {
  title: "ALL CEYLON NURSES’ UNION | SRI LANKA",
  description: "Life for the nurses for the wellbeing of people.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon + Vendor CSS (served from /public) */}
        <link rel="shortcut icon" href="/assets/images/fav.png" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-5.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/unicons.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <title>ACNU | All Ceylon Nurses' Union</title>
      </head>
      <body>

        <Header />
        {children}
        <Footer />


        {/*  scripts start form hear */}
    <script src="assets/js/vendor/jquery.min.js"></script>
    <script src="assets/js/vendor/jqueryui.js"></script>
    <script src="assets/js/vendor/waypoint.js"></script>
    <script src="assets/js/plugins/swiper.js"></script>
    <script src="assets/js/plugins/counterup.js"></script>
    <script src="assets/js/plugins/sal.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>

    <script src="assets/js/vendor/waw.js"></script>
    <script src="assets/js/plugins/contact.form.js"></script>
    {/* main Js */}
    <script src="assets/js/main.js"></script>
    {/*  scripts end form hear */}

      </body>
    </html>
  );
}
