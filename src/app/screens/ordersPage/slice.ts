import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";


const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],
};

const ordersPageSlice = createSlice({
    name: "ordersPage", // slice nomi
    initialState,  // yuqoridagi initialState ni beryabmiz
    reducers: {
        setPausedOrders: (state, action) => {
            state.pausedOrders = action.payload;
        },
        setProcessOrders: (state, action) => {
            state.processOrders = action.payload;
        },
        setFinishedOrders: (state, action) => {
            state.finishedOrders = action.payload;
        },
    },
});

{/**  actionni export qilinyabdi */}
export const { setPausedOrders, setProcessOrders, setFinishedOrders } = ordersPageSlice.actions;


{/**  sliceni export qilinyabdi */}
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;