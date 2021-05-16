const {v4} = require('uuid');

class Column {
  constructor({
    id = v4(),
    title = 'TITLE',
    order = 1
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  toResponse(){
    const {id, title, order} = this;
    return {id, title, order}
  }
}

module.exports = Column;
