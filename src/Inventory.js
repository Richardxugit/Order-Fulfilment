module.exports = class Inventory {
  checkReorderThreshold(products) {
    products.map((product) => {
      if (product.quantityOnHand < product.reorderThreshold) {
        this.reOrderPurchase(product.productId, product.reorderAmount);
      }
    });
  }

  reOrderPurchase(productId, reorderAmount) {
    console.log(
      `\nThis product with productId:${productId} needs to be reorder, a purchase order of ${reorderAmount} has been created!`
    );
  }

  createShipping(fulfilledOrders) {
    console.log(
      `\nShipping for Order(s) ${fulfilledOrders.map((id) => {
        return id;
      })} have been arranged...`
    );
  }
};
