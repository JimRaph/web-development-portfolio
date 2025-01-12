'use client'

import { useState } from 'react'

// Sample product data
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: 90.0,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: 32.0,
    quantity: 2,
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
]

export default function OrderPage() {
  const [cart, setCart] = useState(products)

  // Calculate amounts
  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  const shippingFee = 10.0
  const tax = subtotal * 0.05
  const total = subtotal + shippingFee + tax

  // Remove product handler
  const handleRemove = (id) => {
    setCart(cart.filter((product) => product.id !== id))
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Product List */}
      <div className="w-full lg:w-8/12 p-6 overflow-y-auto bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
        <ul role="list" className="divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={product.id} className="flex py-6">
              {/* Product Image */}
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Product Details */}
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty: {product.quantity}</p>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary & Payment Options */}
      <div className="w-full lg:w-4/12 p-6 bg-gray-100 shadow-md flex flex-col justify-between h-screen">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>${shippingFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax (5%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Payment Methods
          </h3>
          <div className="space-y-2">
            <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow">
              Pay with PayPal
            </button>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow">
              Pay with Credit/Debit Card
            </button>
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md shadow">
              Pay with Stripe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            * All transactions are secure and encrypted.
          </p>
        </div>
      </div>
    </div>
  )
}
