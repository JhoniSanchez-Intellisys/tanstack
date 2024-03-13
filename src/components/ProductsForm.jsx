import { useMutation } from "@tanstack/react-query";
import React from "react";
import { postProducts } from "../api/productsAPI";

export default function ProductsForm() {


    const add = useMutation({
        mutationFn: postProducts, 
        onSuccess: () => {
            console.log("Product Add")
        }
    })



const handlesubmit = (e) => {    
    e.preventDefault()
    console.log(e.target)
    const dataform = new FormData(e.target)
    const products = Object.fromEntries(dataform)

    add.mutate({
        ...products, 
        inStock: true
    })

    console.log(dataform)
}


  return (
    <form onSubmit={handlesubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />

      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />

      <button>Add Products</button>
    </form>
  );
}
