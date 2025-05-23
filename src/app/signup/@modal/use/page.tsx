import TermsModal from '@/features/auth/ui/TermsModal';
import { useTerms } from '@/shared/constants';
const UseTermsPage = () => {
  return (
    <div>
      <TermsModal header={useTerms.header} sections={useTerms.sections} />
    </div>
  );
};

export default UseTermsPage;
