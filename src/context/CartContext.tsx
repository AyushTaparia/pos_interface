"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Service } from "@/types/service"

interface CartItem extends Service {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (service: Service, quantity: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (service: Service, quantity: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === service.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...currentItems, { ...service, quantity }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

