class SpyAuditLogger {
  constructor() {
    this.events = [];
  }

  log(type, payload) {
    this.events.push({ type, payload });
  }

  allEvents() {
    return [...this.events];
  }
}

module.exports = {
  SpyAuditLogger,
};
