const { sanitizeQrInput } = require("../backend/qrService");

describe("sanitizeQrInput", () => {
  it("trims surrounding whitespace", () => {
    const result = sanitizeQrInput("   https://example.com   ");

    expect(result).toBe("https://example.com");
  });

  it("throws for non-string input", () => {
    expect(() => sanitizeQrInput(null)).toThrow("Input must be a string");
  });
});
