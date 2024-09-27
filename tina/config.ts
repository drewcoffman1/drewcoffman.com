import { defineConfig } from "tinacms";
import collectionsData from "../src/content/site-settings/site-settings.json";
import { SITE_TITLE } from "../src/consts";

const collectionOptions = collectionsData.collectionNames
  .split(",")
  .map((collection) => collection.trim())
  .map((collection) => {
    return { value: collection, label: collection };
  });
// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog",
        path: "src/content/blog",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title
                ?.toLowerCase()
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/ /g, "-")}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
            ui: {
              description:
                "The URL-friendly version of the title. Leave blank to auto-generate from the title.",
            },
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt (optional)",
            required: false,
            ui: {
              validate: (value) => {
                if (value && value.length > 170) {
                  return "Excerpt cannot be more than 170 characters";
                }
              },
            },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Published",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Date Updated (optional)",
            required: false,
          },
          {
            type: "image",
            name: "thumbnailImage",
            label: "Thumbnail Image (Landscape Only, shows in collections)",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image (optional, shows at top of post)",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured (optional)",
            required: false,
          },
          {
            label: "Collections",
            name: "collections",
            type: "string",
            list: true,
            options: collectionOptions,
          },
          {
            type: "boolean",
            label: "Published",
            name: "published",
            required: false,
          },
        ],
      },
      {
        name: "static",
        label: "Static Content",
        path: "src/content/static",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "src/content/site-settings",
        format: "json",

        defaultItem: {
          collectionNames: "favorites,2024",
          siteDescription: `A website for ${SITE_TITLE}`,
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            label: "Collection Names (Comma-Separated)",
            name: "collectionNames",
            required: true,
          },
          {
            type: "string",
            label: "Site Description (make descriptive for SEO)",
            name: "siteDescription",
            required: true,
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
