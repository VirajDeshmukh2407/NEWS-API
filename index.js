const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 9000;
const API_KEY = "29992a82f62d43158ee6e8844d8fa012";

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

app.get("/api/news", async (req, res) => {
  const category = req.query.category || "general";

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        category: category,
        apiKey: API_KEY,
        pageSize: 30,
      },
    });

    console.log(
      `Fetched ${response.data.articles.length} articles for category: ${category}`
    );

    res.json({
      articles: response.data.articles.map((article) => ({
        ...article,
        source: { name: article.source.name },
      })),
    });
  } catch (error) {
    console.error("Error in /api/news route:", error.message);
    res.status(500).json({
      error: "Failed to fetch news",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
