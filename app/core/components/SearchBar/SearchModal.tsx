import { useRouter } from 'next/router';

import { useUpdateEffect } from '@/core/hooks/useUpdateEffect';
import { Modal } from '@/core/shared/Modal';
import { Box } from '@/core/shared/Box';
import { ModalProps } from '@/core/shared/Modal/Modal.types';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { SearchBar } from './SearchBar';

type SearchModalProps = ModalProps;

export const SearchModal = ({ isOpen, setIsOpen }: SearchModalProps) => {
  const router = useRouter();
  const { isPhone, isTabletOrPhone } = useBreakpoints();

  // this hook will automatically close the SearchModal
  // when the user goes to another page
  useUpdateEffect(() => {
    setIsOpen(false);
  }, [router?.asPath, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullWidth>
      <Box mt={isTabletOrPhone ? 'l' : 'xxs'} mb="l">
        <SearchBar customSlidesToShow={isPhone ? 2 : 3} />
      </Box>
    </Modal>
  );
};
