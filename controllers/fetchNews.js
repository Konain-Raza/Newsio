const googleNewsAPI = require("google-news-json");
const serializeDescription = (description) => {
  try {
    // Decode Unicode escape sequences and remove HTML tags
    return description
    .replace(/\\u([\dA-F]{4})/gi, (match, grp) => String.fromCharCode(parseInt(grp, 16)))  // Decode Unicode
    .replace(/<\/?[^>]+(>|$)/g, "")  // Remove HTML tags
    .replace(/&nbsp;/g, '')  // Replace &nbsp; with space
    .replace(/&lt;/g, '<')  // Decode HTML entities
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  } catch (err) {
    console.error("Error serializing description:", err);
    return "Error processing description";
  }
};


// Function to fetch news and format it
const fetchTopNews = async (topic) => {
  try {
    const news = await googleNewsAPI.getNews(
      `googleNewsAPI.${topic}`,
      null,
      "en-GB"
    );
    return news.items.map((item) => {
      const description = serializeDescription(item.description);

      return {
        title: item.title,
        link: item.link,
        description: description || "No description available",
        publishedAt: item?.pubDate || "No Date Available",
        source: item?.source?.text,
      };
    });
  } catch (error) {
    throw new Error("Error fetching news");
  }
};

module.exports = { fetchTopNews };
