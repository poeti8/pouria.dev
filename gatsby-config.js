module.exports = {
  siteMetadata: {
    title: `POURIA`,
    author: `Pouria Ezzati`,
    description: `Thoughts that keep me awake at night.`,
    siteUrl: `https://pouria.dev`,
    social: {
      twitter: `poeti8`,
      github: `poeti8`,
      spotify: `poeti8`,
      telegram: `poeti8`,
      email: `hi@pouria.dev`,
      rss: `rss.xml`,
    },
    japaneseWords: ["波", "愛", "神", "紫", "夢", "雨", "音", "草"],
    quotes: [
      "My eyesight got worse while building this website.",
      "I created The Devs network while listening to Danny Brown.",
      "My favorite hobby is spending days to create Spotify playlists and never listen to them.",
      "I got a total of 0 matches on Tinder.",
      "I could have published this website at least 2 weeks earlier if I hadn't used TypeScript.",
      "I care about my website being responsive so much, I just hope you're not visiting from mobile.",
      "My dad left me when I was 4 to get me ice cream and came back 5 minutes later."
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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-97516317-9`,
      },
    },
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
              return allMarkdownRemark.edges.map(edge => {
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
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Odibee Sans`, `Public Sans\:300,700,`],
        display: "swap",
      },
    },
  ],
};
