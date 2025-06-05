import { CancelSubmitData } from './EditMenu';

interface SelectBuyerFormProps {
  onSubmit: (data: CancelSubmitData) => void;
  mode: 'COMPLETE' | 'RESERVATION';
  onClose: () => void;
}
const SelectBuyerForm = ({ onSubmit, mode, onClose }: SelectBuyerFormProps) => {
  return <div></div>;
};

export default SelectBuyerForm;
