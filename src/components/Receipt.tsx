import type { Service } from "@/types/service"
import { useI18n } from "./I18nProvider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReceiptProps {
  transactionId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  cart: Service[]
  total: number
  onComplete: () => void
}

export default function Receipt({
  transactionId,
  customerName,
  customerEmail,
  customerPhone,
  cart,
  total,
  onComplete,
}: ReceiptProps) {
  const { t } = useI18n()

  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>{t("receipt.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b border-gray-700 pb-4">
          <p className="text-sm text-gray-400">
            {t("receipt.transactionId")}: <span className="font-medium text-gray-200">{transactionId}</span>
          </p>
          <p className="text-sm text-gray-400">
            {t("receipt.date")}: <span className="font-medium text-gray-200">{new Date().toLocaleString()}</span>
          </p>
        </div>
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-lg font-medium mb-2 text-indigo-400">{t("receipt.customerInfo")}</h3>
          <p className="text-sm text-gray-400">
            {t("checkout.name")}: <span className="font-medium text-gray-200">{customerName}</span>
          </p>
          <p className="text-sm text-gray-400">
            {t("checkout.email")}: <span className="font-medium text-gray-200">{customerEmail}</span>
          </p>
          <p className="text-sm text-gray-400">
            {t("checkout.phone")}: <span className="font-medium text-gray-200">{customerPhone}</span>
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2 text-indigo-400">{t("receipt.orderDetails")}</h3>
          <div className="space-y-2">
            {cart.map((service, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-400">{service.name}</span>
                <span className="font-medium text-gray-200">${service.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
              <span className="font-bold text-gray-200">{t("cart.total")}:</span>
              <span className="font-bold text-indigo-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onComplete} className="w-full">
          {t("checkout.return")}
        </Button>
      </CardFooter>
    </Card>
  )
}

