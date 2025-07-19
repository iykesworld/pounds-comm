"use client";
import { Order } from '../redux/slices/orderSlice';

interface OrderSummaryProps {
  order: Order;
  isRecent?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'shipped':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'shipped':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'delivered':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function OrderSummary({ order, isRecent = false }: OrderSummaryProps) {
  const itemCount = order.products.reduce((total, product) => total + product.quantity, 0);
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border-2 transition-all duration-200 hover:shadow-xl ${
      isRecent ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-800'
    }`}>
      {isRecent && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              Order placed, one of our customer services will contact you. Thank you
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Order #{order._id.slice(-8).toUpperCase()}
            </h3>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span className="font-semibold">Date:</span> {orderDate}
            </div>
            <div>
              <span className="font-semibold">Items:</span> {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {order.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {order.phone}
            </div>
          </div>
          
          <div className="mt-3">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.address}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${order.totalPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Amount</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Order Details:</h4>
        <div className="space-y-2">
          {order.products.map((product, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Product ID: {product.productId.slice(-8).toUpperCase()}
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Qty: {product.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 