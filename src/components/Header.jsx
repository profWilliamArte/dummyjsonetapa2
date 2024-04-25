import { useEffect, useState } from "react";
import FiltroCategorias from "./FiltroCategorias"
import Login from "./Login";
import MostrarCarrito from './MostrarCarrito';
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';


import logo from "../assets/logo.jpg";

import { CartFill } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const Header = ({carrito, setCarrito}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };


    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/busquedas', {
        state: inputValue,
      });	
      
    };
    const [total, setTotal]=useState(0)
    useEffect(()=>{
        setTotal(carrito.length)
      },[carrito]);

    const formatearMoneda = (valor) => {
        const resultado = valor.toLocaleString("es", {
          style: "currency",
          currency: "USD",
          useGrouping: true,
        });
      
        return resultado.replace("US$", "");
      };
    const verCarrito = () => {
        let totalCantidad = 0;
        let totalPrecio = 0;
    
        const carritoTabla = carrito.map((producto) => {
        const subtotal = producto.price * producto.cant;
        totalCantidad += producto.cant;
        totalPrecio += subtotal;
    
        const precioFormateado = formatearMoneda(producto.price);
        const subtotalFormateado = formatearMoneda(subtotal);
    
        return `
            <tr>
            <td><img src="${producto.thumbnail}" alt="" class="imgCarrito"/> </td>
            <td>${producto.title}</td>
            <td>${producto.cant.toLocaleString("es", { useGrouping: true })}</td>
            <td>${precioFormateado}</td>
            <td>${subtotalFormateado}</td>
            </tr>
        `;
        }).join("");
    
        const totalPrecioFormateado = formatearMoneda(totalPrecio);
    
        const tablaHTML = `
        <div class="text-center">
            <table class="table table-striped table-bordered table-hover table-sm tablaCarrito" >
            <thead class="table-dark">
                <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${carritoTabla}
                <tr>
                <td colspan="2"></td>
                <td>${totalCantidad.toLocaleString("es", { useGrouping: true })}</td>
                <td></td>
                <td>${totalPrecioFormateado}</td>
                </tr>
            </tbody>
            </table>
        </div>
        `;
    
        Swal.fire({
        position: "top-center",
        title: "Carrito",
        html: tablaHTML,
        width: "800px", // Establece el ancho deseado aquí
        });
      }
  
  return (

    <>
        <nav className="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src={logo} alt="logo" width={100} /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/inicio" className="nav-link active" aria-current="page" href="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link to="/tienda" className="nav-link" href="#">Tienda</Link>
                </li>
                <li className="nav-item">
                    <Link to="/movil" className="nav-link" href="#">Movil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/laptop" className="nav-link" href="#">Laptop</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categorias
                    </a>
                    <ul className="dropdown-menu">
                        <FiltroCategorias/>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link to="/contactos" className="nav-link">Contactos</Link>
                </li>
                <button className='btn btn-danger me-2'   onClick={() =>  verCarrito() }>  <CartFill  size={25} /> <span className="bagbe bg-secondary">{total}</span></button>

                <button className='btn btn-info me-2'  onClick={handleShow} >  <CartFill  size={25} /> <span className="bagbe bg-secondary">{total}</span></button>

            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit} >
                <input  value={inputValue} onChange={handleChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />                   
                <button  className="btn btn-outline-success" type="submit">Search</button>
                <a className="btn btn-outline-info" href="#" onClick={handleShow}>Login</a>
            </form>
            </div>
        </div>
        </nav>


        <MostrarCarrito carrito={carrito} setCarrito={setCarrito} show={show} handleClose={handleClose}  />
    </>


  )
}

export default Header

// <input value={valueSearch} onChange={onSearchChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />