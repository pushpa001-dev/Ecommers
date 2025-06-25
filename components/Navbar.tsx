"use client";
import { NAV_LINKS } from "@/constrians";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState } from "react";

interface ecommernavProps {
  image: string;
  alt: string;
  popup: string;
}

const Ecommernav: React.FC<ecommernavProps> = ({ image, alt, popup }) => {
  return (
    <div className="group ">
      <Image
        src={image}
        alt={alt}
        width={30}
        height={30}
        className="cursor-pointer "
      />
      <p className="hidden text-[12px] text-sonc-300 bg-zinc-800 px-2 py-1 rounded-[5px] shadow-md group-hover:block absolute group-transition-opacity duration-300 ease-in-out mt-2 ">
        {popup}
      </p>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <section className="flex flex-row justify-between items-center px-5 xl:px-30 py-5 md:py-7 sticky top-0 z-50 bg-zinc-900/97">
      <div className="flex items-center w-full">
        <Link href="/">
          <h1 className="md:text-[20px] xl:text-3xl text-shadow-lg font-bold font-roboto-mono hover:shadow-lg shadow-slate-400/3 text-slate-100">
            Ecommer
          </h1>
        </Link>
      </div>

      <div className="hidden lg:flex fle-row items-center justify-between   w-full">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.name}>
            <h1 className=" text-[15px] xl:text-lg text-shadow-lg font-bold font-roboto-mono  shadow-slate-400/3 text-slate-100 px-5 py-2   hover:underline   ">
              {link.name}
            </h1>
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex flex-row items-center justify-end gap-5 w-full ">
        <Link href="/favorites">
        <Ecommernav
          image={"/favorites.svg"}
          alt={"favorites"}
          popup={" your favorites"}
        />
        </Link>

        <Link href={"/cart"} >
        <Ecommernav image={"/cart.svg"} alt={"cart"} popup={" your cart"} />
        </Link>
      </div>
      

      <div
        className="flex lg:hidden flex-col items-center justify-center"
        onClick={toggleSidebar}
      >
        <Image
          src="/more.svg"
          alt="more"
          width={25}
          height={25}
          className="cursor-pointer "
        />
      </div>
      <div
        className={`lg:hidden fixed top-0 right-0 h-full flex flex-col w-full  bg-zinc-900/90 text-white p-4 transition-transform duration-300 ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        } `}
      >
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.name}>
            <h1
              className={`  text-[15px] py-10 md:text-4xl md:py-15 text-shadow-lg font-bold font-roboto-mono shadow-slate-400/3 text-slate-100 px-5   w-full text-center hover:bg-black/50 `}
            >
              {link.name}
            </h1>
          </Link>
        ))}
        <button
          onClick={closeSidebar}
          className="w-full items-center justify-center cursor-pointer "
        >
          {" "}
          <h1 className=" text-[15px] py-10 md:text-4xl md:py-15 text-shadow-lg font-bold font-roboto-mono shadow-slate-400/3 text-slate-100 px-5 hover:bg-black/50">
            close
          </h1>
        </button>
      </div>
    </section>
  );
};

export default Navbar;
