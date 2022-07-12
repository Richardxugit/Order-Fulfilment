const prompt = require("prompt-sync")();
module.exports = class Fulfillment {
  inputOrderId() {
    const ordersIds = [];
    let nextAnswer = "";

    while (nextAnswer !== "stop") {
      const nextOrderId = prompt(
        "Please input your order id and input 'stop' when you are done: "
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
        ? "\nProcessing orders now..."
        : `\nOrder ID: ${unExistedOrderIds.map((id) => {
            return id;
          })} can not be found! Will process the rest orders`
    );
    return orderIds.filter((id) => {
      if (existedOrderIds.includes(id)) {
        return id;
      }
    });
  }

  orderFulfillment(orderIds, orders) {
    return orderIds.map((id) => {
      const filteredOrders = orders
        .filter((order) => {
          return order.orderId === id;
        })
        .flatMap((order) => {
          return order.items;
        });
        console.log(filteredOrders)
    });
  }

  checkProductQuantity(items, allProducts){
  
  }

  decreaseProductQuantity(productId, products){

  }
};
