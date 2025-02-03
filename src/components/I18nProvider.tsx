"use client";

import { createContext, useState, useContext } from "react";
import type React from "react"; 

interface I18nContextValue {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");

  const translations: { [key: string]: { [key: string]: string } } = {
    en: {
      "app.title": "Service POS System",
      "cart.empty": "Your cart is empty",
      "cart.total": "Total",
      "checkout.title": "Checkout",
      "checkout.name": "Name",
      "checkout.email": "Email",
      "checkout.phone": "Phone",
      "checkout.complete": "Complete Purchase",
      "checkout.processing": "Processing...",
      "checkout.thankYou": "Thank You!",
      "checkout.success": "Your order has been processed successfully.",
      "checkout.return": "Return to Shop",
      "receipt.title": "Receipt",
      "receipt.transactionId": "Transaction ID",
      "receipt.date": "Date",
      "receipt.customerInfo": "Customer Information",
      "receipt.orderDetails": "Order Details",
      "checkout.orderSummary": "Order Summary",
      "serviceList.searchPlaceholder": "Search services...",
      "serviceList.addToCart": "Add to Cart",
      "cart.title": "Cart",
      "cart.remove": "Remove",
      "cart.proceedToCheckout": "Proceed to Checkout",
    },
    es: {
      "app.title": "Sistema POS de Servicios",
      "cart.empty": "Tu carrito está vacío",
      "cart.total": "Total",
      "checkout.title": "Pagar",
      "checkout.name": "Nombre",
      "checkout.email": "Correo electrónico",
      "checkout.phone": "Teléfono",
      "checkout.complete": "Completar Compra",
      "checkout.processing": "Procesando...",
      "checkout.thankYou": "¡Gracias!",
      "checkout.success": "Tu pedido ha sido procesado con éxito.",
      "checkout.return": "Volver a la Tienda",
      "receipt.title": "Recibo",
      "receipt.transactionId": "ID de Transacción",
      "receipt.date": "Fecha",
      "receipt.customerInfo": "Información del Cliente",
      "receipt.orderDetails": "Detalles del Pedido",
      "checkout.orderSummary": "Resumen del Pedido",
      "serviceList.searchPlaceholder": "Buscar servicios...",
      "serviceList.addToCart": "Añadir al Carrito",
      "cart.title": "Carrito",
      "cart.remove": "Eliminar",
      "cart.proceedToCheckout": "Proceder al Pago",
    },
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider
      value={{ language, setLanguage, t } as I18nContextValue}
    >
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
