"use client";

import { useState, useEffect } from "react";
import type { Service } from "@/types/service";
import { useI18n } from "./I18nProvider";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Clock, Users, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";

export default function ServiceList() {
  const { t } = useI18n();
  const { addToCart } = useCart();
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // In a real application, this would be an API call
    const mockServices: Service[] = [
      {
        id: 1,
        name: "Premium Fitness Session",
        price: 65,
        duration: "60 min",
        capacity: "1-on-1",
        description: "Personalized fitness session with expert trainer",
        quantity: 0,
      },
      {
        id: 2,
        name: "Group Yoga Class",
        price: 25,
        duration: "90 min",
        capacity: "Max 12",
        description: "Relaxing yoga session for all skill levels",
        quantity: 0,
      },
      {
        id: 3,
        name: "Wellness Consultation",
        price: 120,
        duration: "45 min",
        capacity: "1-on-1",
        description: "Comprehensive wellness and nutrition planning",
        quantity: 0,
      },
      {
        id: 4,
        name: "Personal Training",
        price: 85,
        duration: "60 min",
        capacity: "1-on-1",
        description: "Customized workout with certified trainer",
        quantity: 0,
      },
      {
        id: 5,
        name: "Group HIIT Class",
        price: 30,
        duration: "45 min",
        capacity: "Max 8",
        description: "High-intensity interval training session",
        quantity: 0,
      },
    ];
    setServices(mockServices);
    const initialQuantities = mockServices.reduce((acc, service) => {
      acc[service.id] = 1;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleAddToCart = (service: Service) => {
    const quantity = quantities[service.id] || 1;
    addToCart(service, quantity);
    toast.success(`Added ${quantity} ${service.name} to cart`);
    setQuantities((prev) => ({ ...prev, [service.id]: 1 }));
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder={t("serviceList.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {filteredServices.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No services found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col justify-between h-full border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg"
            >
              <CardHeader className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    ${service.price}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{service.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(service.id, -1)}
                      className="h-8 w-8 rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">
                      {quantities[service.id] || 0}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(service.id, 1)}
                      className="h-8 w-8 rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(service)}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t("serviceList.addToCart")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
