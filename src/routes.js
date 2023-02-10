import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "common/context/User";
import { CartProvider } from "common/context/Cart";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <CartProvider>
            <Route path="/feira">
              <Feira />
            </Route>
          </CartProvider>
        </UserProvider>

        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
