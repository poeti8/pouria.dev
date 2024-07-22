module.exports = {
  siteMetadata: {
    title: `POURIA 🦋`,
    siteTitle: `POURIA`,
    author: `Pouria Ezzati`,
    description: `Thoughts that keep me awake at night.`,
    siteUrl: `https://pouria.dev`,
    social: {
      github: `poeti8`,
      spotify: `poeti8`,
      telegram: `poeti8`,
      email: `hi@pouria.dev`,
      rss: `rss.xml`,
    },
    japaneseWords: [
      "蝶",
      "波",
      "愛",
      "神",
      "紫",
      "夢",
      "雨",
      "音",
      "草",
      "花",
      "魂",
      "常",
      "情",
      "信",
      "慈",
      "天",
      "心",
      "勇"
    ],
    quotes: [
      "My eyesight got worse while building this website.",
      "My favorite hobby is spending days to create Spotify playlists and never listen to them again.",
      "I got a total of 0 matches on Tinder.",
      "I could have published this website at least 2 weeks earlier if I hadn't used TypeScript.",
      "I care so much about my website being responsive, I just hope you're not visiting from mobile.",
      "This website is not tested, proceed with caution !!1!",
      "Try ↑ ↑ ↓ ↓ ← → ← → B A.",
      "I followed the Nasty-CSS styleguide. It's when you write nasty CSS. I made it up.",
      "You made the visit number NaN (counting since 16 July 2024.)",
      "I know the secret of universe. It's... it's... [object Object]."
    ],
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/page`,
        name: `page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path:`${__dirname}/content/photography`,
        name: `photography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path:`${__dirname}/content/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 639,
              quality: 69,
              showCaptions: [`title`],
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-footnotes`,
            options: {
              footnoteBackRefPreviousElementDisplay: "inline",
              footnoteBackRefDisplay: "inline",
              footnoteBackRefInnerText: "^",
              footnoteBackRefAnchorStyle: `text-decoration: none;`,
              footnoteBackRefInnerTextStartPosition: "front",
              useFootnoteMarkerText: false,
              useCustomDivider: "<hr/>"
            }
          },
          `gatsby-remark-numbered-footnotes`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fields: { collection: { eq: "blog" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        description
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "POURIA",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `POURIA`,
        short_name: `POURIA`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e5cbff`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    }
  ],
};
