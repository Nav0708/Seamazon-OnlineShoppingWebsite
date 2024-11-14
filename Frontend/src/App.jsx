import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './components/SignUpPage.jsx';
import SignIn from './components/LoginPage.jsx';
import UserHomePage from './components/UserHomePage.jsx';
import AdminHomePage from './components/AdminHomePage.jsx';
import ShoppingCart from './components/CartPage.jsx';
import UserProfile from './components/UserDetailPage.jsx';
import AdminProfile from './components/AdminDetailPage.jsx';
import AddProductForm from './components/AddProductPage.jsx';


const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<UserHomePage/>} />
      <Route path="/adminHome" element={<AdminHomePage/>} />
      <Route path="/cart" element={<ShoppingCart/>} />
      <Route path="/profile" element={<UserProfile/>} />
      <Route path="/admin" element={<AdminProfile/>} />
      <Route path="/addProduct" element={<AddProductForm/>} />
      <Route path="/" element={<SignIn />}>
      </Route>
    </Routes>
  </Router>
  );
  }
export default App
