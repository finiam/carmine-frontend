import BN from "bn.js";

export enum OptionSide {
  "Long" = 0,
  "Short" = 1,
}

export enum OptionType {
  "Call" = 0,
  "Put" = 1,
}

export type BaseOption = {
  optionSide: OptionSide;
  optionType: OptionType;
  strikePrice: number;
  quoteToken: string;
  baseToken: string;
  maturity: number;
};

export type LiveOption = BaseOption & {
  premiumBase: string;
  premiumDecimal: number;
  raw: BN[];
};
