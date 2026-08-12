import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectHomePage = (state: AppRootState) => state.homePage;
{/** screen folderdagi AppRootState dan homepage ni belgila va uni selectHomepage deb olyabmiz */}


{/**  Homepage dan popularDishes ni belgila */}
export const retrievePopularDishes = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.popularDishes
);

{/**  Homepage dan newDishes ni belgila */}
export const retrieveNewDishes = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.newDishes
);

{/**  Homepage dan topUsersni  ni belgila */}
export const retrieveTopUsers = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.topUsers
);