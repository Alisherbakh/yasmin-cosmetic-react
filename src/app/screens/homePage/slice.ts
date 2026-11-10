import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
    popularProducts: [],
    newProducts: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage", // slice nomi
    initialState,  // yuqoridagi initialState ni beryabmiz
    reducers: {
        setPopularProducts: (state, action) => {
            state.popularProducts = action.payload;
        },
        setNewProducts: (state, action) => {
            state.newProducts = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

{/**  actionni export qilinyabdi */}
export const { setPopularProducts, setNewProducts, setTopUsers } = homePageSlice.actions;


{/**  sliceni export qilinyabdi */}
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;