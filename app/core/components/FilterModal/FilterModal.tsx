import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import { Modal } from '@/core/shared/Modal';
import { getSortByOptions } from '@/core/components/SortBy/constants';
import { MenuButtonGroup } from '@/core/components/MenuButtonGroup/MenuButtonGroup';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { useGetProvidersQuery } from '@/core/domains/provider';

import { FilterModalProps } from './FilterModal.types';
import { ContentWrapper, FilterButton } from './FilterModal.styles';
import { ProviderSelector } from '../ProviderSelector/ProviderSelector';

export const FilterModal = ({ onSubmit, isOpen, setIsOpen }: FilterModalProps) => {
  const router = useRouter();
  const {
    query: { sortBy },
  } = router;
  const { data: providersList } = useGetProvidersQuery();

  const { formatMessage } = useIntl();

  const sortByOptions = getSortByOptions(formatMessage);

  const [selectedProviders, setSelectedProviders] = useState<Array<string>>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>((sortBy as string) || sortByOptions[2].value);
  const [isProviderSelectorOpen, setIsProviderSelectorOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsProviderSelectorOpen(true);
  }, [isOpen]);

  useEffect(() => {
    if (providersList) {
      const defaultSelectedProviders = providersList
        .filter((provider) => provider.activate)
        .map((provider) => provider.name.toLowerCase());

      setSelectedProviders(defaultSelectedProviders);
    }
  }, [providersList]);

  useEffect(() => {
    setSelectedSortOption(sortBy as string);
  }, [sortBy]);

  const handleFilter = () => {
    const updatedQuery = { ...router.query };

    delete updatedQuery.deviceType;

    if (selectedSortOption) {
      updatedQuery.sortBy = selectedSortOption;
    } else {
      delete updatedQuery.sortBy;
    }

    router.replace(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true },
    );

    onSubmit(selectedProviders);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} hasCloseButton={false}>
      <ContentWrapper isProviderSelectorOpen={isProviderSelectorOpen}>
        <MenuButtonGroup
          selectList={sortByOptions}
          isLink={false}
          onSelect={setSelectedSortOption}
          selected={sortBy as string}
        />
        <ProviderSelector
          fullWidth
          isOpen
          toggleOnClickOutside={false}
          onFilter={(selected: Array<string>) => {
            setSelectedProviders(selected);
          }}
          onToggle={(isSelectorOpen: boolean) => {
            setIsProviderSelectorOpen(isSelectorOpen);
          }}
          selectedProvidersByDefault={selectedProviders}
        />
        <FilterButton size={ButtonSize.Medium} onClick={handleFilter} isProviderSelectorOpen={isProviderSelectorOpen}>
          <FormattedMessage id="providerSelector.showResults" defaultMessage="Show Results" />
        </FilterButton>
      </ContentWrapper>
    </Modal>
  );
};
