import mongoose from 'mongoose';
function createuser({ email, password, name }) {
  return {
    id: randomUUID(),
    email,
    password,
    name,
    createdAt: new Date().toISOString(),
  };
}

module.exports = createuser;