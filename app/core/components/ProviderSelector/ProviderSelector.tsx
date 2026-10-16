import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { Dropdown, DropdownMenu } from '@/core/components/Dropdown';
import { useGetProvidersQuery } from '@/core/domains/provider';
import { Checkbox } from '@/core/shared';
import { ButtonColor, ButtonSize, ButtonVariant } from '@/core/shared/Button/Button.types';

import {
  ProviderContainer,
  StyledButton,
  StyledDropdownContainer,
  StyledDropdownItem,
} from './ProviderSelector.styles';
import { ProviderSelectorProps } from './ProviderSelector.types';
import { SELECTION_STATES } from './ProviderSelector.constants';

export const ProviderSelector = ({
  onFilter,
  onToggle,
  fullWidth,
  isOpen,
  selectedProvidersByDefault,
  toggleOnClickOutside,
}: ProviderSelectorProps) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Prevent RTK Query updates during navigation to avoid setState during render
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const { data: providersList } = useGetProvidersQuery(undefined, {
    skip: isNavigating,
  });
  const [selectedProviders, setSelectedProviders] = useState<{ [key: string]: boolean }>({});
  const [activeProvidersList, setActiveProvidersList] = useState(
    providersList?.filter((provider) => provider.activate),
  );
  const [selectButtonInfo, setSelectButtonInfo] = useState({
    title: formatMessage({ id: 'providerSelector.deselectAll', defaultMessage: 'Deselect All' }),
    state: SELECTION_STATES.deselectAll,
  });

  useEffect(() => {
    if (isNavigating) return;

    const defaultSelectedProviders: { [key: string]: boolean } = {};

    providersList?.forEach((provider) => {
      if (provider.activate) {
        defaultSelectedProviders[provider.name.toLowerCase()] = false;
      }
    });

    if (selectedProvidersByDefault) {
      selectedProvidersByDefault.forEach((providerName: string) => {
        defaultSelectedProviders[providerName] = true;
      });
    } else {
      providersList?.forEach((provider) => {
        if (provider.activate) {
          defaultSelectedProviders[provider.name.toLowerCase()] = true;
        }
      });
    }
    setActiveProvidersList(providersList?.filter((provider) => provider.activate));
    setSelectedProviders(defaultSelectedProviders);
    const defaultProviders = Object.keys(defaultSelectedProviders).filter(
      (key: string) => defaultSelectedProviders[key],
    );

    if (!defaultProviders.length) {
      setSelectButtonInfo({
        title: formatMessage({ id: 'providerSelector.selectAll', defaultMessage: 'Select All' }),
        state: SELECTION_STATES.selectAll,
      });
    } else if (defaultProviders.length === Object.keys(defaultSelectedProviders).length) {
      setSelectButtonInfo({
        title: formatMessage({ id: 'providerSelector.deselectAll', defaultMessage: 'Deselect All' }),
        state: SELECTION_STATES.deselectAll,
      });
    }
  }, [providersList, selectedProvidersByDefault, isNavigating, formatMessage]);

  const handleProviderSelection = (e: React.ChangeEvent<HTMLInputElement>, providerName: string) => {
    const newSelectedProviders = { ...selectedProviders, [providerName.toLowerCase()]: e.target.checked };

    setSelectedProviders(newSelectedProviders);
    const checkedProviders = Object.keys(newSelectedProviders).filter((key: string) => newSelectedProviders[key]);

    onFilter(checkedProviders);

    if (checkedProviders.length < Object.keys(newSelectedProviders).length) {
      setSelectButtonInfo({
        title: formatMessage({ id: 'providerSelector.selectAll', defaultMessage: 'Select All' }),
        state: SELECTION_STATES.selectAll,
      });
    }
  };

  const setCheck = (providerItem: any) => {
    if (selectedProvidersByDefault) {
      return selectedProvidersByDefault.includes(providerItem.name.toLowerCase());
    }

    return !!selectedProviders[providerItem.name.toLowerCase()];
  };

  const handleSelectionAll = () => {
    const newSelectedProviders = { ...selectedProviders };

    if (selectButtonInfo.state === SELECTION_STATES.deselectAll) {
      Object.keys(newSelectedProviders).forEach((providerKey) => {
        newSelectedProviders[providerKey] = false;
      });

      setSelectButtonInfo({
        title: formatMessage({ id: 'providerSelector.selectAll', defaultMessage: 'Select All' }),
        state: SELECTION_STATES.selectAll,
      });
    } else {
      Object.keys(newSelectedProviders).forEach((providerKey) => {
        newSelectedProviders[providerKey] = true;
      });
      setSelectButtonInfo({
        title: formatMessage({ id: 'providerSelector.deselectAll', defaultMessage: 'Deselect All' }),
        state: SELECTION_STATES.deselectAll,
      });
    }
    setSelectedProviders(newSelectedProviders);
    onFilter(Object.keys(newSelectedProviders).filter((key: string) => newSelectedProviders[key]));
  };

  return (
    <Dropdown
      contentPosition="left"
      toggleOnSelection={false}
      zIndex={2}
      fullWidth={fullWidth}
      onToggle={onToggle}
      isOpenByDefault={isOpen}
      toggleOnClickOutside={toggleOnClickOutside}
      content={
        <DropdownMenu width="100%">
          <ProviderContainer flexDirection="column">
            <StyledButton
              size={ButtonSize.Small}
              color={ButtonColor.Tertiary}
              variant={ButtonVariant.Outlined}
              onClick={handleSelectionAll}
            >
              {selectButtonInfo.title}
            </StyledButton>
            {activeProvidersList?.map((providerItem) => (
              <StyledDropdownItem key={providerItem.id} data-testid="provider-item">
                <Checkbox
                  checked={setCheck(providerItem)}
                  onChange={(e) => handleProviderSelection(e, providerItem.name)}
                >
                  {providerItem.name}
                </Checkbox>
              </StyledDropdownItem>
            ))}
          </ProviderContainer>
        </DropdownMenu>
      }
    >
      <StyledDropdownContainer displayArrow data-testid="dropdown-container" fullWidth={fullWidth}>
        <FormattedMessage id="carousel.providers" defaultMessage="Providers" />
      </StyledDropdownContainer>
    </Dropdown>
  );
};
