import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productsAPI";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
//   const [data, setdata] = useState(null);

//   const buscar = async () => {
//     const datos = await getProducts();
//     setdata(datos);
//     console.log(datos);
//   };

//   useEffect(() => {
//     buscar();
//   }, []);

const {isLoading, data, error, isError} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
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
            <button>Delete</button>
            <input type="checkbox" name="" id="" value={el.inStok} />
            <label htmlFor="">In Stock</label>
            </div>;
        })}
    </div>
  );
}
