const express = require("express");
const request = require("request-promise");

const app = express();

const PORT = process.env.PORT || 5000;

const apiKey = "0dd9d63a4d1386be9ee762c2ecd69ac3";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

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



app.listen(PORT, () => console.log(`server running on port ${PORT}`));