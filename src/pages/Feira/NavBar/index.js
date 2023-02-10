import { Nav } from "./styles";
import { ReactComponent as Logo } from "assets/logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useCartContext } from "common/context/Cart";

export default function NavBar() {
  const { quantityOfProducts } = useCartContext();

  return (
    <Nav>
      <Logo />
      <IconButton>
        <Badge color="primary">
          <ShoppingCartIcon />
          {quantityOfProducts}
        </Badge>
      </IconButton>
    </Nav>
  );
}
