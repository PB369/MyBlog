import './styles/AppCSS/App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import Article from './pages/Article/Article'
import ArticlesLayout from './layouts/ArticlesLayout'
import Management from './pages/Management/Management'
import ArticleEdition from './pages/ArticleEdition/ArticleEdition'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
        {/* Routes with common Context API for articles mock*/}
        <Route element={<ArticlesLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path="/articles/:id" element={<Article/>}/>

          <Route path='/management' element={
            <ProtectedRoute>
              <Management/>
            </ProtectedRoute>
          }/>
          <Route path='/management/create' element={
            <ProtectedRoute>
              <ArticleEdition/>
            </ProtectedRoute>
          }/>
          <Route path='/management/edit/:id' element={
            <ProtectedRoute>
              <ArticleEdition/>
            </ProtectedRoute>
          }/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App