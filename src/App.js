import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NuevoProducto from "./components/NuevoProducto";
import Productos from "./components/Productos"
import EditarProducto from "./components/EditarProducto";

//Redux
import {Provider} from 'react-redux'
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={ <Productos/>}/>
              <Route path='/productos/nuevo' element={<NuevoProducto/>}/>            
              <Route path='/productos/editar/:id' element={<EditarProducto/>}/>            
            </Route>
        </Routes>
      </BrowserRouter> 
    </Provider>  
  );
}

export default App;
