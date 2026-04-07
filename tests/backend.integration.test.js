const { generateAndStoreQrEntry } = require("../backend/qrService");
const { FakeQrValidator } = require("./doubles/FakeQrValidator");
const { InMemoryQrRepository } = require("./doubles/InMemoryQrRepository");
const { SpyAuditLogger } = require("./doubles/SpyAuditLogger");

function buildDependencies(nowValue = "2026-04-07T10:00:00.000Z") {
  return {
    validator: new FakeQrValidator(),
    repository: new InMemoryQrRepository(),
    auditLogger: new SpyAuditLogger(),
    now: () => new Date(nowValue),
  };
}

describe("generateAndStoreQrEntry integration", () => {
  it("stores a sanitized payload and writes a success audit event", () => {
    const deps = buildDependencies();

    const entry = generateAndStoreQrEntry("  https://example.com  ", deps);

    expect(entry).toEqual({
      id: "qr-1",
      payload: "https://example.com",
      createdAt: "2026-04-07T10:00:00.000Z",
    });
    expect(deps.repository.all()).toEqual([entry]);
    expect(deps.validator.checkedValues).toEqual(["https://example.com"]);
    expect(deps.auditLogger.allEvents()).toEqual([
      { type: "qr-saved", payload: "qr-1" },
    ]);
  });

  it("creates incrementing IDs over multiple saves", () => {
    const deps = buildDependencies();

    const first = generateAndStoreQrEntry("first", deps);
    const second = generateAndStoreQrEntry("second", deps);

    expect(first.id).toBe("qr-1");
    expect(second.id).toBe("qr-2");
    expect(deps.repository.all()).toHaveLength(2);
  });

  it("rejects invalid input and writes a rejection audit event", () => {
    const deps = buildDependencies();
    deps.validator = new FakeQrValidator({ allowEmpty: false });

    expect(() => generateAndStoreQrEntry("   ", deps)).toThrow(
      "Input is not a valid QR payload",
    );

    expect(deps.repository.all()).toEqual([]);
    expect(deps.auditLogger.allEvents()).toEqual([
      { type: "qr-rejected", payload: "" },
    ]);
  });
});
