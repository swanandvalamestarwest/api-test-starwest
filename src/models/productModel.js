// In-memory "table" of products.
const products = [
  {
    id: 1,
    name: 'Laptop',
    description: '14-inch laptop, 16GB RAM, 512GB SSD',
    price: 999.99,
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    price: 29.99,
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 89.99,
  },
];

function findAll() {
  return products;
}

function findById(id) {
  return products.find((product) => product.id === id);
}

module.exports = {
  products,
  findAll,
  findById,
};
