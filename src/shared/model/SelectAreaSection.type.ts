export const AreaType: Record<number, string> = {
  1: 'sido',
  2: 'sigg',
  3: 'emd',
} as const;

export interface AreaState {
  sidoId?: number;
  siggId?: number;
  emdId?: number;
}

export interface SelectAreaSectionProps {
  defaultValue?: number;
  isResponsive?: boolean;
  onChange?: (emdId: number) => void;
  editMode?: boolean;
}
