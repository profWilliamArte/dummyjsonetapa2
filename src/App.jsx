
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Tienda from './pages/Tienda'
import Laptop from './pages/Laptop'
import Movil from './pages/Movil'
import Categorias from './pages/Categorias'
import Contactos from './pages/Contactos'
import Busquedas from './pages/Busquedas'
import { useState } from 'react'





function App() {
  const [carrito, setCarrito] = useState([])

  return (
    <>
    
      <BrowserRouter>

          <Header carrito={carrito} setCarrito={setCarrito}/>
     
            <Routes>
              <Route path="/" element={<Inicio/>} />
              <Route path="/tienda" element={<Tienda carrito={carrito} setCarrito={setCarrito}/>} />
              <Route path="/laptop" element={<Laptop carrito={carrito} setCarrito={setCarrito}/>} />
              <Route path="/movil" element={<Movil carrito={carrito} setCarrito={setCarrito}/>} />
              <Route path="/categorias/:id" element={<Categorias carrito={carrito} setCarrito={setCarrito}/>} />
              <Route path='/busquedas' element={<Busquedas carrito={carrito} setCarrito={setCarrito}/>}/>
              <Route path="/contactos" element={<Contactos/>} />
              <Route path="*" element={<Inicio/>} />
            </Routes>
           
          <Footer/>
          
   
      </BrowserRouter>
    
    </>
  )
}

export default App
