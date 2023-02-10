import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();
CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantityOfProducts, setQuantityOfProducts] = useState(0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, quantityOfProducts, setQuantityOfProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const { cart, setCart, quantityOfProducts, setQuantityOfProducts } =
    useContext(CartContext);

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

  useEffect(() => {
    const countQuantityOfProducts = () => {
      let count = 0;
      for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantidade;
      }

      setQuantityOfProducts(count);
    };

    countQuantityOfProducts();
  }, [cart, setQuantityOfProducts]);

  return {
    cart,
    setCart,
    addProduct,
    removeProduct,
    quantityOfProducts,
    setQuantityOfProducts,
  };
};
