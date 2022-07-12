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
        ordersIds.push(nextOrderId);
        nextAnswer = nextOrderId;
      } else {
        return ordersIds;
      }
    }
  }

  checkOrders(orderIds, data) {
    const existedOrderIds = data.orders.map((order) => {
      return order.orderId.toString();
    });

    const unExistedOrderIds = orderIds
      .map((id) => {
        if (!existedOrderIds.includes(id)) {
          return id;
        }
      })
      .filter((id) => {
        return id !== undefined;
      });
    console.log(
      !unExistedOrderIds.length
        ? "\nProcessing orders now..."
        : `\nThis orders: ${unExistedOrderIds.map((id) => {
            return id;
          })} can not be found! Will process the rest orders`
    );
  }
};
