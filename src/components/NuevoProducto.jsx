
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { crearNuevoProductoAction } from "../actions/productoActions"; //actions de redux
import { useNavigate } from "react-router-dom";

import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions";


const NuevoProducto = () => {

  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  
  //utilizar useDispatch y te crea una funcion
  const dispatch = useDispatch()

  //acceder al state del store
  const cargando = useSelector(state=> state.productos.loading)
  const error = useSelector(state=> state.productos.error)
  const alerta = useSelector(state=>state.alerta.alerta)

  //llamar el action
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

  const handleSubmit = e => {
    e.preventDefault();

    //Validar Formuario
    if(nombre.trim() === '' || precio<=0){
       const alerta = {
         msg: 'Ambos campos son obligatorios',
         classes: 'alert alert-danger text-center text-uppercase p3'
       }

       dispatch(mostrarAlertaAction(alerta)) 
       setTimeout(() => {
        dispatch(ocultarAlertaAction()) 
       }, 3000);
      return
    }


    //si no hay errores

    //crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }
            <form 
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input 
                  type="text" 
                  name="nombre" 
                  id="nombre" 
                  className="form-control" 
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={e=>setNombre(e.target.value)}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input 
                  type="number" 
                  name="precio" 
                  id="precio" 
                  className="form-control" 
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={e=>setPrecio(e.target.value)}
                  />
              </div>

              <button 
              type="submit"
              className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>

            </form>
            {cargando ? 'Cargando...' : null}
            {error ? <p className="alert alert-danger p1 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
