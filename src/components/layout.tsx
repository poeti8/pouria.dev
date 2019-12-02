import React, { FC, useEffect, useState, useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import shuffle from "shuffle-array";
import Rellax from "rellax";
import konami from "konami";
import "modern-normalize/modern-normalize.css";

import "./layout.css";
import { AnimationContext } from "./root";

function eraserEvent(event) {
  event.preventDefault();
  if (((event.target as any).nodeName || "").toLowerCase() === "html") {
    const erased = document.querySelectorAll(".erased");
    document.body.classList.add("all-erased");
    erased.forEach(node => node.classList.remove("erased"));
    window.removeEventListener("click", eraserEvent);
    document.documentElement.classList.remove("eraser");
  } else {
    (event.target as any).classList.add("erased");
  }
}

const Layout: FC<{ location: any }> = ({ children, location }) => {
  const [rellaxInit, setRellaxInit] = useState(false);
  const [konamiInit, setKonamiInit] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const animation = useContext(AnimationContext);
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            quotes
            japaneseWords
            social {
              twitter
              github
              email
              rss
            }
          }
        }
      }
    `
  );

  const {
    title,
    description,
    social,
    quotes,
    japaneseWords,
  } = data.site.siteMetadata;

  useEffect(() => {
    if (rellaxInit) return;
    new Rellax(".rellax");
    setRellaxInit(true);
  });

  useEffect(() => {
    setKonamiInit(true);
    if (konamiInit || konamiActive) return;
    konami(() => {
      setKonamiActive(true);
      const links = document.querySelectorAll("a:not(#you-did-it-link)");
      links.forEach(link => {
        link.addEventListener("click", e => e.preventDefault());
      });
      window.addEventListener("click", eraserEvent);
      document.documentElement.classList.add("eraser");
    });
  });

  return (
    <>
      <div className="you-did-it">
        <img src="you-did-it.jpg" alt="you did it" />
        <a
          id="you-did-it-link"
          href="http://kutt.it/bonus-btc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here for free BTC as reward ;)
        </a>
      </div>
      <div id="grid"></div>
      <div id="container" className={animation ? "animation" : ""}>
        <header
          className="main rellax"
          data-rellax-speed="-4"
          data-rellax-zindex="0"
        >
          <Link to="/">
            <h1 className="name">
              {title} <span className="jp">{shuffle(japaneseWords)[0]}</span>.
            </h1>
          </Link>
          <p className="short-bio">{description}</p>
          <nav>
            <ul>
              {[
                ["/", "blog"],
                ["/about/", "about"],
                ["/uses/", "uses"],
              ].map(([path, name]) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={location.pathname === path ? "active" : ""}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer id="main-footer">
          <div className="footer-nav-container">
            <p className="eye-emoji">👀</p>
            <p>stalk me via:</p>
            <nav>
              <ul>
                <li>
                  <a
                    href={`http://twitter.com/${social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    twitter
                  </a>
                </li>
                <li>
                  <a
                    href={`http://github.com/${social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                  </a>
                </li>
                <li>
                  <a href={`mailto:${social.email}`}>email</a>
                </li>
                <li>
                  <a href="/rss.xml" target="_blank">
                    rss
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <marquee className="quotes" direction="left">
            {shuffle(quotes).map((text, index) => (
              <span key={`quote-${index}`}>{text}</span>
            ))}
          </marquee>
          <p className="copyright">
            © {new Date().getFullYear()}, built with sad lo-fi hip-hop noises.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
