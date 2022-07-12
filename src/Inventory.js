module.exports = class Inventory {
  checkProductsQuantity(products) {
    products.map((product) => {
      if (product.quantityOnHand < product.reorderThreshold) {
        this.reOrderPurchase(product.productId, product.reorderAmount);
      }
    });
  }

  checkReorderThreshold(products) {
    products.map((product) => {
      if (product.quantityOnHand < product.reorderThreshold) {
        this.reOrderPurchase(product.productId, product.reorderAmount);
      }
    });
  }

  reOrderPurchase(productId, reorderAmount) {
    console.log(
      `This product with productId:${productId} needs to be reorder, a purchase order of ${reorderAmount} has been created!\n`
    );
  }
};
