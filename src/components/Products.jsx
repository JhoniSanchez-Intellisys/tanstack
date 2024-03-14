import React, { useEffect, useState } from "react";
import { deleteProducts, getProducts, putProducts } from "../api/productsAPI";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Products() {

const {isLoading, data, error, isError} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: data => data.sort((a,b)=> b.price - a.price)
})
const queryclient =useQueryClient()

const dele = useMutation({
  mutationFn: deleteProducts, 
  onSuccess: () => {
    console.log("Product Deleted")
    queryclient.invalidateQueries({ queryKey: ['products'] })
}
})

const update = useMutation({
  mutationFn: putProducts, 
  onSuccess: () => {
    console.log("Product Updated")
    queryclient.invalidateQueries({ queryKey: ['products'] })
}
})


console.log(data)

if(isLoading){
    return <p>Is loading</p>
}
else if(isError){
    return <p>{error.message}</p>
}

  return (
    <div>
      {data.map((el) => {
          return <div key={el.id}>
            <h3>{el.name}</h3>
            <p>{el.description}</p>
            <p>{el.price}</p>
            <button onClick={()=>dele.mutate(el.id)}>Delete</button>
            <input type="checkbox" name="" id=""  checked={el.inStok} onChange={e => update.mutate({...el, inStok: e.target.checked})} />
            <label htmlFor="">In Stock</label>
            </div>;
        })}
    </div>
  );
}
