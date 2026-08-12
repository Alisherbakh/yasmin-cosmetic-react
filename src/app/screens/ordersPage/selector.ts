import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectOrdersPage = (state: AppRootState) => state.ordersPage;
{/** screen folderdagi AppRootState dan homepage ni belgila va uni selectHomepage deb olyabmiz */}


{/**  OrdersPage dan popularDishes ni belgila */}
export const retrievePausedOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.pausedOrders
);

{/**  OrdersPage dan newDishes ni belgila */}
export const retrieveProcessOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.processOrders
);

{/**  OrdersPage dan topUsersni  ni belgila */}
export const retrieveFinishedOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.finishedOrders
);