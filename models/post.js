const { randomUUID } = require("crypto");

function createPost({ userId, tittle, content, tags }) {
  return {
    id: randomUUID(),
    userId,
    tittle,
    content,
    tags,
    createdAt: new Date().toISOString(),
  };
}

module.exports = createPost;
