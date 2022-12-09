import React, { FC } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Clock from "../../content/assets/clock-icon.svg";

interface Props {
  data: any;
  pageContext: any;
  location: any;
}

const BlogPostTemplate: FC<Props> = ({
  data,
  pageContext,
  location,
  path,
  ...rest
}) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const ogImagePath = pageContext.slug.replace(/\//g, "");
  const { title, description, date, hackernewsId } = post.frontmatter;
  const postUrl = data.site.siteMetadata.siteUrl + path;

  return (
    <Layout location={location}>
      <SEO
        title={title}
        description={description || post.excerpt}
        ogType="article"
        twitterCard="summary_large_image"
        ogImage={`/og/${ogImagePath}.png`}
        twitterImage={`/og/${ogImagePath}.png`}
      />
      <article>
        <header>
          <h1>{title}</h1>
          <p>{description || node.excerpt}</p>
          <div className="meta">
            <Clock />
            <small>{date}</small>
          </div>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <hr />

      <small className="share">
        share on the{" "}
        <a
          href={`https://twitter.com/intent/tweet/?text=${title}. ${description}&url=${postUrl}`}
          className="twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          blue bird app ↗
        </a>
        {hackernewsId ? (
          <>
            <span>·</span>discuss on the{" "}
            <a
              href={`https://news.ycombinator.com/item?id=${hackernewsId}`}
              className="hackernews"
              target="_blank"
              rel="noopener noreferrer"
            >
              orange website ↗
            </a>
          </>
        ) : null}
        .
      </small>

      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        hackernewsId
      }
    }
  }
`;
