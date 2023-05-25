type Protein =
  | "Methionine"
  | "Phenylalanine"
  | "Leucine"
  | "Serine"
  | "Tyrosine"
  | "Cysteine"
  | "Tryptophan"
  | "STOP";
type Codon =
  | "AUG"
  | "UUU"
  | "UUC"
  | "UUA"
  | "UUG"
  | "UCU"
  | "UCC"
  | "UCA"
  | "UCG"
  | "UAU"
  | "UAC"
  | "UGU"
  | "UGC"
  | "UGG"
  | "UAA"
  | "UAG"
  | "UGA";
type Proteins = { [key in Protein]: Codon[] };
type Codons = { [key in Codon]: Protein } | {};

type PotentialCodons = Array<Codon | string>;

const ALL_PROTEINS: Proteins = {
  Methionine: ["AUG"],
  Phenylalanine: ["UUU", "UUC"],
  Leucine: ["UUA", "UUG"],
  Serine: ["UCU", "UCC", "UCA", "UCG"],
  Tyrosine: ["UAU", "UAC"],
  Cysteine: ["UGU", "UGC"],
  Tryptophan: ["UGG"],
  STOP: ["UAA", "UAG", "UGA"],
};
const ALL_CODONS: Codons = Object.entries(ALL_PROTEINS).reduce(
  (acc, [protein, codons]) => {
    codons.forEach((codon) => {
      acc[codon] = protein;
    });
    return acc;
  },
  {} as Codons
);

const PROTEIN_STOPPERS = ALL_PROTEINS.STOP;

export function translate(rnaSequence: string): Protein[] {
  if (rnaSequence.length % 3 !== 0) {
    throw new Error("Invalid codon");
  }

  const potentialCodons: PotentialCodons = [];

  for (let i = 2; i <= rnaSequence.length; i += 3) {
    let codon = `${rnaSequence[i - 2]}${rnaSequence[i - 1]}${
      rnaSequence[i]
    }` as Codon;

    if (!Object.keys(ALL_CODONS).includes(codon))
      throw new Error("Invalid codon");
    if (PROTEIN_STOPPERS.includes(codon)) break;

    potentialCodons.push(codon);
  }

  return potentialCodons.map((codon) => ALL_CODONS[codon]) as Protein[];
}
