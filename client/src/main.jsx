// Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Components
import ErrorPage from './components/error-page'
import SearchPage from './components/search-page'
import ResultsPage, {loader as resultsLoader, action as resultsAction} from './components/results-page'

// Styles
import './styles/modern-normalize.css'
import './styles/main.css'
import './styles/search-page.css'
import './styles/results-page.css'
import './styles/error-page.css'

// Sets up the 'routes' for the website
// Two main routes - Search Page and Results Page
// The Search Page is essentially the landing page - users will only see it the first time the access the website
// The Results Page is where...well, where the results are. That's where users will spend most of their time.
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SearchPage />,
      errorElement: <ErrorPage />,
      action: resultsAction,
    },
    {
      path: "/search",
      element: <ResultsPage />,
      errorElement: <ErrorPage />,
      loader: resultsLoader,
      action: resultsAction,
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
