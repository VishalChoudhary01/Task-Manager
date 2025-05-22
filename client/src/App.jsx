import {Provider} from "react-redux"
import { store } from "./redux/store"
import {Home,Dashboard} from './pages/index'
import {BrowserRouter as Router,Routes,Route} from "react-router"
import MainLayout from "./components/templates/MainLayout"
import TaskView from "./pages/TaskView"
import AddTask from "./components/templates/AddTask"


function App() {

  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
          <Route path="/" element={<Dashboard />}>
              <Route index element={<TaskView filter="all" />} />
              <Route path="tasks" element={<TaskView filter="all" />} />
              <Route path="pending" element={<TaskView filter="pending" />} />
              <Route path="completed" element={<TaskView filter="completed" />} />
              <Route path="add-task" element={<AddTask />} />
            </Route>
          </Routes>
        </MainLayout>
  
      </Router>
    </Provider>
    
  )
}

export default App
