"use client";

import { useRouter } from "next/navigation";
import ServiceList from "./ServiceList";
import { useI18n } from "./I18nProvider";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PosInterface() {
  const router = useRouter();
  const { t, language, setLanguage } = useI18n();
  const { itemCount } = useCart();

  const viewCart = () => {
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("app.title")}
          </h1>
          <div className="flex items-center gap-4">
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={viewCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        <ServiceList />
      </div>
    </div>
  );
}
