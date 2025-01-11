const cheerio = require('cheerio');

const serializeDescription = (description) => {
  try {
    return description
    .replace(/\\u([\dA-F]{4})/gi, (match, grp) => String.fromCharCode(parseInt(grp, 16))) 
    .replace(/<\/?[^>]+(>|$)/g, "")  
    .replace(/&nbsp;/g, ' ')  
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  } catch (err) {
    console.error("Error serializing description:", err);
    return "Error processing description";
  }
};

const fetchNews = async () => {
  try {
    const response = await fetch('https://news.google.com/rss');
    const data = await response.text();
    const $ = cheerio.load(data, { xmlMode: true });
    const articles = [];

    $('item').each((index, element) => {
      const title = $(element).find('title').text();
      const link = $(element).find('link').text();
      const description = $(element).find('description').text();
      const pubDate = $(element).find('pubDate').text();
      const source = $(element).find('source').text();

      articles.push({ title, link, description, pubDate, source });
    });

    return articles.map((item) => {
      return {
        title: item.title,
        link: item.link,
        description: serializeDescription(item.description) || "No description available",
        publishedAt: item.pubDate || "No Date Available",
        source: item.source || "No Source Available",
      };
    });

  } catch (error) {
    throw new Error("Error fetching news");
  }
};

module.exports = { fetchNews };