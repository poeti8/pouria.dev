const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`./src/templates/page.tsx`);
  const postTemplate = path.resolve(`./src/templates/post.tsx`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const blog = result.data.allMarkdownRemark.edges.filter(
    e => e.node.fields.collection === "blog"
  );
  const page = result.data.allMarkdownRemark.edges.filter(
    e => e.node.fields.collection === "page"
  );

  blog.forEach((post, index) => {
    const previous = index === blog.length - 1 ? null : blog[index + 1].node;
    const next = index === 0 ? null : blog[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  page.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: pageTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    createNodeField({
      name: `collection`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    });
  }
};
