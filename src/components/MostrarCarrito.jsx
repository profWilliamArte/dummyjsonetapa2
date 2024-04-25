import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2'
import { TrashFill } from 'react-bootstrap-icons';
const MostrarCarrito = ({carrito, setCarrito, producto, show, handleClose}) => {

  const enviarCarrito = () => {
    // Realiza la solicitud POST al backend con los datos del carrito
    axios.post('/api/carrito.php', carrito)
      .then((response) => {
        // Maneja la respuesta del backend si es necesario
        console.log(response.data);
        // Puedes mostrar un mensaje de éxito o redirigir al usuario a otra página
        Swal.fire("Compra realizada", "La compra se ha realizado con éxito", "success");
        // Vaciar el carrito después de realizar la compra
        setCarrito([]);
      })
      .catch((error) => {
        // Maneja el error si la solicitud no se pudo completar
        console.error(error);
        Swal.fire("Error", "No se pudo realizar la compra", "error");
      });
  };
const vaciarCarrito=()=>{
  Swal.fire({
    title: "Vaciar Carrito",
    text: "¿Estás seguro de que deseas vaciar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      setCarrito([]); // Vaciar el carrito estableciendo un array vacío
      Swal.fire("Carrito vaciado", "El carrito ha sido vaciado", "success");
    }
  });
}

const eliminaIten=(item)=>{

  Swal.fire({
    title: "Eliminar?",
    text: "Esta seguro de de Eliminar este producto.!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    
    confirmButtonText: "Seguro desea eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedCarrito = carrito.filter((i) => i.id !== item.id);
      setCarrito(updatedCarrito);
      Swal.fire({
        title: "Eliminado!",
        text: "El producto ha sido eliminado!!",
        icon: "success"
      });
    }
  });











}


  return (
    <>
      <Offcanvas show={show} onHide={handleClose}  placement="end" data-bs-theme="dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Detalle del Carrito</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='d-flex justify-content-center p-3'>
                <button className='btn btn-outline-success me-2' onClick={()=>enviarCarrito()} >  Realizar Compra </button>
                <button className='btn btn-outline-info me-2' onClick={()=>vaciarCarrito()} >  Vaciar Carrito </button>
            </div>

            {carrito.map((item) => (
                <Card key={item.id} className='p-2 mb-2'>
                  <img src={item.thumbnail} alt={item.title} />
                  <h5 className='text-center m-2'>{item.title}</h5>
                  <div className='d-flex justify-content-center '>
                  <p className='text-center m-2'>Precio: {item.price}</p>
                  <p className='text-center m-2'>Cantidad: {item.cant}</p>
                  </div>

                  <button className='btn btn-outline-danger btn-sm me-2' onClick={()=>eliminaIten(item)} >  <TrashFill  size={25} /> </button>
                </Card>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default MostrarCarrito