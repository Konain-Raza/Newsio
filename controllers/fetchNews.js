const googleNewsAPI = require("google-news-json");
const serializeDescription = (description) => {
  try {
    // Decode URL encoding and clean HTML <a> tags
    let decodedString = JSON.parse(
      '"' + description.replace(/\"/g, '\\"') + '"'
    );
    return decodedString;
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
