import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
const parser = new MarkdownIt();

export async function get(context) {
  const posts = await getCollection('blog');

  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: "Jeff Browning",
    description: "A humble developer's thoughts on code",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body))
    }))
  })
}
