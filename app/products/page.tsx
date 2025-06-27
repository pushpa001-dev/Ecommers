"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '../../components/Button';
import { useDispatch } from "react-redux";
import { setData } from "@/store/Cartslice/cartSlice";
import Link from 'next/link';
import { setfavorite } from '@/store/Cartslice/favorite';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // ✅ Make sure you access the actual array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  function Addtocart(productid: number) {
    dispatch(setData(productid));
    console.log(productid);
  }

  function Favorite (productid: number) {
    dispatch(setfavorite(productid))
    console.log(productid)
  }
  return (
    <section className='flex flex-col items-center justify-center py-10 lg:py-20 px-5 lg:px-20 bg-zinc-100 w-full  '>
      
      <div>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-20  animate-fade">
          {products.map((product: Product) => (
            
            <li
              key={product.id}
              className="P-2 rounded-md bg-white md:hover:scale-105 cursor-pointer transition-transform duration-400 ease-in-out sm:hover:border-zinc-300 px-5 py-5 shadow-md/20 "
            >
              <Link href={`/products/${product.id}`} >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-32 object-contain shadow-md py-2"
              />
              <div className='flex flex-col pt-2 lg:pt-10 gap-4'>
                <h2 className="text-[10px] lg:text-[15px] font-semibold font-roboto-mono text-black">{product.title}</h2>
                <p className="text-gray-600 ">${product.price}</p>
              </div>
              </Link>
              <div className='flex flex-row items-end justify-between'>
                <Button title='Add to Cart' color='bg-zinc-800' click={() => Addtocart(product.id)} />
                <button onClick={() => Favorite(product.id)} className='border-2 border-zinc-400 rounded-full p-2 bg-zinc-400 hover:bg-zinc-800 flex items-center justify-center '>
                  <Image src='/favorites.svg' alt='favorites' width={20} height={20}
                  className='w-3 h-3 lg:w-6 lg:h-6' />
                </button>
              </div>
            </li>
           
          
          ))}
        </ul>
      </div>
    </section>
  );
}