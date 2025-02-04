"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ProductData {
  quantity: number;
  price: number;
  total: number;
  profit: number;
}

export default function ProductForm() {
  const [data, setData] = useState<ProductData>({
    quantity: 0,
    price: 0,
    total: 0,
    profit: 0,
  });
  const [isApiData, setIsApiData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReset, setIsReset] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products/latest");
      const apiData = await response.json();
      setData(apiData);
      setIsApiData(true);
      setIsReset(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotal = (quantity: number, price: number, profit: number) => {
    return quantity * price * (1 + profit / 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number.parseFloat(value) || 0;

    setData((prev) => {
      const newData = { ...prev, [name]: numValue };

      // Only calculate total if form has been reset and user is inputting new values
      if (isReset) {
        if (name === "quantity" || name === "price" || name === "profit") {
          newData.total = calculateTotal(
            name === "quantity" ? numValue : prev.quantity,
            name === "price" ? numValue : prev.price,
            name === "profit" ? numValue : prev.profit
          );
        }
      }

      return newData;
    });
    setIsApiData(false);
  };

  const resetForm = () => {
    // Clear the form with zeros instead of fetching
    setData({
      quantity: 0,
      price: 0,
      total: 0,
      profit: 0,
    });
    setIsApiData(false);
    setIsReset(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Product Details</CardTitle>
        <CardDescription>
          {isReset
            ? "Enter your values - Total will be calculated automatically"
            : "Enter product information or load from API"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={data.quantity.toString()}
                  onChange={handleInputChange}
                  className="w-full"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={data.price.toString()}
                  onChange={handleInputChange}
                  className="w-full"
                />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profit">Profit (%)</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="profit"
                name="profit"
                type="number"
                value={data.profit.toString()}
                onChange={handleInputChange}
                className="w-full"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="total">Total</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="total"
                name="total"
                type="number"
                value={data.total.toString()}
                className="w-full"
                readOnly
              />
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          {isApiData ? (
            <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
          ) : (
            <AlertCircle className="h-4 w-4 text-green-600 mr-2" />
          )}
          <p
            className={`text-sm ${
              isApiData ? "text-blue-600" : "text-green-600"
            }`}
          >
            {isApiData ? "API Data" : "User Modified"}
          </p>
        </div>
        <Button onClick={resetForm} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
