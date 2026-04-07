class FakeQrValidator {
  constructor({ allowEmpty = false } = {}) {
    this.allowEmpty = allowEmpty;
    this.checkedValues = [];
  }

  isValid(value) {
    this.checkedValues.push(value);

    if (typeof value !== "string") {
      return false;
    }

    if (!this.allowEmpty && value.length === 0) {
      return false;
    }

    // Accept plain text and URLs that can be encoded into a QR payload.
    return value.length <= 2048;
  }
}

module.exports = {
  FakeQrValidator,
};
