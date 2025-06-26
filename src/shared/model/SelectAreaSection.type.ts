import { PURPOSE_AREA } from '@/entities/auth';

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
  showVerifyButton?: boolean;
  onSuccess?: (emdId: number) => void;
  onChange?: () => void;
  purpose?: PURPOSE_AREA;
}

export interface SelectAreaSectionRef {
  getSelection: () => AreaState;
}
