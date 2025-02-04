// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 9000;

// const API_KEY = "2BnUs6BowuC5s8EU6p9bLnhMpY8TleVAUO8RH_QfN2niwr60";
// const BASE_URL = "https://api.currentsapi.services/v1/latest-news";

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET"],
//   })
// );
// app.use(express.json());

// app.get("/api/news", async (req, res) => {
//   const category = req.query.category || "general";
//   const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;
//   // const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Error fetching news data");
//   }
// });

// app.post("/api/news", async (req, res) => {
//   const category = req.body.category || "general";
//   const url = `${BASE_URL}?country=in&category=${category}&apiKey=${API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Error fetching news data");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// // require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 9000;

// // const API_KEY = process.env.NEWS_API_KEY; // Store API key in .env file
// const API_KEY = "29992a82f62d43158ee6e8844d8fa012";

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET"],
//   })
// );
// app.use(express.json());

// const categoryMapping = {
//   general: "general",
//   business: "business",
//   technology: "technology",
//   entertainment: "entertainment",
//   sports: "sports",
//   science: "science",
//   health: "health",
// };

// app.get("/api/news", async (req, res) => {
//   const requestedCategory = req.query.category || "general";
//   const category = categoryMapping[requestedCategory] || "general";

//   try {
//     const response = await axios.get("https://newsapi.org/v2/top-headlines", {
//       params: {
//         country: "us", // You can change this to 'in' for Indian news
//         category: category,
//         apiKey: API_KEY,
//         pageSize: 10, // Limit to 10 articles
//       },
//     });

//     res.json({
//       articles: response.data.articles.map((article) => ({
//         ...article,
//         source: { name: article.source.name },
//       })),
//     });
//   } catch (error) {
//     console.error(
//       "Error fetching news:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).json({
//       error: "Error fetching news data",
//       details: error.response ? error.response.data : error.message,
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 9000;
const API_KEY = "29992a82f62d43158ee6e8844d8fa012";

// app.use(cors());
// // app.use(cors({ origin: "http://localhost:3000" }));

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://newsify24.vercel.app",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

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
        country: "in",
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
