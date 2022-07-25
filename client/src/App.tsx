import './app.scss'
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header/Header'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration';
import Post from './pages/Post/Post';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUserAuth } from './store/actions/UserAction';
import UserInfo from './pages/User/UserInfo';
import UserSetting from './pages/User/UserSetting';
import { showMenu } from './store/reducers/UserSlice';
import CreatePost from './pages/CreatePost/CreatePost';


function App() {
  const { isAuth, menu } = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserAuth())
  }, []);

  const closeMenu = () => {
    if (menu) {
      dispatch(showMenu(false))
    }
  }

  return (
    <BrowserRouter>
      <div className='app' onClick={closeMenu}>
        <Header />
        <div className="container">
          {!isAuth
            ? <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/" element={<Navigate replace to="/login" />} />

              <Route
                path="*"
                element={<Navigate replace to="/" />}
              />
            </Routes>

            : <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Navigate replace to="/" />} /> */}
              <Route path="/post/:id" element={<Post />} />
              <Route path="/info" element={<UserInfo />} />
              <Route path="/setting" element={<UserSetting />} />
              <Route path="/new" element={<CreatePost />} />

              <Route
                path="*"
                element={<Navigate replace to="/" />}
              />
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
