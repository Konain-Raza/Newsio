const express = require("express");
const cors = require("cors");
const { fetchTopNews } = require("./controllers/fetchNews");
const app = express();
const port = 3000;

app.use(cors());

const htmlContent = `
<h1>🌍 Newsio API: Stay Updated with the Latest News! 📰</h1>
<p>Your personal news genie is here to bring you the top stories from around the world! 🌎✨</p>

<h2>📰 Fetch the Latest News</h2>
<p>Need to catch up on the latest headlines? It's super simple! Just hit the <code>/news</code> endpoint, and we'll fetch the hottest stories for you. 🔥📰</p>

<h3>Request 🔍</h3>
<p>Make a simple GET request to:</p>
<pre><code>GET https://newsio.vercel.app/news</code></pre>

<h3>Response 💬</h3>
<p>You'll get back a list of the latest breaking news with all the details you need! Here's an example:</p>

<pre><code>
{
  "success": true,
  "news": [
    {
      "title": "Climate change: What role is it playing in the California fires - BBC",
      "link": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5hN2dMWHMxd1E1cmlhaEJ0elA0a3hFYlM3NlRuNFJ4UWdYeEFuMXk1YjFtZm93X3BxanFnQ3FKRlpqTGRDRGdNYzhjT093VDVQbkdqUjlIdGJUOTRD0gFiQVVfeXFMTzI3RWg4cnlCM2VvVHFjeDRvanpPZl9GZmY2SW5xeG1jTC1YVURFcmEwUmJVVGtXalFFSkJjZ3RtUU85a2xPdzFET3lXTHFCaVEwZ1ZqSkhXZWdzMXFwTzBURHc?oc=5",
      "description": "Climate change: What role is it playing in the California fires, LA wildfires in maps, Visual explainer, Southern California Wildfires Spread. 🌍🔥",
      "publishedAt": "Wed, 08 Jan 2025 14:55:04 GMT",
      "source": "BBC"
    },
    ...
  ]
}
</code></pre>

<h3>🧑‍💻 How it Works</h3>
<p>Simply hit the endpoint, and we’ll serve up the freshest news from the web. 🌐 Whether you're into environmental issues 🌱, technology ⚙️, or sports 🏅, we've got you covered! It's like having the news at your fingertips 24/7! 🔥</p>

<h3>🤖 Ready for Action</h3>
<p>Our API is always on standby, so you can fetch news anytime, anywhere! Need help or have questions? We're just an email away at <a href="mailto:konainraza105@gmail.com">konainraza105@gmail.com</a> 📧.</p>

<p>Start fetching news and stay ahead of the curve with Newsio! 📰✨</p>

<p>Made with 💖 by Konain Raza</p>
`;

app.get("/", (req, res) => {
  res.send(htmlContent);
});

app.get("/news", async (req, res) => {
  try {
    const filteredNews = await fetchTopNews("TOP_NEWS");
    res.json({
      success: true,
      news: filteredNews,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching news",
    });
  }
});

app.listen(port, () => {
  console.log(`Newsio server running at http://localhost:${port}`);
});
