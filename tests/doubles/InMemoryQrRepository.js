class InMemoryQrRepository {
  constructor() {
    this.items = [];
    this.sequence = 0;
  }

  nextId() {
    this.sequence += 1;
    return `qr-${this.sequence}`;
  }

  save(entry) {
    this.items.push(entry);
  }

  all() {
    return [...this.items];
  }
}

module.exports = {
  InMemoryQrRepository,
};
