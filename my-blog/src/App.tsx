import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import Article from './pages/Article/Article'
import ArticlesLayout from './layouts/ArticlesLayout'
import Management from './pages/Management/Management'



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
        {/* Routes with common Context API for articles*/}
        <Route element={<ArticlesLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path="/articles/:id" element={<Article/>}/>
          <Route path='/management' element={<Management/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

/*

-adição de conteúdo à página articleEdition, edition

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