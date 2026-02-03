import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import FormField from "@/components/common/FormField";
import inventoryService from "@/api/inventoryService";
import { useCreateSale } from "@/hooks/useSales";
import { formatCurrency } from "@/utils/formatters";

const SaleForm = ({ onSuccess, onCancel }) => {
  const [customerType, setCustomerType] = useState("walk-in"); // 'walk-in' or 'registered'
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [saleItems, setSaleItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery({
    queryKey: ["dealer-inventory"],
    queryFn: inventoryService.getInventory,
  });

  const createSale = useCreateSale();

  const inventory = inventoryData?.inventory || [];
  const availableProducts = inventory.filter((item) => item.stock > 0);

  const addItem = () => {
    setSaleItems([
      ...saleItems,
      {
        product_id: "",
        product_name: "",
        quantity: 1,
        unit_price: 0,
        discount: 0,
        subtotal: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...saleItems];
    newItems[index][field] = value;

    if (field === "product_id") {
      const product = inventory.find((p) => p.product_id === value);
      if (product) {
        newItems[index].product_name = product.product_name;
        newItems[index].unit_price = product.dealer_price;
        newItems[index].subtotal =
          product.dealer_price * newItems[index].quantity -
          newItems[index].discount;
      }
    }

    if (field === "quantity" || field === "discount") {
      newItems[index].subtotal =
        newItems[index].unit_price * newItems[index].quantity -
        newItems[index].discount;
    }

    setSaleItems(newItems);
  };

  const subtotal = saleItems.reduce(
    (sum, item) => sum + (item.subtotal || 0),
    0,
  );
  const taxRate = 18; // GST
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate customer info
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Please provide customer name and phone");
      return;
    }

    if (saleItems.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const saleData = {
      customer: customerInfo,
      items: saleItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        discount: item.discount,
      })),
      discount: 0,
      payment_method: paymentMethod,
      payment_details: {},
    };

    try {
      await createSale.mutateAsync(saleData);
      onSuccess();
    } catch (error) {
      console.error("Sale creation failed:", error);
    }
  };

  if (inventoryLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold">Customer Information</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="Customer Name"
              placeholder="John Doe"
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
              required
            />
            <FormField
              label="Phone"
              type="tel"
              placeholder="9876543210"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
              required
            />
            <FormField
              label="Email"
              type="email"
              placeholder="customer@example.com"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
            />
            <FormField
              label="Address"
              placeholder="Complete address"
              value={customerInfo.address}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, address: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Sale Items */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sale Items</h3>
            <Button type="button" onClick={addItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {saleItems.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No items added yet
            </div>
          ) : (
            <div className="space-y-4">
              {saleItems.map((item, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="md:col-span-2">
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
                              <option
                                key={product.product_id}
                                value={product.product_id}
                              >
                                {product.product_name} ({product.stock}{" "}
                                available) -{" "}
                                {formatCurrency(product.dealer_price)}
                              </option>
                            ))}
                          </select>
                        </div>

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

                        <div>
                          <label className="block mb-2 text-sm font-medium">
                            Discount
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={item.discount}
                            onChange={(e) =>
                              updateItem(
                                index,
                                "discount",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="md:col-span-4">
                          <div className="flex items-center justify-between p-3 rounded-md bg-gray-50">
                            <span className="text-sm text-gray-600">
                              Subtotal:
                            </span>
                            <span className="text-lg font-bold text-primary-600">
                              {formatCurrency(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      </div>

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
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold">Payment Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                required
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="emi">EMI</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Sale Summary */}
            <div className="p-4 border rounded-lg bg-primary-50 border-primary-200">
              <h4 className="mb-3 font-semibold">Sale Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">
                    {formatCurrency(subtotal)}
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
            </div>

            {/* Warranty Notice */}
            {saleItems.length > 0 && (
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <p className="text-sm text-green-800">
                  ✓ Warranty will be automatically activated for this sale
                </p>
                <p className="mt-1 text-xs text-green-700">
                  Customer will receive 4 free services within the warranty
                  period
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createSale.isPending || saleItems.length === 0}
          size="lg"
        >
          {createSale.isPending ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating Sale...
            </>
          ) : (
            "Create Sale & Activate Warranty"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SaleForm;
