import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector  } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts} from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE define process */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[])=> dispatch(setProducts(data)), 
});

/** REDUX SELECTOR define process */
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
};


export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch()); // slice call
  const { products } = useSelector(productsRetriever); // selector call
  // request to backend
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
     page:1,
      limit:8,
      order: "createdAt",
      productCollection: ProductCollection.SKINCARE,
      search: "",
  });
  const [searchText, setSearchText] = useState<string>(""); // search text based
  const history = useHistory();  
  // brauzerning navigatsiya tarixini boshqarish,sahifadan sahifaga dasturiy yo'l bilan o'tish mumkin.
  
  
  useEffect(() => {
    // componentDidMount
    const product = new ProductService();
    product
    .getProducts(productSearch)
    .then((data) => setProducts(data)) // callback
    .catch((err) => console.log(err)); // callback
  }, [productSearch]);

  // search text ni boshatish
  useEffect(() => {
    if (searchText === ""){
      productSearch.search = "";
      setProductSearch({ ...productSearch});
    }
  }, [searchText]);

  /** HANDLER */
  // food category handler dish,drink,other
  const searchCollectionHandler = (collection: ProductCollection) => {
   productSearch.page = 1;
   productSearch.productCollection = collection;
   setProductSearch({ ...productSearch});
  };
  // new, price, views
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
   productSearch.order = order;
   setProductSearch({ ...productSearch});
  }
  // search product text based
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch});

  };
  // pagination changes
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch});
  };

  const chooseDishHandler = (id: string) => {
       history.push(`/products/${id}`);
  };


  const categories = [
    { label: "Skincare", value: ProductCollection.SKINCARE },
    { label: "Makeup", value: ProductCollection.MAKEUP },
    { label: "Body care", value: ProductCollection.BODY_CARE },
    { label: "Fragrance", value: ProductCollection.FRAGRANCE },
    { label: "Other", value: ProductCollection.OTHER },
  ];

  const sortOptions = [
    { label: "Newest", value: "createdAt" },
    { label: "Price", value: "productPrice" },
    { label: "Most viewed", value: "productViews" },
  ];

  return (
    <div className={"products"}>
      <div className={"products-head"}>
        <Container>
          <div className={"page-tag"}>Shop all</div>
          <h1 className={"page-title"}>Our products</h1>
          <Stack className={"search-row"} flexDirection={"row"}>
            <input
              type={"search"}
              className={"search-input"}
              name={"singleResearch"}
              placeholder={"Search for serums, lipstick, gift sets..."}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchProductHandler();
              }}
            />
            <Button className={"search-btn"} onClick={searchProductHandler}>
              Search
            </Button>
          </Stack>
        </Container>
      </div>

      <Container>
        <Stack className={"filter-bar"} flexDirection={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
          <Stack className={"cat-pills"} flexDirection={"row"} flexWrap={"wrap"}>
            {categories.map((cat) => (
              <span
                key={cat.value}
                className={`pill ${productSearch.productCollection === cat.value ? "active" : ""}`}
                onClick={() => searchCollectionHandler(cat.value)}
              >
                {cat.label}
              </span>
            ))}
          </Stack>
          <Stack className={"sort-pills"} flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
            <span className={"sort-label"}>Sort by</span>
            {sortOptions.map((opt) => (
              <span
                key={opt.value}
                className={`sort-pill ${productSearch.order === opt.value ? "active" : ""}`}
                onClick={() => searchOrderHandler(opt.value)}
              >
                {opt.label}
              </span>
            ))}
          </Stack>
        </Stack>

        <Stack className={"grid4"}>
          {products.length !== 0 ? (
            products.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              return (
                <Box
                  key={product._id}
                  className={"pcard"}
                  onClick={() => chooseDishHandler(product._id)}
                >
                  <Box className={"pcard-img"}>
                    <img src={imagePath} alt={product.productName} />
                    <span className={"pcard-chip"}>{product.productCollection}</span>
                    <span
                      className={"pcard-fav"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 15 }} />
                    </span>
                    <button
                      className={"pcard-cart-btn"}
                      onClick={(e) => {
                        onAdd({
                          _id: product._id,
                          quantity: 1,
                          name: product.productName,
                          price: product.productPrice,
                          image: product.productImages[0],
                        });
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: 16 }} />
                    </button>
                  </Box>
                  <Box className={"pcard-body"}>
                    <div className={"pcard-cat"}>
                      {product.productCollection} · {product.productVolume}
                    </div>
                    <div className={"pcard-name"}>{product.productName}</div>
                    <div className={"pcard-desc"}>
                      {product.productDesc ? product.productDesc : "No description"}
                    </div>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} className={"pcard-row"}>
                      <span className={"pcard-price"}>${product.productPrice}</span>
                      <span className={"pcard-views"}>
                        <VisibilityOutlinedIcon sx={{ fontSize: 14 }} /> {product.productViews}
                      </span>
                    </Stack>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box className="no-data">Products are not available!</Box>
          )}
        </Stack>

        <Stack className={"pagination-section"}>
          <Pagination
            count={products.length !== 0
              ? productSearch.page + 1
              : productSearch.page}
            page={productSearch.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"secondary"}
              />
            )}
            onChange={paginationHandler}
          />
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <div className={"tag"}>As seen in</div>
          <Box className={"category-title"}>Our family brands</Box>
          <Stack className={"brand-row"} flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <Box className={"brand-cell"}>
              <img src={"/img/brands/cosrx.png"} alt={"COSRX"} />
            </Box>
            <Box className={"brand-cell"}>
              <img src={"/img/brands/laneige.png"} alt={"Laneige"} />
            </Box>
            <Box className={"brand-cell"}>
              <img src={"/img/brands/innisfree.png"} alt={"innisfree"} />
            </Box>
            <Box className={"brand-cell"}>
              <img src={"/img/brands/sulwhasoo.png"} alt={"Sulwhasoo"} />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-grid"} flexDirection={"row"}>
            <Box className={"address-info-card"}>
              <div className={"tag"}>Our address</div>
              <Box className={"title"}>Visit our store</Box>
              <p className={"address-lead"}>
                Stop by to try our full range in person and get skincare advice from our team.
              </p>
              <Stack className={"address-row"} flexDirection={"row"}>
                <span className={"address-ico"}>&#128205;</span>
                <Box>
                  <div className={"address-label"}>Location</div>
                  <div className={"address-value"}>Downtown, Tashkent</div>
                </Box>
              </Stack>
              <Stack className={"address-row"} flexDirection={"row"}>
                <span className={"address-ico"}>&#128222;</span>
                <Box>
                  <div className={"address-label"}>Phone</div>
                  <div className={"address-value"}>+998 90 123 4567</div>
                </Box>
              </Stack>
              <Stack className={"address-row"} flexDirection={"row"}>
                <span className={"address-ico"}>&#128337;</span>
                <Box>
                  <div className={"address-label"}>Hours</div>
                  <div className={"address-value"}>Mon – Sat, 9am – 8pm</div>
                </Box>
              </Stack>
              <Button
                className={"directions-btn"}
                variant={"contained"}
                href={"https://www.google.com/maps"}
                target={"_blank"}
                rel={"noreferrer"}
              >
                Get directions
              </Button>
            </Box>
            <Box className={"address-map-box"}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96326.03685561026!2d28.92022666528895!3d41.02112846139867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab82bea99445f%3A0x6ed7f4baceb4476c!2sMaiden&#39;s%20Tower!5e0!3m2!1sen!2skr!4v1757106097524!5m2!1sen!2skr"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
