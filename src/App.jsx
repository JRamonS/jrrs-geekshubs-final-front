import './App.css'
import { Footer } from './Components/Footer/Footer'
import { NavBar } from './Components/NavBar/NavBar'
import { Body } from './pages/Body/Body'

export const App = () => {
  
  return (
    <div className="App">
      <NavBar/>
      <Body/>
      <Footer/>
    </div>
  )
}

