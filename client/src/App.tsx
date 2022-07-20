import './app.scss'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header'
import { useAppSelector, useAppDispatch } from './hooks/redux'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import { increment } from './store/reducers/UserSlice'
import Registration from './pages/Registration/Registration';


function App() {
  const dispatch = useAppDispatch()
  const { count } = useAppSelector(state => state.users)

  const onClick = () => {
    dispatch(increment(10))
  }

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
