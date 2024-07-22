import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="odibee-sans"
      rel="preload"
      href="/fonts/odibee-sans.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="public-sans"
      rel="preload"
      href="/fonts/public-sans.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="italianno"
      rel="preload"
      href="/fonts/italianno.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="caveat"
      rel="preload"
      href="/fonts/caveat.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  ]);
};