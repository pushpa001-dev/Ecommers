
import React from 'react'
import {  useSelector} from 'react-redux'
import { RootState } from '@/store/store'
import Image from 'next/image'



async function getfavorite (id: number) {
    const favorite = useSelector((state:RootState)=> state.data.favorite.value)
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return res.json();
   }
   export default async function Favorites (){
    const fav = await getfavorite(favorite)
    return(
      <div className=''>
 <Image
            src={fav.image}
            alt={fav.title}
            width={500}
            height={500}
            className=" object-contain"
            />
      </div>
    )
   }
 


