const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

// const API_KEY = "19e370ed9a484826a1100e7436f463fe";
const API_KEY = "2BnUs6BowuC5s8EU6p9bLnhMpY8TleVAUO8RH_QfN2niwr60";
// const BASE_URL = "https://newsapi.org/v2/top-headlines";
const BASE_URL = "'https://api.currentsapi.services/v1/latest-news?'";

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
app.use(express.json());

app.get("/api/news", async (req, res) => {
  const category = req.query.category || "general";
  const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching news data");
  }
});

app.post("/api/news", async (req, res) => {
  const category = req.body.category || "general";
  const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching news data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
