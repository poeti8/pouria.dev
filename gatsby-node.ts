import path from "path";
import * as fs from "fs";
import { createFilePath } from "gatsby-source-filesystem";
import satori from "satori";
import svg2img from "svg2img";
import { promisify } from "util";

const svgToImg = promisify(svg2img);

import OGTemplate from "./src/templates/og";

const Fonts = {
  OdibeeSans: fs.readFileSync("./assets/fonts/odibee-sans.ttf"),
  PublicSans: fs.readFileSync("./assets/fonts/public-sans.ttf"),
};

const davidBustBubbleGumImage = fs.readFileSync(
  "./assets/david-bubble-gum.png",
  "base64"
);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`./src/templates/page.tsx`);
  const postTemplate = path.resolve(`./src/templates/post.tsx`);
  const photographyTemplate = path.resolve(`./src/templates/photography.tsx`);
  const contactTemplate = path.resolve(`./src/templates/contact.tsx`);
  const worksTemplate = path.resolve(`./src/templates/works.tsx`);

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
                description
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
    (e) => e.node.fields.collection === "blog"
  );
  const page = result.data.allMarkdownRemark.edges.filter(
    (e) => e.node.fields.collection === "page"
  );

  await Promise.all(
    blog.map(async (post, index) => {
      const previous = index === blog.length - 1 ? null : blog[index + 1].node;
      const next = index === 0 ? null : blog[index - 1].node;

      // create the open graph (og) image for each blog post
      const ogImageSvg = await satori(
        OGTemplate({
          davidBustBubbleGumImage,
          title: post.node.frontmatter.title,
          subtitle: post.node.frontmatter.description,
        }),
        {
          width: 800,
          height: 400,
          fonts: [
            {
              name: "Odibee Sans",
              data: Fonts.OdibeeSans,
              weight: 700,
              style: "normal",
            },
            {
              name: "Public Sans",
              data: Fonts.PublicSans,
              weight: 400,
              style: "normal",
            },
          ],
        }
      );

      const ogImagePng = await svgToImg(ogImageSvg);

      const ogImageName = post.node.fields.slug.replace(/\//g, "");

      // create og folder if doesm't exit
      const ogFolderPath = "./static/og";
      if (!fs.existsSync(ogFolderPath)) {
        fs.mkdirSync(ogFolderPath);
      }
      // write png file inside /static/og/ folder
      fs.writeFileSync(`./static/og/${ogImageName}.png`, ogImagePng);

      // create page using the template
      createPage({
        path: post.node.fields.slug,
        component: postTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    })
  );

  page.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: pageTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
  createPage({
    path: "/photography/",
    component: photographyTemplate,
    context: {
      slug: "/photography/",
    },
  });
  createPage({
    path: "/contact/",
    component: contactTemplate,
    context: {
      slug: "/contact/",
    },
  });
  createPage({
    path: "/works/",
    component: worksTemplate,
    context: {
      slug: "/works/",
    },
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
