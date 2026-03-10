// Update color value displays
const qrColorInput = document.getElementById('qr-color');
const bgColorInput = document.getElementById('bg-color');
const qrColorValue = document.getElementById('qr-color-value');
const bgColorValue = document.getElementById('bg-color-value');

qrColorInput.addEventListener('input', (e) => {
    qrColorValue.textContent = e.target.value.toUpperCase();
});

bgColorInput.addEventListener('input', (e) => {
    bgColorValue.textContent = e.target.value.toUpperCase();
});

// QR Code generation
const form = document.getElementById('qr-form');
const qrcodeContainer = document.getElementById('qrcode');
let qrcode = null;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = document.getElementById('text-input').value.trim();
    const size = parseInt(document.getElementById('size-select').value);
    const colorDark = qrColorInput.value;
    const colorLight = bgColorInput.value;

    if (!text) {
        alert('Bitte geben Sie einen Text oder eine URL ein.');
        return;
    }

    // Clear previous QR code
    qrcodeContainer.innerHTML = '';

    // Generate new QR code
    qrcode = new QRCode(qrcodeContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });
});
