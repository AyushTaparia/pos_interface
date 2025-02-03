"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push("/checkout");
    }
  };

  console.log(items);

  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-900 flex justify-center py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-16">
            <Image
              src="/images/empty-cart.png"
              alt="Empty cart"
              width={200}
              height={200}
            />
            <p className="text-gray-500 text-lg">
              Your cart is empty. Start shopping now!
            </p>
            <Button asChild>
              <Link href="/">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Shopping Cart
                  </h1>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="py-6 flex flex-col sm:flex-row items-start sm:items-center"
                      >
                        <div className="flex-1 mb-4 sm:mb-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="w-24 text-right">
                            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Items {items.length}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Booking Time
                      </label>
                      <Select
                        value={bookingTime}
                        onValueChange={setBookingTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select booking time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">
                            Morning (9 AM - 12 PM)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (1 PM - 5 PM)
                          </SelectItem>
                          <SelectItem value="evening">
                            Evening (6 PM - 9 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="secondary" className="mt-2 w-full">
                        Apply
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-gray-100">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={!bookingTime}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
