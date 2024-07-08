const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = "19e370ed9a484826a1100e7436f463fe";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

// app.use(cors());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/api/news", async (req, res) => {
  const { category } = req.query;
  const url = `${BASE_URL}?country=in&apiKey=${API_KEY}${
    category ? `&category=${category}` : ""
  }`;

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

// netlify/functions/fetch-news.js

// const axios = require("axios");

// exports.handler = async function (event, context) {
//   const my_api_key = process.env.REACT_APP_NEWS_API_KEY;
//   const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${my_api_key}`;
//   try {
//     const response = await axios.get(
//       // `https://newsapi.org/v2/top-headlines?country=in&apiKey=${url}`,
//       url
//       // console.log(process.env.REACT_APP_NEWS_API_KEY)
//     );
//     return {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//       statusCode: 200,
//       body: JSON.stringify(response.data),
//     };
//   } catch (error) {
//     return {
//       statusCode: error.response.status,
//       body: JSON.stringify({ message: error.message }),
//     };
//   }
// };

// const axios = require("axios");
// const cors = require("cors")({ origin: true });

// exports.handler = async function (event, context, callback) {
//   const my_api_key = process.env.REACT_APP_NEWS_API_KEY;
//   const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${my_api_key}`;

//   cors(event, context, async () => {
//     try {
//       const response = await axios.get(url);
//       callback(null, {
//         statusCode: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "Content-Type",
//         },
//         body: JSON.stringify(response.data),
//       });
//     } catch (error) {
//       callback(null, {
//         statusCode: error.response.status,
//         body: JSON.stringify({ message: error.message }),
//       });
//     }
//   });
// };
