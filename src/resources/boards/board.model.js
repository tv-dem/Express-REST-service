const {v4} = require('uuid');

class Board {
  constructor({
    id = v4(),
    title = 'TITLE',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns: columns.map(col => col.toResponse()) };
  }
}

module.exports = Board;
