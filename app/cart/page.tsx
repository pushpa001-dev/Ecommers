"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { decrement, increment } from "@/store/Cartslice/counterslice";

interface CartProduct {
  productId: number;
  quantity: number;
}
interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}
const getFromLocalStorage = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
const Cart = () => {
  const cartid = useSelector((state: RootState): number => state.data.cartdata.value);

  const value = useSelector((state: RootState): number => state.data.counterSlice.value)
  const usedispatch = useDispatch()

  const [Cart, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const res = await fetch(`https://fakestoreapi.com/carts/${cartid}`);
        const cartData = await res.json();

        if (!cartData || !Array.isArray(cartData.products)) {
          console.warn("No valid cart data found for ID:", cartid);
          setProducts([]);
          return;
        }

       

        const productFetches = cartData.products.map(
          async (item: CartProduct) => {
            const res = await fetch(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return await res.json();
          }
        );

        const productDetails = await Promise.all(productFetches);
        setProducts(productDetails);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    }

    if (cartid) fetchCartProducts();
  }, []);
 const [cart, setCart] = useState<Product[]>([]);
  useEffect(() => {
    const savedCart = getFromLocalStorage<Product[]>('cartData');
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartData', JSON.stringify(Cart));
      localStorage.setItem('counterValue', JSON.stringify(value));
    }
  }, [Cart, value]);
  return (
    
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="w-full absolute fkex items-center justify-center">
        {Cart.length == 0 ? (
          <div className=" w-full h-full items-center justify-center flex flex-col">
            <Image
              src="/empty-box.svg"
              alt="box"
              width={100}
              height={100}
              className=" w-lg  md:w-3xl lg:w-4xl h-full object-contain shadow-md py-2 "
            />{" "}
            {/* <h1 className="flex flex-col items-center text-2xl md:text-3xl lg:text-7xl font-bold font-roboto-mono text-white md:mt-[-100px]">
              Cart is empty
            </h1> */}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-centr justidy-center w-full bg-white h-screen ">
      <div className="flex flex-row items-start justify-between w-full py-20 px-5">
                  <h1 className="text-zinc-500 font-bold font-roboto-mono ">Shopping Cart </h1> 
                  <h1 className="text-zinc-500 font-bold font-roboto-mono ">{cartid} Items</h1>
                </div>
        {Cart.map(
          (item: Product) => (
            console.log(item.id),
            (
             <div className="flex flex-col lg:flex-row w-full py-10 border-t-2 border-zinc-200 px-10 ">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row gap-20 lg:max-w-md w-full">
                  <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className=" object-contain py-2 "
                  />
                  <div className="flex flex-col justify-between">
                    <h1 className="text-black font-bold font-roboto-mono max-w-[300px] leading-10 items-center flex">{item.title}</h1>
                    <p className="text-zinc-500 font-bold font-roboto-mono">${item.price}</p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-center gap-5 w-full">
                    <button className=" bg-zinc-500 w-10 font--bold items-center justify-center flex rounded-sm hover:scale-105 cursor-pointer transition-transform duration-200 ease-in" onClick={()=>{usedispatch(decrement())}}>-</button>
                    <p className="text-black font-bold">{value}</p>
                <button className=" bg-zinc-500 w-10 font-bold items-center justify-center flex rounded-sm hover:scale-105 cursor-pointer transition-transform duration-300 ease-in" onClick={()=>{usedispatch(increment())}}>+</button>
                  </div>
                  <div className="flex items-center justify-center gap-2 w-full">
                   <h1 className="text-black font-bold font-roboto-mono transition-transform duration-300 ease-in"> <span className="text-zinc-500 font-bold font-roboto-mono">Price:</span>${value*item.price}</h1>
                  </div>
                </div>
              </div>
              <div className="">

              </div>
             </div>
            )
          )
        )}
      </div> 
    </div>
  );
};

export default Cart;
