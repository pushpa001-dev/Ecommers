"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { decrement, increment } from "@/store/Cartslice/counterslice";



interface CartItemRaw  {
  productId: number;
  quantity: number;
}
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}
const Cart =  () => {
  const cartid = useSelector((state: RootState) => state.data.cartdata.value);
  const value = useSelector((state: RootState) => state.data.counterSlice.value);
  const usedispatch = useDispatch();

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const res = await fetch(`https://fakestoreapi.com/carts`, {
          method: "POST",
          body: JSON.stringify({
            userId: 1,
            date: new Date().toISOString(),
            products: [{ productId: cartid, quantity: 1 }],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const cartData = await res.json();

        if (!cartData || !Array.isArray(cartData.products)) {
          console.warn("No valid cart data found for ID:", cartid);
          setCartItems([]);
          return;
        }

        const detailedProducts = await Promise.all(
          cartData.products.map(async (item: CartItemRaw) => {
            const productRes = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
            const productData = await productRes.json();
            return { ...productData, quantity: item.quantity };
          })
        );

        setCartItems(detailedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setLoading(false);
      }
    }

    if (cartid) fetchCartProducts();
  }, [cartid]);  
 return (
    <div className="w-full h-screen flex items-center justify-center relative">
      {cartItems.length === 0 ? (
        <div className="w-full h-full items-center justify-center flex flex-col absolute">
          <Image
            src="/empty-box.svg"
            alt="box"
            width={100}
            height={100}
            className="object-contain w-[300px] md:w-lg lg:w-2xl shadow-md py-2"
          />
          <p className="text-zinc-300 font-bold font-roboto-mono text-2xl md:text-[60px]">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start w-full bg-white h-full px-5">
          <div className="flex flex-row items-start justify-between w-full  py-10">
            <h1 className="text-zinc-500 font-bold font-roboto-mono text-2xl">Shopping Cart</h1>
            <h1 className="text-zinc-500 font-bold font-roboto-mono text-xl">{cartItems.length} Items</h1>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id} 
              className="flex flex-col lg:flex-row w-full py-10 border-t-2 border-zinc-200 px-5 "
            >
              <div className="flex flex-row gap-10 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-black font-bold font-roboto-mono">{item.title}</h1>
                  <p className="text-zinc-500 font-roboto-mono">${item.price}</p>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <button
                    className="bg-zinc-500 w-10 text-white rounded hover:scale-105"
                    onClick={() => usedispatch(decrement())}
                  >
                    -
                  </button>
                  <p className="text-black font-bold">{value}</p>
                  <button
                    className="bg-zinc-500 w-10 text-white rounded hover:scale-105"
                    onClick={() => usedispatch(increment())}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <h1 className="text-black font-roboto-mono">
                    <span className="text-zinc-500">Price:</span> ${value * item.price}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Cart;