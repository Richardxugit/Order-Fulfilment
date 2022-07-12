"use strict";
const data = require("./data/data.json");
const Fulfillment = require("./src/fulfillment");
const fulfillment = new Fulfillment();

const processOrders = () => {
  console.log("Welcome to the sample order fulfillment application!\n");
  const orderIds = fulfillment.inputOrderId();
  fulfillment.checkOrders(orderIds, data);
};

processOrders();
