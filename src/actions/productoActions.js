import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear productos
export function crearNuevoProductoAction(producto) {
  
    return async (dispatch) => {
        
        dispatch(agregarProducto());

        try {
            await clienteAxios.post('/productos', producto)

            //si todo bien , se actualiza el state
            dispatch(agregarProductoExito(producto))

            //Alerta

            Swal.fire(
                'Correcto',
                'Producto Agregado Correctamente',
                'success'
            )

        } catch (error) {
            console.log(error)

            //si hay un error se cambia el state
            dispatch(agregarProductoError(true));

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload: estado
})



//FUNCION PARA DESCARGAR PRODUCTOS DE BASE DE DATOS

export function obtenerProductosAction() {
    return async(dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios('/productos')
            dispatch(descargaProductosExito(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError(true))
        }
    }
}

const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError=(estado)=>({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})


//FUNCION PARA ELIMINAR PRODUCTOS

export function eliminaProductoAction(id) {
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            Swal.fire(
                'Eliminado!',
                'El producto se ha eliminado',
                'success'
              )

        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError(true))
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = estado => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
})

//colocar producto en edicion

export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction (producto){
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)

            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})