"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Receipt from "./Receipt"

interface CustomerDetails {
  name: string
  email: string
  phone: string
  address: string
}

export default function CheckoutForm() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [transactionId, setTransactionId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a mock transaction ID
    const mockTransactionId = Math.random().toString(36).substr(2, 9).toUpperCase()
    setTransactionId(mockTransactionId)

    setIsProcessing(false)
    setShowReceipt(true)
  }

  const handleComplete = () => {
    clearCart()
    router.push("/")
  }

  if (showReceipt) {
    return (
      <Receipt
        transactionId={transactionId}
        customerDetails={customerDetails}
        items={items}
        total={total}
        onComplete={handleComplete}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isProcessing} onClick={handleSubmit}>
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

