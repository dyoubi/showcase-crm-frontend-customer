import { Modal } from '@/core/shared/Modal';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { ContentWrapper } from './BonusClaimModal.styles';
import { BonusClaimContent } from './BonusClaimContent';
import { BonusClaimModalProps } from './BonusClaimModal.types';

export const BonusClaimModal = ({ isOpen, setIsOpen }: BonusClaimModalProps) => {
  const { isTabletOrPhone } = useBreakpoints();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} hasCloseButton={false}>
      <ContentWrapper width={isTabletOrPhone ? 300 : 540}>
        <BonusClaimContent />
      </ContentWrapper>
    </Modal>
  );
};
