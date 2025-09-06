"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="progress-wrap"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        cursor: "pointer",
        width: "45px",
        height: "45px",
        zIndex: 1000,
      }}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          stroke="#ff0000"
          strokeWidth="2"
          fill="none"
          strokeDasharray="307"
          strokeDashoffset={307 - (progress / 100) * 307}
        />
      </svg>
    </div>
  );
}
