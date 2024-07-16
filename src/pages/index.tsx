import React, { FC, useContext } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Clock from "../../content/assets/clock-icon.svg";
import Eye from "../../content/assets/eye-icon.svg";
import { VisitsContext } from "../components/root";

interface Props {
  data: any;
  location: any;
}

const BlogIndex: FC<Props> = ({ data, location }) => {
  const { title: siteTitle } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;
  const visits = useContext(VisitsContext);

  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const count = visits?.find(v => v.path === node.fields.slug.replace(/\/$/, ""))?.count ?? 0;
        return (
          <article key={node.fields.slug} className="list">
            <header>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <div className="meta">
                {visits?.length ? (
                  <>
                    <Eye />
                    <small style={{ marginRight: "0.5rem" }}>{count}</small>
                  </>
                ) : null}
                <Clock />
                <small>{node.frontmatter.date}</small>
              </div>
            </header>
            <section>
              <p>{node.frontmatter.description || node.excerpt}</p>
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "blog" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            emoji
          }
        }
      }
    }
  }
`;
