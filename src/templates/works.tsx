import React, { FC, useContext, useEffect, useMemo, useRef } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image"


import Layout from "../components/layout";
import SEO from "../components/seo";
import { WorksAnimationContext } from "../components/root";

interface Props {
  data: any;
  location: any;
}

const PageTemplate: FC<Props> = ({ data, location }) => {
  const animatingRef = useRef(false);
  const [introAnimation, setIntroAnimation] = useContext(WorksAnimationContext);

  useEffect(() => {
    if (introAnimation) {
      document.body.classList.remove("works-intro-animation");
    } else {
      setIntroAnimation(true);
      document.body.classList.add("works-intro-animation");
    }
    document.body.classList.add("works");
    return () => {
      document.body.classList.remove("works");
    }
  }, []);

  
  const works = useMemo(() => {
    const jsonWorkData = data.allFile.edges?.find(e => e.node.extension === "json")?.node.internal.content;
    if (!jsonWorkData) return [];
    const workData = JSON.parse(jsonWorkData);
    return workData
      .map(work => {
        const photos = data.allFile.edges
          ?.filter(item => item.node.base.includes(work.slug))
          .map(item => ({ fluid: item.node.childImageSharp.fluid, base: item.node.base, order: parseInt(item.node.base.match(/(\d*)\./)[1]) ?? 0 }))
          .sort((a, b) => a.order > b.order ? 1 : -1)
          .map(item => item.fluid);
        return {
          ...work,
          photos
        };
      })
  }, [data.allFile.edges]);

  const handleClick = useMemo(() => index => function(e) {
    e.stopPropagation();
    if (animatingRef.current) return;
    animatingRef.current = true;
    const work = document.querySelector(`.work-${index}`);
    const workBackBack = document.querySelector(`.work-${index} .back-back`);
    const workBack = document.querySelector(`.work-${index} .back`);
    const workFront = document.querySelector(`.work-${index} .front`);
    
    workBackBack.classList.add("animating");
    workBack.classList.add("animating");
    workFront.classList.add("animating");
    
    workBackBack.classList.remove("back-back");
    workBackBack.classList.add("back");
    workBack.classList.remove("back");
    workBack.classList.add("front");
    workFront.classList.remove("front");
    workFront.classList.add("back-back");
    workFront.classList.add("move");

    // setTimeout(() => {
    //   if (work.classList.contains("hovered")) {
    //     workFront.classList.add("move-hovered");
    //     setTimeout(() => {
    //       workFront.classList.remove("move-hovered");
    //     }, 100);
    //   }
    // }, 400);

    setTimeout(() => {
      workBackBack.classList.remove("animating");
      workBack.classList.remove("animating");
      workFront.classList.remove("animating");
      workFront.classList.remove("move");
      animatingRef.current = false;
    }, 500);
  }, []);

  const handleMouseEnter = useMemo(() => index => function(e) {
    document.querySelector(`.work-${index}`)?.classList.add("hovered");
  }, []);

  const handleMouseLeave = useMemo(() => index => function(e) {
    document.querySelector(`.work-${index}`)?.classList.remove("hovered");
  }, []);

  return (
    <Layout location={location}>
      <SEO
        title="Works"
        description="Selected works 16-24."
      />
      {works.map((work, index) => (
        <div key={`work-${index}`} onMouseEnter={handleMouseEnter(index)} onMouseLeave={handleMouseLeave(index)} className={`work work-${index}`} onClick={handleClick(index)}>
          <div className="work-photo back-back">
            {
              work.photos?.length > 0
                ? <Img fluid={work.photos[2]} alt={work.title} />
                : null
            }
            <div className="text-wrapper" style={{ fontSize: work.descriptions?.[1]?.fontSize }}>
              <h2>
                {work.descriptions?.[1]?.text}
                {work.linkText ? <a href={work.link} title={work.linkText} target="_blank" rel="noreferrer noopener">
                  {work.linkText}
                </a> : null}
              </h2>
            </div>
          </div>
          <div className="work-photo back">
            {
              work.photos?.length > 0
                ? <Img fluid={work.photos[1]} alt={work.title} />
                : null
            }
            <div className="text-wrapper" style={{ fontSize: work.descriptions?.[0]?.fontSize }}>
              <h2>
                {work.descriptions?.[0]?.text}
              </h2>
            </div>
          </div>
          <div className="work-photo front">
           {
              work.photos?.length > 0
                ? <Img fluid={work.photos[0]} alt={work.title} />
                : null
            }
            <div className="text-wrapper" style={{ fontSize: work.fontSize }}>
              <h2>{work.title}</h2>
            </div>
            <span className={`category ${work.category}`}>{work.category}</span>
            <span className="date">{work.date}</span>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: { eq: "works" }}) {
      edges {
        node {
          base
          childImageSharp {
            fluid(quality: 80) {
              aspectRatio
              sizes
              base64
              src
              srcSet
            }
          }
          extension
          internal {
            content
          }
        }
      }
    }
  }
`

export default PageTemplate;

