import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App

/*

-adição de conteúdo à página home, login, notfound, article, articleEdition, edition

-navegação entre páginas

-adição de toggle theme

-estilização das páginas em light e dark mode

-responsividade das páginas

-integrar banco de dados

-criar autenticação para administrador

-logout para administrador

-criar funcionalidade de criar, editar e remover artigo

-criar funcionalidades de salvar e publicar artigo

*/