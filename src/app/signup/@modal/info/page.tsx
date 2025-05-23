import TermsModal from '@/features/auth/ui/TermsModal';
import { infoTerms } from '@/shared/constants';
const InfoTermsPage = () => {
  return (
    <div>
      <TermsModal header={infoTerms.header} sections={infoTerms.sections} />
    </div>
  );
};

export default InfoTermsPage;
