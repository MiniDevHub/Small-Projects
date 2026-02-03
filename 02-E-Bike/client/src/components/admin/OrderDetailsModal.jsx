import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, User, MapPin, Calendar, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";

const OrderDetailsModal = ({ order, isOpen, onClose, onApprove, onReject }) => {
  if (!order) return null;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-purple-100 text-purple-800",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <Badge className={statusColors[order.status]}>
              {order.status?.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Order Number</p>
                <p className="font-semibold">{order.order_number}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Dealer Info */}
          <div className="p-4 border rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold">Dealer Information</h4>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Dealer ID: {order.dealer_id}
              </p>
              {order.shipping_address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    {order.shipping_address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="p-4 border rounded-xl">
            <h4 className="mb-4 font-semibold">Order Items</h4>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(item.subtotal)}
                    </p>
                    <p className="text-xs text-gray-500">
                      @ {formatCurrency(item.unit_price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  {formatCurrency(order.tax_amount)}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold border-t">
                <span>Total</span>
                <span className="text-blue-600">
                  {formatCurrency(order.grand_total)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.dealer_notes && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
              <p className="mb-1 text-sm font-medium text-yellow-800">
                Dealer Notes:
              </p>
              <p className="text-sm text-yellow-700">{order.dealer_notes}</p>
            </div>
          )}

          {/* Actions */}
          {order.status === "pending" && (
            <div className="flex gap-3">
              <Button
                onClick={() => onApprove(order.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Order
              </Button>
              <Button
                onClick={() => onReject(order.id)}
                variant="destructive"
                className="flex-1"
              >
                Reject Order
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
