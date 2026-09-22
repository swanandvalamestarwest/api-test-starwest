const bcrypt = require('bcryptjs');

// In-memory "table" of users. Passwords below are hashed versions of "password123".
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('password123', 8),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: bcrypt.hashSync('password123', 8),
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    password: bcrypt.hashSync('password123', 8),
  },
];

let nextId = users.length + 1;

function findByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return users.find((user) => user.id === id);
}

function create({ name, email, password }) {
  const user = {
    id: nextId++,
    name,
    email,
    password,
  };
  users.push(user);
  return user;
}

module.exports = {
  users,
  findByEmail,
  findById,
  create,
};
