import React from "react";
import Script from "next/script";
import "tachyons/css/tachyons.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
