import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectOrdersPage = (state: AppRootState) => state.ordersPage;
{/** screen folderdagi AppRootState dan homepage ni belgila va uni selectHomepage deb olyabmiz */}


{/**  OrdersPage dan pausedOrders ni belgila */}
export const retrievePausedOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.pausedOrders
);

{/**  OrdersPage dan processOrders ni belgila */}
export const retrieveProcessOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.processOrders
);

{/**  OrdersPage dan finishedOrders ni belgila */}
export const retrieveFinishedOrders = createSelector(
    selectOrdersPage, 
    (OrdersPage) => OrdersPage.finishedOrders
);