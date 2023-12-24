import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './pages/about'
import Header from './pages/Header'
import Home from './pages/Home'
import Show from './pages/Show'
import NewNote from './pages/NewNote'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="note" element={<Show />} />
      <Route path="new" element={<NewNote />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)

 
  

  return (
   <>
   <Header/>
   <div className="app_container">
   <RouterProvider router={router}/>
   </div>
      </>
  )
}

export default App
