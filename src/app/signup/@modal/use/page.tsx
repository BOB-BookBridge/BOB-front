import TermsModal from '@/features/auth/ui/signup/TermsModal';
import { useTerms } from '@/shared/constants';
const UseTermsPage = () => {
  return (
    <div>
      <TermsModal header={useTerms.header} sections={useTerms.sections} />
    </div>
  );
};

export default UseTermsPage;
