import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { eliminaProductoAction, obtenerProductoEditar } from "../actions/productoActions"
import Swal from "sweetalert2"

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEliminarProducto = (id)=>{

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'Atención',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'

          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminaProductoAction(id))
            }
          })
    }

    //funcion redigirir forma programada
    const redireccionarEdicion = producto => {
      dispatch(obtenerProductoEditar(producto))
      navigate(`/productos/editar/${producto.id}`)
    }

  return (
    <tr>
      <td>{nombre}</td>
      <td> <span className='font-weight-bold'>€ {precio}</span> </td>
      <td>
          <button type="button" onClick={() => redireccionarEdicion(producto)} className="btn btn-primary mr-2">
              Editar
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={()=>handleEliminarProducto(id)}
          >
              Eliminar
          </button>
      </td>
    </tr>
  )
}

export default Producto
