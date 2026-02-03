import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import productService from "@/api/productService";
import { useCreateOrder } from "@/hooks/useOrders";
import { formatCurrency } from "@/utils/formatters";

const OrderForm = ({ onSuccess, onCancel }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [dealerNotes, setDealerNotes] = useState("");

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const createOrder = useCreateOrder();

  const products = productsData?.results || productsData || [];
  const availableProducts = products.filter((p) => p.is_available);

  const addItem = () => {
    setOrderItems([
      ...orderItems,
      {
        product_id: "",
        product_name: "",
        quantity: 1,
        unit_price: 0,
        subtotal: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;

    // If product changed, update price
    if (field === "product_id") {
      const product = products.find((p) => p.id === value);
      if (product) {
        newItems[index].product_name = product.name;
        newItems[index].unit_price = product.dealer_price;
        newItems[index].subtotal =
          product.dealer_price * newItems[index].quantity;
      }
    }

    // If quantity changed, recalculate subtotal
    if (field === "quantity") {
      newItems[index].subtotal = newItems[index].unit_price * value;
    }

    setOrderItems(newItems);
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + (item.subtotal || 0),
    0,
  );
  const taxRate = 18; // GST
  const taxAmount = (totalAmount * taxRate) / 100;
  const grandTotal = totalAmount + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const invalidItems = orderItems.filter(
      (item) => !item.product_id || item.quantity <= 0,
    );
    if (invalidItems.length > 0) {
      alert("Please fill in all item details correctly");
      return;
    }

    const orderData = {
      items: orderItems,
      dealer_notes: dealerNotes,
    };

    try {
      await createOrder.mutateAsync(orderData);
      onSuccess();
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  if (productsLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Order Items</h3>
          <Button type="button" onClick={addItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {orderItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No items added yet</p>
              <Button
                type="button"
                onClick={addItem}
                variant="outline"
                className="mt-4"
              >
                Add First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Product Select */}
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Product *
                        </label>
                        <select
                          value={item.product_id}
                          onChange={(e) =>
                            updateItem(index, "product_id", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Select product...</option>
                          {availableProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} -{" "}
                              {formatCurrency(product.dealer_price)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      {/* Subtotal */}
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Subtotal
                        </label>
                        <div className="px-3 py-2 font-semibold rounded-md bg-gray-50 text-primary-600">
                          {formatCurrency(item.subtotal)}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {orderItems.length > 0 && (
        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST ({taxRate}%):</span>
                <span className="font-semibold">
                  {formatCurrency(taxAmount)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Notes for Admin
        </label>
        <textarea
          value={dealerNotes}
          onChange={(e) => setDealerNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
          placeholder="Add any special instructions or notes..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createOrder.isPending || orderItems.length === 0}
        >
          {createOrder.isPending ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating Order...
            </>
          ) : (
            "Create Order"
          )}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
