"use client";

import { useState } from "react";
import type { Service } from "@/types/service";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Receipt from "./Receipt";
import { useI18n } from "./I18nProvider";

interface CheckoutProps {
  cart: Service[];
  onComplete: () => void;
}

export default function Checkout({ cart, onComplete }: CheckoutProps) {
  const { t } = useI18n();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const total = cart.reduce((sum, service) => sum + service.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate a mock transaction ID
    const mockTransactionId = Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase();
    setTransactionId(mockTransactionId);

    setIsProcessing(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <Receipt
        transactionId={transactionId}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        cart={cart}
        total={total}
        onComplete={onComplete}
      />
    );
  }

  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>{t("checkout.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("checkout.name")}</Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("checkout.email")}</Label>
            <Input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("checkout.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={
                isProcessing ||
                !customerName ||
                !customerEmail ||
                !customerPhone
              }
            >
              {isProcessing ? t("checkout.processing") : t("checkout.complete")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? t("checkout.processing") : t("checkout.complete")}
        </Button>
      </CardFooter>
    </Card>
  );
}
