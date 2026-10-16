import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';
import { selectPlayIn } from '@/core/store/metaSlice';
import { RootState } from '@/core/store/store';

import * as api from './api';
import * as t from './types';

export type PlayPayloadSlice = Omit<t.PostPlayMachineViewPayload, 'display'>;

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachineView: builder.query({
      queryFn: ({ slug = '' }: t.GetMachineViewSliceParams) => wrapSlicePromise(api.getMachineView({ slug })),
    }),
    getMachinesViews: builder.query({
      queryFn: () => wrapSlicePromise(api.getMachinesViews()),
    }),
    searchMachinesViews: builder.query({
      queryFn: (searchTerm: string) => wrapSlicePromise(api.searchMachinesViews({ term: searchTerm })),
    }),
    getFavoriteMachinesView: builder.query({
      queryFn: (_: void) => wrapSlicePromise(api.getFavoritesMachineView()),
    }),
    play: builder.mutation({
      queryFn: (payload: PlayPayloadSlice, store) => {
        const appState: RootState = store.getState();
        const playIn = selectPlayIn(appState);

        return wrapSlicePromise(api.play({ ...payload, display: playIn }));
      },
    }),
    postFavoriteMachineView: builder.mutation({
      queryFn: (machineViewId: string) => wrapSlicePromise(api.postFavoriteMachineView(machineViewId)),
    }),
    deleteFavoriteMachineView: builder.mutation({
      queryFn: (assignationId: string) => wrapSlicePromise(api.deleteFavoriteMachineView(assignationId)),
    }),
  }),
});

export const {
  useGetMachineViewQuery,
  useGetMachinesViewsQuery,
  usePlayMutation,
  useSearchMachinesViewsQuery,
  useGetFavoriteMachinesViewQuery,
  usePostFavoriteMachineViewMutation,
  useDeleteFavoriteMachineViewMutation,
} = extendedApi;

export const { getMachineView, getMachinesViews, searchMachinesViews } = extendedApi.endpoints;

const initialState: t.MachineViewState = {
  inGame: false,
  mode: null,
};

export const machineViewSlice = createSlice({
  name: 'machineView',
  initialState,
  reducers: {
    setInGame(state, action: PayloadAction<boolean>) {
      state.inGame = action.payload;
    },
    setGameMode(state, action: PayloadAction<t.GameMode>) {
      state.mode = action.payload;
    },
    resetGame(state) {
      state.mode = initialState.mode;
      state.inGame = initialState.inGame;
    },
  },
});

export const { setInGame, resetGame, setGameMode } = machineViewSlice.actions;

const gamesSelector = (state: RootState): t.MachineViewState => state.machineView;

export const selectInGame = createSelector(gamesSelector, (state) => state.inGame);
export const selectGameMode = createSelector(gamesSelector, (state) => state.mode);

export default machineViewSlice.reducer;
