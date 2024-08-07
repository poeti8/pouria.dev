import React, { FC, useEffect, useState, useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import shuffle from "shuffle-array";
import Rellax from "rellax";
import konami from "konami";
import "modern-normalize/modern-normalize.css";
import Img from "gatsby-image"

import "./layout.css";
import { AnimationContext, VisitsContext } from "./root";

function eraserEvent(event) {
  event.preventDefault();
  if (((event.target as any).nodeName || "").toLowerCase() === "html") {
    const erased = document.querySelectorAll(".erased");
    document.body.classList.add("all-erased");
    erased.forEach((node) => node.classList.remove("erased"));
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
  const visits = useContext(VisitsContext);
  const animation = useContext(AnimationContext);
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            description
            quotes
            japaneseWords
            social {
              github
              spotify
              telegram
              email
              rss
            }
          }
        }
        allFile(
          filter: {childImageSharp: {fluid: {originalName: {eq: "you-did-it.jpg"}}}}
        ) {
          edges {
            node {
              base
              childImageSharp {
                fluid {
                  aspectRatio
                  sizes
                  base64
                  src
                  srcSet
                  originalName
                }
              }
            }
          }
        }
      }
    `
  );

  const { siteTitle, description, social, quotes, japaneseWords } =
    data.site.siteMetadata;

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
      links.forEach((link) => {
        link.addEventListener("click", (e) => e.preventDefault());
      });
      window.addEventListener("click", eraserEvent);
      document.documentElement.classList.add("eraser");
    });
  }, [konamiInit, konamiActive]);

  return (
    <>
      <div className="you-did-it">
        {konamiActive ? <Img fluid={data.allFile.edges[0].node.childImageSharp.fluid} alt="you did it"  /> : null}
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
          <div className="name-container">
            <Link to={location.pathname}>
              <h1 className="name">
                {siteTitle}{" "}
                <span className="jp">{shuffle(japaneseWords)[0]}</span>.
              </h1>
            </Link>
          </div>
          <p className="short-bio">{description}</p>
          <nav>
            <ul>
              {[
                ["/", "blog"],
                ["/about/", "about"],
                ["/works/", "works"],
                ["/photography/", "photography"],
                ["/contact/", "contact"],
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
                    href={`https://github.com/${social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${social.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    telegram
                  </a>
                </li>
                <li>
                  <a href={`mailto:${social.email}`}>email</a>
                </li>
                <li>
                  <a href={`/${social.rss}`} target="_blank">
                    rss
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <marquee className="quotes" direction="left">
            {shuffle(quotes).map((text, index) => {
              let quote = text;
              if (quote.includes("NaN")) {
                const visitsCount = visits?.find(v => v.path === "_landing")?.count;
                if (visitsCount) {
                  quote = quote.replace("NaN", visitsCount);
                }
              }
              return (
                <span key={`quote-${index}`}>{quote}</span>
              )
            })}
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
