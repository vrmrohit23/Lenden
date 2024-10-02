import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home, Contact, Login, Signup, Expenses, Lendings } from './pages/index.js'
import { Provider } from 'react-redux'
import store from './contexts/store.js'
import Protected from './components/protected/Protected.jsx'
import ScrollToTop from './components/essentials/ScrolltoTop.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />}></Route>
      <Route path='contact' element={<Contact />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='expenses' element={<Protected authentication={true}><Expenses /></Protected>}
      ></Route>
      <Route path='lendings' element={<Protected authentication={true}><Lendings /></Protected>}
      ></Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} >
          <ScrollToTop />

        </RouterProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
