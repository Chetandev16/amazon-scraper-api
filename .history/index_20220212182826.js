const express = require("express");
const request = require("request-promise");

const app = express();

const PORT = process.env.PORT || 5000;

// const apiKey = "0dd9d63a4d1386be9ee762c2ecd69ac3";

generateScraperUrl = (apiKey) =>  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API.");
});
//Get product details;

app.get(`/products/:productId`, async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.in/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get product Reviews
app.get(`/products/:productId/reviews`, async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get product Offers
app.get(`/products/:productId/offers`, async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get Search Result
app.get(`/search/:searchQuery`, async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
