import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { editarProductoAction } from "../actions/productoActions"
import { useNavigate } from "react-router-dom"

const EditarProducto = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [productoNuevo, setProductoNuevo] = useState({
      nombre: '',
      precio: ''
  })

  //producto a editar

  const producto = useSelector(state => state.productos.productoEditar)
  // if(!producto) return null

  useEffect(() => {
    setProductoNuevo(producto)
  }, [producto])

  const onChangeFormulario = e => {
    setProductoNuevo({
      ...productoNuevo,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmitEditar = e =>{
    e.preventDefault()
    dispatch(editarProductoAction(productoNuevo)) 
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center font-weight-bold">
            Editar Producto
          </h2>
          <form 
            onSubmit={handleSubmitEditar}
          >

            <div className="form-group">
              <label htmlFor="nombre">Nombre Producto</label>
              <input 
                value={productoNuevo.nombre}
                onChange={onChangeFormulario}
                type="text" 
                name="nombre" 
                id="nombre" 
                className="form-control" 
                placeholder="Nombre Producto"/>
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio Producto</label>
              <input 
                value={productoNuevo.precio}
                onChange={onChangeFormulario}
                type="number" 
                name="precio" 
                id="precio" 
                className="form-control" 
                placeholder="Precio Producto"/>
            </div>

            <button 
            type="submit"
            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
            >
              Guardar Cambios
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditarProducto
