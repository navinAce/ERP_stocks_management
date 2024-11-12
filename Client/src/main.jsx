import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Sales } from './component/SalesPage.jsx'
import { AddStocks } from './component/AddStocksPage.jsx'
import { AllTranscations } from './component/AllTranscationsPage.jsx'

const router=createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Sales/>
      },
      {
        path: 'stocks',
        element: <AddStocks/>,
      },
      {
        path: 'transactions',
        element: <AllTranscations/>,
      },
    ],
      
  }
]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
