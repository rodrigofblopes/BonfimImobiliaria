import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchProperties from './pages/SearchProperties'
import MarketAnalysis from './pages/MarketAnalysis'
import Properties from './pages/Properties'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchProperties />} />
            <Route path="/market-analysis" element={<MarketAnalysis />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
