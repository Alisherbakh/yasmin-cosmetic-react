import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Testimonials from "./Testimonials";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

/** REDUX SLICE define process */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[])=> dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[])=> dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[])=> dispatch(setTopUsers(data))
});


export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch()); //calling Slice: Data => Store
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Backend server data request => Data
    const product = new ProductService();
    const popularRequest = product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
    })
    .then((data) => setPopularDishes(data))
    .catch((err) => console.log(err));

    const newRequest = product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
    })
    .then((data) => setNewDishes(data))
    .catch((err) => console.log(err));

    Promise.all([popularRequest, newRequest]).then(() => setProductsLoading(false));

     const member = new MemberService();
     member
     .getTopUsers()
     .then((data) => setTopUsers(data))
     .catch((err) => console.log(err));
   
  },[]);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes loading={productsLoading} />
      <NewDishes loading={productsLoading} />
      <Advertisement />
      <ActiveUsers />
      <Testimonials />
    </div>
  );
}
