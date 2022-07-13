"use strict";
const data = require("./data/data.json");
const Fulfillment = require("./src/fulfillment");
const Inventory = require("./src/Inventory");

const fulfillment = new Fulfillment();
const inventory = new Inventory();

const processOrders = () => {
  console.log("##Welcome to the sample order fulfillment application!##\n");
  const orders = data.orders;
  const products = data.products;

  const orderIds = fulfillment.inputOrderId();
  const processOrders = fulfillment.checkOrders(orderIds, orders);
  const {
    allProducts: updatedProducts,
    fulfilledOrderIds,
    unFulfilledOrderIds,
  } = fulfillment.orderFulfillment(processOrders, products);
  if (fulfilledOrderIds.length > 0) {
    console.log(
      `\nOrder ID(s): ${fulfilledOrderIds.map((id) => {
        return id;
      })} has been fulfilled`
    );
    inventory.createShipping(fulfilledOrderIds);
  }
  if (unFulfilledOrderIds.length > 0) {
    console.log(
      `\nOrder ID(s): ${unFulfilledOrderIds.map((id) => {
        return id;
      })} can not be fulfilled`
    );
  }
  inventory.checkReorderThreshold(updatedProducts);
};

processOrders();
