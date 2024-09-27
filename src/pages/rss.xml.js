import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getAllPosts } from '../lib/postUtils.astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
    // Combine collections
    const combinedPosts = await getAllPosts();

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        xmlns: {
            media: 'http://search.yahoo.com/mrss/' // Adding the media namespace
        },
        items: combinedPosts.map(post => {
            const heroImageUrl = post.data.heroImage ? new URL(post.data.heroImage, context.site).href : null;
            const heroImageHtml = heroImageUrl ? `<img src="${heroImageUrl}" alt="Featured Image" style="max-width:100%;"/>` : '';

            return {
                title: post.data.title,
                link: `${context.site}/${post.collection}/${post.slug}/`,
                pubDate: new Date(post.data.pubDate).toUTCString(),
                content: sanitizeHtml(`<div>${heroImageHtml}${parser.render(post.body, { site: context.site })}</div>`, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                    allowedAttributes: {
                        ...sanitizeHtml.defaults.allowedAttributes,
                        img: ['src', 'alt', 'title', 'style']
                    }
                }),
                ...post.data,
                media: heroImageUrl ? [{
                  url: heroImageUrl,
                  type: 'image/jpeg', // adjust the MIME type based on your actual image formats
                  medium: 'image'
                }] : []
            };
        }),
    });
}