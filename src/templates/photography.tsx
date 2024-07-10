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
    return () => {
      document.body.classList.remove("dark");
    }
  }, []);

  const photos = data.allFile.edges.map(({ base, node }) => {
    const order = parseFloat(node.base.replace(".jpg", ""));
    const width = parseInt(node.childImageSharp.fluid.sizes.split(" ").reverse()[0].replace("px", ""));
    const height = width / node.childImageSharp.fluid.aspectRatio;
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
      order
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
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto, layout }) => {
              return (
                <div style={{ position: "relative", ...wrapperStyle }}>
                  <PhotoView className="photograph" index={layout.index} src={photo.src}>
                   {renderDefaultPhoto({ wrapped: true })}
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
    allFile(filter: {sourceInstanceName: {eq: "photography"}}) {
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

