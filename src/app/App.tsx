import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import  HomePage  from "./screens/homePage";
import  ProductsPage  from "./screens/productsPage";
import  OrdersPage  from "./screens/ordersPage";
import  UserPage  from "./screens/userPage";
import  HomeNavbar  from "./components/headers/HomeNavbar";
import  OtherNavbar  from "./components/headers/OtherNavbar";
import  Footer  from "./components/footer"; 
import  HelpPage  from "./screens/helpPage"; 
import useBasket from "./hooks/useBasket";
import "../css/app.css"; 
import "../css/navbar.css";
import "../css/footer.css";
import AuthenticationModal from "./components/auth";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";


function App() {
  
    const location = useLocation();
    const history = useHistory();
    const {setAuthMember} = useGlobals();
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
    const [signupOpen, setSignupOpen] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // start every new page from the top
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    /** HANDLERS **/
    
    const handleSignupClose = () => setSignupOpen(false);
    const handleLoginClose = () => setLoginOpen(false);
    const switchToLogin = () => {
      setSignupOpen(false);
      setLoginOpen(true);
    };
    const switchToSignup = () => {
      setLoginOpen(false);
      setSignupOpen(true);
    };

    const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const handleCloseLogout = () => setAnchorEl(null);
    const handleLogoutRequest = async () => {
      try{
        const member = new MemberService();
        await member.logout();

        await sweetTopSuccessAlert("success", 700);
        setAuthMember(null);
        setAnchorEl(null);
        history.push("/");
      } catch (err){
        console.log(err);
        sweetErrorHandling(Messages.error1);
      }
    };

  return (
    <div className={"app-shell"}>
  {location.pathname === "/" ? (<HomeNavbar
  cartItems=
  {cartItems} 
  onAdd={onAdd} 
  onRemove={onRemove} 
  onDelete={onDelete} 
  onDeleteAll= {onDeleteAll}
  setSignupOpen={setSignupOpen}
  setLoginOpen={setLoginOpen}
  anchorEl={anchorEl}
  handleLogoutClick={handleLogoutClick}
  handleCloseLogout={handleCloseLogout}
  handleLogoutRequest={handleLogoutRequest}
  /> 
    ): (
    <OtherNavbar 
    cartItems={cartItems} 
    onAdd={onAdd} 
    onRemove={onRemove} 
    onDelete={onDelete} 
    onDeleteAll= {onDeleteAll}
    setSignupOpen={setSignupOpen}
    setLoginOpen={setLoginOpen}
    anchorEl={anchorEl}
    handleLogoutClick={handleLogoutClick}
    handleCloseLogout={handleCloseLogout}
    handleLogoutRequest={handleLogoutRequest}
    /> )}
        <main className={"app-body"}>
        <Switch>
          <Route path="/products">
            <ProductsPage onAdd={onAdd} />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
           <Route path="/help">
            <HelpPage/>
          </Route>
          <Route path="/">
           <HomePage /> 
            {/* home har doim oxirida yaziladi sabab hammasida slash(/) borligi u-ch */}
          </Route>
        </Switch>
        </main>
        <Footer />

        <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
        switchToLogin={switchToLogin}
        switchToSignup={switchToSignup}
        />
      </div>
  );
};





export default App;





