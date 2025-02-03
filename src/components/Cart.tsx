import type { Service } from "@/types/service"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useI18n } from "./I18nProvider"

interface CartProps {
  cart: Service[]
  removeFromCart: (index: number) => void
  proceedToCheckout: () => void
}

export default function Cart({ cart, removeFromCart, proceedToCheckout }: CartProps) {
  const { t } = useI18n()
  const total = cart.reduce((sum, service) => sum + service.price, 0)

  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>{t("cart.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p className="text-gray-400">{t("cart.empty")}</p>
        ) : (
          <div className="space-y-4">
            {cart.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{service.name}</span>
                <div className="flex items-center">
                  <span className="font-medium mr-4 text-indigo-400">${service.price.toFixed(2)}</span>
                  <Button variant="destructive" size="icon" onClick={() => removeFromCart(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {cart.length > 0 && (
        <CardFooter className="flex-col">
          <div className="flex justify-between w-full mb-4">
            <span className="font-bold text-lg">{t("cart.total")}:</span>
            <span className="font-bold text-xl text-indigo-400">${total.toFixed(2)}</span>
          </div>
          <Button onClick={proceedToCheckout} className="w-full">
            {t("cart.proceedToCheckout")}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

