import { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "Payment";

export const PaymentProvider = ({ children }) => {
  const paymentTypes = [
    {
      name: "Boleto",
      tax: 1,
      id: 1,
    },
    {
      name: "Cartão de crédito",
      tax: 1.3,
      id: 2,
    },
    {
      name: "Pix",
      tax: 1,
      id: 3,
    },
    {
      name: "Crediário",
      tax: 1.5,
      id: 4,
    },
  ];

  const [paymentForm, setPaymentForm] = useState(paymentTypes[0]);

  return (
    <PaymentContext.Provider
      value={{ paymentTypes, paymentForm, setPaymentForm }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const { paymentTypes, paymentForm, setPaymentForm } =
    useContext(PaymentContext);

  const changePaymentForm = (id) => {
    const actualPayment = paymentTypes.find((payment) => payment.id === id);

    setPaymentForm(actualPayment);
  };

  return { paymentTypes, paymentForm, changePaymentForm };
};
