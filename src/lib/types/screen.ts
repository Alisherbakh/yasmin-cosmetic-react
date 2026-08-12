import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";


/** React APP STATE (butun app da ishlatiladigan malumotlarni type integratsiyasi)**/
/**two ways type integration: screen component based vs target oriented */
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
}
     /** HOMEPAGE */
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCT PAGE */
export interface ProductsPageState {
    store: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}
/** ORDER PAGE */

export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}