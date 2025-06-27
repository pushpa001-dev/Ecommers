

import Image from "next/image";
interface Props{
    params: {
        id: number;
      };
}

 async function getProducts (id: number) {
 const res = await fetch(`https://fakestoreapi.com/products/${id}`);
 return res.json();
}
export default async function ProductId({ params }: Props) {
    const product = await getProducts(params.id);
    return (
        <div className="flex items-center justify-between w-full lg:h-screen  bg-white p-1 ">
          <div className="w-full flex flex-col lg:flex-row gap-5 lg:h-screen  p-10">
           <div className="flex w-full ">
            <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className=" object-contain"
            />
           </div>
           
           <div className="flex flex-col w-full h-full gap-5 lg:gap-20">
            <div className="flex flex-col w-full h-2xl gap-10 transform animate-slide">
            <p className="text-zinc-600 text-4xl  lg:text-7xl">${product.price}</p>
            <h1 className="text-2xl lg:text-5xl lg:leading-20 font-bold font-roboto-mono text-zinc-400 ">{product.title}</h1>
            <p className="text-zinc-900 text-sm lg:text-xl font-semibold font-roboto-mono">{product.description}</p>
            </div>
            <div className="flex flex-col lg:pr-50 items-start justify-start animate-fade w-full">
              <button className="bg-black py-4 px-2 xl:px-10 xl:py-7 rounded-lg lg:rounded-2xl mt-5 cursor-pointer  active:bg-black  hover:bg-zinc-200 hover:text-zinc-600 transition-colors duration-200 ease-in-out flex items-center justify-center w-full text-xl xl:text-5xl font-bold " >Add to cart</button>
              
           </div>
           </div>
        </div>
        </div>
    );
}