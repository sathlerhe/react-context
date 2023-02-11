import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "common/context/User";
import { CartProvider } from "common/context/Cart";
import { PaymentProvider } from "common/context/Payment";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          
          <PaymentProvider>
            <CartProvider>
              <Route path="/feira">
                <Feira />
              </Route>

              <Route path="/carrinho">
                <Carrinho />
              </Route>
            </CartProvider>
          </PaymentProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
