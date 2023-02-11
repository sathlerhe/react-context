import { createContext, useContext, useState, useEffect } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantityOfProducts, setQuantityOfProducts] = useState(0);
  const [totalValueOfProducts, setTotalValueOfProducts] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        quantityOfProducts,
        setQuantityOfProducts,
        totalValueOfProducts,
        setTotalValueOfProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const {
    cart,
    setCart,
    quantityOfProducts,
    setQuantityOfProducts,
    totalValueOfProducts,
    setTotalValueOfProducts,
  } = useContext(CartContext);
  const { paymentForm } = usePaymentContext();
  const { setBalance } = useContext(UserContext);

  const changeQuantity = (id, quantity) => {
    return cart.map((cartItem) => {
      if (cartItem.id === id) cartItem.quantidade += quantity;

      return cartItem;
    });
  };

  const addProduct = (newProduct) => {
    const hasTheProduct = cart.some(
      (cartItem) => cartItem.id === newProduct.id
    );

    if (!hasTheProduct) {
      newProduct.quantidade = 1;
      return setCart((prev) => [...prev, newProduct]);
    }

    setCart(changeQuantity(newProduct.id, 1));
  };

  const removeProduct = (id) => {
    const hasTheProduct = cart.some((cartItem) => cartItem.id === id);

    if (!hasTheProduct) {
      return;
    }

    const productInCart = cart.find((cartItem) => cartItem.id === id);
    if (productInCart.quantidade > 1) {
      return setCart(changeQuantity(id, -1));
    }

    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const handleBuy = () => {
    setBalance((prev) => prev - totalValueOfProducts);
    setCart([]);
  };

  useEffect(() => {
    let count = 0;
    let value = 0;
    for (let i = 0; i < cart.length; i++) {
      count += cart[i].quantidade;

      value = value + cart[i].valor * cart[i].quantidade;
    }

    setTotalValueOfProducts(value * paymentForm.tax);
    setQuantityOfProducts(count);
  }, [cart, setQuantityOfProducts, setTotalValueOfProducts, paymentForm]);

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    quantityOfProducts,
    setQuantityOfProducts,
    totalValueOfProducts,
    handleBuy
  };
};
