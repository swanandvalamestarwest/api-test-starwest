const productModel = require('../models/productModel');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

class CheckoutError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'CheckoutError';
    this.statusCode = statusCode;
  }
}

function checkout({ items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutError('items must be a non-empty array', 400);
  }

  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    throw new CheckoutError(
      `paymentMethod must be one of: ${VALID_PAYMENT_METHODS.join(', ')}`,
      400
    );
  }

  const orderItems = items.map(({ productId, quantity }) => {
    const product = productModel.findById(productId);

    if (!product) {
      throw new CheckoutError(`Product with id ${productId} not found`, 404);
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new CheckoutError(
        `quantity for product ${productId} must be a positive integer`,
        400
      );
    }

    const subtotal = product.price * qty;

    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: qty,
      subtotal: Number(subtotal.toFixed(2)),
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = paymentMethod === 'cash' ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  return {
    items: orderItems,
    paymentMethod,
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

module.exports = {
  CheckoutError,
  VALID_PAYMENT_METHODS,
  CASH_DISCOUNT_RATE,
  checkout,
};
