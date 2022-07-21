import './app.scss'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration';
import Post from './pages/Post/Post';


function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
