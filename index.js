"use strict";
const data = require("./data/data.json");
const Fulfillment = require("./src/fulfillment");
const Inventory = require("./src/Inventory");

const fulfillment = new Fulfillment();
const inventory = new Inventory();

const processOrders = () => {
  console.log("Welcome to the sample order fulfillment application!\n");
  const orders = data.orders;
  const products = data.products;

  const orderIds = fulfillment.inputOrderId();
  const filteredOrderIds = fulfillment.checkOrders(orderIds, orders);
  fulfillment.orderFulfillment(filteredOrderIds, orders)
};


processOrders();
