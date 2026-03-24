function buildQrOptions(text, size, colorDark, colorLight, correctLevel) {
  return {
    text,
    width: size,
    height: size,
    colorDark,
    colorLight,
    correctLevel,
  };
}

if (typeof document !== "undefined") {
  // Update color value displays
  const qrColorInput = document.getElementById("qr-color");
  const bgColorInput = document.getElementById("bg-color");
  const qrColorValue = document.getElementById("qr-color-value");
  const bgColorValue = document.getElementById("bg-color-value");

  if (qrColorInput && qrColorValue) {
    qrColorInput.addEventListener("input", (e) => {
      qrColorValue.textContent = e.target.value.toUpperCase();
    });
  }

  if (bgColorInput && bgColorValue) {
    bgColorInput.addEventListener("input", (e) => {
      bgColorValue.textContent = e.target.value.toUpperCase();
    });
  }

  // QR Code generation
  const form = document.getElementById("qr-form");
  const qrcodeContainer = document.getElementById("qrcode");

  if (form && qrcodeContainer && qrColorInput && bgColorInput) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const text = document.getElementById("text-input").value.trim();
      const size = parseInt(document.getElementById("size-select").value, 10);
      const colorDark = qrColorInput.value;
      const colorLight = bgColorInput.value;

      if (!text) {
        alert("Bitte geben Sie einen Text oder eine URL ein.");
        return;
      }

      // Clear previous QR code
      qrcodeContainer.innerHTML = "";

      // Generate new QR code
      const options = buildQrOptions(
        text,
        size,
        colorDark,
        colorLight,
        QRCode.CorrectLevel.H,
      );
      new QRCode(qrcodeContainer, options);
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildQrOptions };
}
