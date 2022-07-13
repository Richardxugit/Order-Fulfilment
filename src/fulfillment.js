const prompt = require("prompt-sync")();
module.exports = class Fulfillment {
  inputOrderId() {
    const ordersIds = [];
    let nextAnswer = "";

    while (nextAnswer !== "stop") {
      const nextOrderId = prompt(
        "#Please input your order id and input 'stop' when you are done: "
      );
      if (nextOrderId !== "stop") {
        ordersIds.push(Number(nextOrderId));
        nextAnswer = nextOrderId;
      } else {
        return ordersIds;
      }
    }
  }

  checkOrders(orderIds, orders) {
    const existedOrderIds = orders.map((order) => {
      return order.orderId;
    });

    const unExistedOrderIds = orderIds.filter((id) => {
      if (!existedOrderIds.includes(id)) {
        return id;
      }
    });

    console.log(
      !unExistedOrderIds.length
        ? "\n##Processing orders now..."
        : `\n##Order ID: ${unExistedOrderIds.map((id) => {
            return id;
          })} can not be found! Will process the rest orders`
    );
    const processOrderIds = orderIds.filter((id) => {
      if (existedOrderIds.includes(id)) {
        return id;
      }
    });
    return orders.filter((order) => {
      if (processOrderIds.includes(order.orderId)) {
        return order;
      }
    });
  }

  orderFulfillment(orders, products) {
    let allProducts = products;
    let fulfilledOrderIds = [];
    let unFulfilledOrderIds = [];
    for (let i = 0; i < orders.length; i++) {
      const result = this.checkProductQuantity(orders[i].items, allProducts);
      if (!result) {
        allProducts = this.decreaseProductQuantity(orders[i].items, allProducts);
        fulfilledOrderIds.push(orders[i].orderId)
      } else {
        unFulfilledOrderIds.push(orders[i].orderId)
      }
    }
    return {allProducts,fulfilledOrderIds,unFulfilledOrderIds};
  }

  checkProductQuantity(items, products) {
    for (let i = 0; i < items.length; i++) {
      const product = products.filter((product) => {
        return product.productId === items[i].productId;
      });

      const quantityDiff = product[0].quantityOnHand - items[i].quantity;
      if (quantityDiff < 0) {
        return items[i].orderId;
      }
    }
  }

  decreaseProductQuantity(items, products) {
    let updatedProducts = products;
    for (let i = 0; i < items.length; i++) {

      updatedProducts.map((product) => {
        if (product.productId === items[i].productId) {
          product.quantityOnHand = product.quantityOnHand - items[i].quantity;
        }
      });
    }
    return updatedProducts
  }
};
