import './theme/index.scss'
import { Routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './layout'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <Layout>
          <Routes />
        </Layout>
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App
