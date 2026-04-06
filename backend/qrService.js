function sanitizeQrInput(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  return input.trim();
}

module.exports = {
  sanitizeQrInput,
};
