import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage", // slice nomi
    initialState,  // yuqoridagi initialState ni beryabmiz
    reducers: {
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setNewDishes: (state, action) => {
            state.newDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

{/**  actionni export qilinyabdi */}
export const { setPopularDishes, setNewDishes, setTopUsers } = homePageSlice.actions;


{/**  sliceni export qilinyabdi */}
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;