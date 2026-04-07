function sanitizeQrInput(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  return input.trim();
}

function generateAndStoreQrEntry(input, dependencies) {
  if (!dependencies || typeof dependencies !== "object") {
    throw new TypeError("Dependencies object is required");
  }

  const { validator, repository, auditLogger, now = () => new Date() } = dependencies;

  if (!validator || !repository || !auditLogger) {
    throw new TypeError("Missing required dependencies");
  }

  const sanitizedInput = sanitizeQrInput(input);

  if (!validator.isValid(sanitizedInput)) {
    auditLogger.log("qr-rejected", sanitizedInput);
    throw new Error("Input is not a valid QR payload");
  }

  const entry = {
    id: repository.nextId(),
    payload: sanitizedInput,
    createdAt: now().toISOString(),
  };

  repository.save(entry);
  auditLogger.log("qr-saved", entry.id);

  return entry;
}

module.exports = {
  sanitizeQrInput,
  generateAndStoreQrEntry,
};
