const { buildQrOptions } = require("../script");

describe("buildQrOptions", () => {
  it("creates QR options with expected values", () => {
    // Arrange
    const text = "https://example.com";
    const size = 256;
    const colorDark = "#112233";
    const colorLight = "#ffffff";
    const correctLevel = "H";

    // Act
    const result = buildQrOptions(
      text,
      size,
      colorDark,
      colorLight,
      correctLevel,
    );

    // Assert
    expect(result).not.toBeNull();
    expect(result.text).toBe("https://example.com");
    expect(result.width).toBe(256);
    expect(result.height).toBe(256);
    expect(result.colorDark).toBe("#112233");
    expect(result.colorLight).toBe("#ffffff");
    expect(result.correctLevel).toBe("H");
  });
});
