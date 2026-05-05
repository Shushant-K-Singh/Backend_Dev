const { randomUUID } = require("crypto");

function createComment({ name, postId, userId, comment}) {
  return {
    id: randomUUID(),
    postId,
    userId,
    comment,
    createdAt: new Date().toISOString(),
  };
}

module.exports = createComment;