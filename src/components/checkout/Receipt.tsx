import type { Service } from "@/types/service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"

interface CustomerDetails {
  name: string
  email: string
  phone: string
  address: string
}

interface ReceiptProps {
  transactionId: string
  customerDetails: CustomerDetails
  items: (Service & { quantity: number })[]
  total: number
  onComplete: () => void
}

export default function Receipt({ transactionId, customerDetails, items, total, onComplete }: ReceiptProps) {
  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <p className="text-gray-500 dark:text-gray-400">Your order has been confirmed</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                <p className="font-mono">{transactionId}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <div className="space-y-1 text-sm">
                  <p>{customerDetails.name}</p>
                  <p>{customerDetails.email}</p>
                  <p>{customerDetails.phone}</p>
                  <p>{customerDetails.address}</p>
                </div>
              </div>

              <div>
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
            </CardContent>
            <CardFooter>
              <Button onClick={onComplete} className="w-full">
                Return to Shop
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

