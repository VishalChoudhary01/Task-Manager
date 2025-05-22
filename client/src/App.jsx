import {Provider} from "react-redux"
import { store } from "./redux/store"
import {Home,Dashboard} from './pages/index'
import {BrowserRouter as Router,Routes,Route} from "react-router"
import MainLayout from "./components/templates/MainLayout"
function App() {

  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/dashboard"} element={<Dashboard/>}/>
          </Routes>
        </MainLayout>
  
      </Router>
    </Provider>
    
  )
}

export default App
