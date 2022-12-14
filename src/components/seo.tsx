import React, { FC } from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  description?: string;
  lang?: string;
  meta?: Array<Record<string, any>>;
  title: string;
  ogType?: string;
  twitterCard?: string;
  ogImage?: string;
  twitterImage?: string;
}

const SEO: FC<Props> = ({
  description,
  lang,
  meta,
  title,
  ogType,
  twitterCard,
  ogImage,
  twitterImage,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const { siteUrl } = site.siteMetadata;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: ogType ?? `website`,
        },
        {
          name: `twitter:card`,
          content: twitterCard ?? `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: siteUrl + (ogImage ?? "/share.png"),
        },
        {
          name: `twitter:image`,
          content: siteUrl + (twitterImage ?? "/share.png"),
        },
        ...meta,
      ]}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default SEO;
