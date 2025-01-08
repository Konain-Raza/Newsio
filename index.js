const express = require("express");
const cors = require("cors");
const { fetchTopNews } = require("./controllers/fetchNews");
const app = express();
const port = 3000;
app.use(cors());
app.get("/news", async (req, res) => {
  try {
    const filteredNews = await fetchTopNews("TOP_NEWS");
    res.json({
      success: true,
      news: filteredNews,
    });
  } catch (error) {
    console.error("Error in /top-news route:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching news",
    });
  }
});

app.listen(port, () => {
  console.log(`Google News server running at http://localhost:${port}`);
});
