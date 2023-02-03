import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './Components/product';
import Index from './Components/index';
function App() {
  return (
<>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
        <Route exact path="/" element={<Index/>}/>
          <Route exact path="/Product" element={<Product/>}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;
