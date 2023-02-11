import {
  Button,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useCartContext } from "common/context/Cart";
import { usePaymentContext } from "common/context/Payment";
import Produto from "components/Produto";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Voltar,
  TotalContainer,
  PagamentoContainer,
} from "./styles";

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart } = useCartContext();
  const { paymentForm, paymentTypes, changePaymentForm } = usePaymentContext();
  const history = useHistory();

  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>Carrinho</h2>
      {cart.map((product) => (
        <Produto key={product.id} {...product} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={paymentForm.id}
          onChange={(e) => changePaymentForm(e.target.value)}
        >
          {paymentTypes.map((paymentType) => (
            <MenuItem key={paymentType.id} value={paymentType.id}>
              {paymentType.name}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ </span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ </span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ </span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Carrinho;
