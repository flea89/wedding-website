import React from "react";
import Script from "next/script";
import "../styles/globals.scss";
import "tachyons/css/tachyons.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
