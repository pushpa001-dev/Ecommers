"use client"

interface ButtonProps {
    title: string;
    color?: string
   click?: () => void
}   

export const Button = ({title,click , color}: ButtonProps) => {
  return (
    <button className={`bg-${color} bg-black px-4 py-2 rounded-md mt-5 cursor-pointer  active:bg-black  hover:bg-zinc-400 transition-colors duration-200 ease-in-out flex items-center justify-center`}  onClick={click}> <p className="text-white text-sm">{title}</p></button>
  )
}

