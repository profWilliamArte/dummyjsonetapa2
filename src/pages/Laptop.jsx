import { useEffect, useState } from "react";
const API='https://dummyjson.com/products/category/laptops';
import Card from "../components/Card";

const Laptop = ({carrito, setCarrito}) => {
  const [datos, setDatos] = useState([])
    const getDatos = async () =>{
        try {
          const response = await fetch(API);
          const data = await response.json();
          //console.log(data)
          setDatos(data.products);
        } catch (error) {
          console.error(error)
        }
      };
      useEffect(()=>{
        getDatos();
      },[]);
  return (
    <>
        <div className="container">
        <h1 className="text-center py-3">Laptops ({datos.length})</h1>
            <div className="row">
                {datos && datos.map((productos)=>(
                  <Card key={productos.id} producto={productos} carrito={carrito} setCarrito={setCarrito}/>
                ))}
            </div>
        </div>

    </>

  )
}

export default Laptop