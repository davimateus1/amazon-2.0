/* eslint-disable */
import { ProductProps } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketState {
  items: Array<ProductProps>;
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductProps>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (
      state,
      action: PayloadAction<{
        id: number;
      }>,
    ) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in basket!`);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectItems = (state: { basket: BasketState }) => state.basket.items;
export const selectTotal = (state: { basket: BasketState }) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
