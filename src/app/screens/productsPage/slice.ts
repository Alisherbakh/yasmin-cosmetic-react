import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
    store: null,
    chosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setStore, setChosenProduct, setProducts} =
productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;