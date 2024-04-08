
import { useState } from "react";
import Detalle from "./Detalle";
const Card = ({producto}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

  return ( 
    <>
        <div className="col-md-4 col-lg-3 mb-4" >
                <div className="card h-100">
                <div className="card-header p-0">
                    <img src={producto.thumbnail} alt={producto.title}  className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <h5>{producto.title}</h5>
                    <p className="text-success">{producto.brand}</p>
                    <h5 className="text-danger">{producto.price.toFixed(0).toLocaleString()}$</h5>
                </div>
                <div className="card-footer text-center">

                    <button className="btn btn-danger btn-sm mx-1"  onClick={handleShow}>Detalle</button>
                </div>
            </div>
        </div>
        <Detalle show={show} handleClose={handleClose} producto={producto}  />
    </>  
  )
}

export default Card