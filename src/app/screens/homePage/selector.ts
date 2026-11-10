import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectHomePage = (state: AppRootState) => state.homePage;
{/** screen folderdagi AppRootState dan homepage ni belgila va uni selectHomepage deb olyabmiz */}


{/**  Homepage dan popularProducts ni belgila */}
export const retrievePopularProducts = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.popularProducts
);

{/**  Homepage dan newProducts ni belgila */}
export const retrieveNewProducts = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.newProducts
);

{/**  Homepage dan topUsersni  ni belgila */}
export const retrieveTopUsers = createSelector(
    selectHomePage, 
    (HomePage) => HomePage.topUsers
);