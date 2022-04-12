//redux
import { useSelector, useDispatch } from "react-redux"
import { obtenerProductosAction } from "../actions/productoActions"
import { useEffect } from "react"
import Producto from "./Producto"
import Swal from "sweetalert2"

const Productos = () => {

  const dispatch = useDispatch()


  const handleError = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Hubo un error',
      text: 'Hubo un error, intenta de nuevo'
  }) 
    setTimeout(() => {
        
    }, 3000);
   
  }

  useEffect(() => {
    //consultar la api
    const cargarProductos = () => dispatch(obtenerProductosAction())
    cargarProductos()
    // eslint-disable-next-line
  }, [])

  const productos = useSelector(state=> state.productos.productos)
  const error = useSelector(state=>state.productos.error)
  const cargando = useSelector(state=>state.productos.loading)

  return (
    <>
      <h2 className='text-center my-5'>
        Listado de Productos
      </h2>
      {error ? handleError() : null }
      {cargando ? <p className="text-center">Cargando...</p> : null}

      <table className=' table table-striped'>
        <thead className='bg-primary table-dark'>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          { productos.length === 0 ? <p className="alert alert-danger p1 mt-4 text-center flex-1">No hay Productos</p> : (
            productos.map(producto=>(
              <Producto
                key={producto.id}
                producto={producto}
              />
            ))
          )}
        </tbody>
      </table>
    </>
    
  )
}

export default Productos
