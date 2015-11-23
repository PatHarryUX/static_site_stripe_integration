'use strict';

const express = require("express");
const config = (process.env.HEROKU)
                ? { stripe_secret_key : process.env.stripe_secret_key }
                : require("./config.js");
const app = express();
const port = process.env.PORT || 3000;
const STRIPE_SECRET_KEY = config.stripe_secret_key;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

app.get('/', function (req, res) {
  res.send('Hello World!');
  stripe.customers.list(
    { limit: 3 },
    function(err, customers) {
      console.log(customers)
      // asynchronously called
    }
  );
});

app.post('/', function (req, res) {
  res.send('Hello World!');
})

const server = app.listen(port, function () {
  console.log("Server is running on port 3000...");
});
