import { IconHeart } from '@/core/shared/Icons';
import {
  useDeleteFavoriteMachineViewMutation,
  useGetFavoriteMachinesViewQuery,
  usePostFavoriteMachineViewMutation,
} from '@/core/domains/machineView';
import { DATA_TEST_IDS } from '@/core/constants/constants';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { setLoginRegisterModalActiveTab, toggleLoginRegisterModal } from '@/core/store/metaSlice';
import { useAppDispatch } from '@/core/store/store';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

import { StyledButton } from '../GameFooter.styles';

interface FavoriteButtonProps {
  machineViewId?: string;
  customColor?: string;
}

export const FavoriteButton = ({ machineViewId, customColor }: FavoriteButtonProps) => {
  const { data: favorites, refetch: refetchFavorite } = useGetFavoriteMachinesViewQuery();
  const [mutate] = usePostFavoriteMachineViewMutation();
  const [deleteFavoriteAssignation] = useDeleteFavoriteMachineViewMutation();
  const isLogged = useIsLogged();
  const dispatch = useAppDispatch();

  const assignation = favorites?.find(({ subjectId }) => subjectId === machineViewId);
  const isFavorite = !!assignation; // if there is an assignation it means that the machine is favorite
  const color = isFavorite && isLogged ? '#FE251B' : undefined;

  const toggleFavorite = async () => {
    if (!isLogged) {
      dispatch(toggleLoginRegisterModal());
      dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));

      return;
    }

    if (!machineViewId) {
      return;
    }

    if (!isFavorite) {
      await mutate(machineViewId).unwrap();
    } else {
      await deleteFavoriteAssignation(assignation?.id).unwrap();
    }

    refetchFavorite();
  };

  return (
    <StyledButton
      onClick={toggleFavorite}
      data-testid={isFavorite ? DATA_TEST_IDS.REMOVE_FAVORITE_BTN : DATA_TEST_IDS.ADD_FAVORITE_BTN}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <IconHeart
        size="m"
        color={customColor || '#FE251B'}
        fillColor={color}
        data-testid={DATA_TEST_IDS.ADD_FAVORITE_ICON}
      />
    </StyledButton>
  );
};
