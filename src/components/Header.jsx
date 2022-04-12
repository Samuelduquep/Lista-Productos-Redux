import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav className='p-4 navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
       <Link to={"/"}> <div className='container'>
          <h1 className="text-white">CRUD - React, Redux, REST API & Axios</h1>
      </div></Link>
     
      <Link to={"/productos/nuevo"} className='btn btn-danger nuevo-post d-block d-md-inline-block'>Agregar Producto &#43;</Link>
    </nav>
  )
}

export default Header
