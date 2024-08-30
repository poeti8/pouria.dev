import React, { FC, useEffect } from "react";
import { Link, graphql } from "gatsby";
import PhotoAlbum from "react-photo-album";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Img from "gatsby-image"

import 'react-photo-view/dist/react-photo-view.css';

import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  data: any;
  location: any;
}

const PageTemplate: FC<Props> = ({ data, location }) => {
  useEffect(() => {
    document.body.classList.add("dark");
    document.querySelector('meta[name="theme-color"]').setAttribute("content",  "#1c1a1d");
    return () => {
      document.body.classList.remove("dark");
      document.querySelector('meta[name="theme-color"]').setAttribute("content",  "#e5cbff");
    }
  }, []);

  const photos = data.allFile.edges.map(({ base, node }) => {
    const fluid = node.childImageSharp.fluid;
    const order = parseFloat(node.base.replace(".jpg", ""));
    const width = parseInt(fluid.sizes.split(" ").reverse()[0].replace("px", ""));
    const height = width / fluid.aspectRatio;
    const src = node.childImageSharp.fluid.src;
    const srcSet = node.childImageSharp.fluid.srcSet.split("\n").map(set => {
      const width = parseInt(set.split(" ").reverse()[0].replace("w", ""));
      return {
        width,
        height: width / node.childImageSharp.fluid.aspectRatio,
        src: set.split(" ")[0]
      }
    });
    return {
      width,
      height,
      src,
      srcSet,
      order,
      fluid,
    }
  }).sort((a, b) => a.order > b.order ? 1 : -1);

  return (
    <Layout location={location}>
      <SEO
        title="Photography"
        description="Handpicked collection of photos I've taken."
      />
      <article>
        <header>
          <h1>Photography</h1>
        </header>
        <p>A handpicked collection of photos I've taken with my Fujifilm camera.</p>
        <br />
        <PhotoProvider>
          <PhotoAlbum 
            layout="masonry" 
            columns={(containerWidth) => {
              if (containerWidth < 400) return 2;
              return 3;
            }}
            photos={photos}
            renderPhoto={({ photo, wrapperStyle, imageProps, layout }) => {
              return (
                <div style={{ position: "relative", ...wrapperStyle }}>
                  {/* <span style={{ position: "absolute", width: 20, fontSize: 14, textAlign: "center", padding: "1px 0", zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>{photo.order}</span> */}
                  <PhotoView index={layout.index} src={photo.src}>
                    <div className="photograph">
                      <Img fluid={photo.fluid} />
                    </div>
                  </PhotoView>
                </div>
              )
            }}
          />
        </PhotoProvider>
        <br />
        <p>You can download them in their full quality from <a href="https://unsplash.com/@poeti8" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: { eq: "photography" }}) {
      edges {
        node {
          base
          childImageSharp {
            fluid(jpegQuality: 100, quality: 100) {
              aspectRatio
              sizes
              base64
              src
              srcSet
            }
          }
        }
      }
    }
  }
`

export default PageTemplate;

