import { translate } from "./protein";

describe("Invalid codons", () => {
  it("Should be a valid codon", async () => {
    const t = () => {
      translate("AAA");
    };
    expect(t).toThrow("Invalid codon");
  });
  it("Should be a multiple of 3", async () => {
    const t = () => {
      translate("AAAA");
    };
    expect(t).toThrow("Invalid codon");
  });
});

describe("Valid codons", () => {
  it("Should translate AUG into Methionine", () => {
    const proteins = translate("AUG");
    expect(proteins[0]).toBe("Methionine");
  });
  it('Should translate AUGUUUUCU into "Methionine", "Phenylalanine", "Serine"', () => {
    const proteins = translate("AUGUUUUCU");
    expect(proteins).toStrictEqual(["Methionine", "Phenylalanine", "Serine"]);
  });
  it("Should stop translating if STOP word occurs", () => {
    const proteins = translate("AUGUUUUCUUAAAUG");
    expect(proteins).toStrictEqual(["Methionine", "Phenylalanine", "Serine"]);
  });
});
