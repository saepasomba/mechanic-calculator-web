/**
 * Type definitions for calculator components
 */

export interface CalculateViewProps {
  componentInput: number;
  profitPercentage: number;
  finalPrice: number;
  componentPrice: number;
}

export interface BodyFormProps {
  componentHandler: (value: string) => void;
  profitHandler: (value: number) => void;
  profitValue: number;
  componentInput: string;
  totalComponent: number;
}

export interface SettingsProps {
  componentPrice: number;
  setComponentPrice: (value: number) => void;
}

export interface CalculationResult {
  totalComponent: number;
  capital: number;
  profit: number;
  finalPrice: number;
}
