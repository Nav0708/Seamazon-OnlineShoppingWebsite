import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '/src/logo.png';
import search from '/src/search.png';
import NavLink from 'react-bootstrap/NavLink';
import '/src/style/UserIndex.css'; 
import { FaShoppingCart } from 'react-icons/fa';

const UserHomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false); 
    navigate('/signin');
  };

  const AddtoCart = async (product) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log(product,token);
      if (!token) {
          return navigate('/signin'); 
      }
      const productId=product._id;
      const name= product.name;
      const price= product.price;
      const response = await axios.post('http://localhost:3000/cart', {
          productId,
          name,
          price,
      },{
        headers: {
            Authorization: `Bearer ${token}` }
        });
      if (response.data.success) {
          alert('Added to cart!');
      }
  } catch (error) {
      console.error('Error:', error.message);
  }
  };

  const toCart = () => {
    navigate('/cart');
  };

  const toSignOut = () => {
    navigate('/signin');
  };

  const userProfile = () => {
    navigate('/profile');
     /* {isLoggedIn ? (
          <React.Fragment>
            <button onClick={handleSignOut} className="signOutButton">Sign Out</button>
            <button onClick={userProfile} className="cart">Profile</button>
          </React.Fragment>
        ) : null}
    */
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }
        const response = await axios.get('http://localhost:3000/home', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) {
          setProducts(response.data.products);
          setIsLoggedIn(true);
        } else {
          console.error('Error fetching data:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [navigate]);
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <div className="p-3 m-0 border-0 bd-example m-0 border-0">
          <NavLink to='/' class="navbar-brand" href="#"><img src={logo} alt="Logo" style={{ marginLeft: '10px', marginTop: '10px', width: '250px', height: '100px' }} /> </NavLink>
                        <div class="search" style={{ display: 'flex', alignItems: 'center' }}>
                          <i class="fa fa-search" style={{  marginLeft: '10px' }}><img src={search} alt="search"/> </i>
                              <input
                                type="text"
                                placeholder="Search by product name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="searchBar"
                              />
                        </div>
                        <ul class="nav nav-pills nav-fill">
                          <li class="nav-item">
                            <NavLink onClick={toSignOut} to='/signin' className="nav-link active" aria-current="page">Sign Out</NavLink>
                          </li>
                          <li class="nav-item">
                                <NavLink onClick={toCart} to='/cart' className="nav-link active">
                                    Shopping cart 
                                </NavLink>
                          </li>
                          <li class="nav-item">
                                <NavLink onClick={userProfile} to='/profile' className="nav-link active">
                                    Profile
                                </NavLink>
                          </li>
                        </ul>     
      
      <ul className="ul">
        {filteredProducts.map((product) => (
          <li className="li" key={product._id}>
            <img src={`http://localhost:3000${product.imageUrl}`} alt={product.name}/>
            <p className="productDetails">{product.name} - ${product.price}</p>
            <button className="ViewButton" onClick={() => handleViewProduct(product)}>View</button>
            {(product.quantity === 0) ? 
              <div style={{color: "red"}}>Out Of Stock</div> : 
              <button className="ViewButton" onClick={() => AddtoCart(product)}>Add to Cart <FaShoppingCart /></button>}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedProduct.name}</h3>
            <img src={`http://localhost:3000${selectedProduct.imageUrl}`} style={{ width: '300px', height: '300px' }} alt={selectedProduct.name}/>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <button className="ViewButton" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
  </>
  );
};

export default UserHomePage;
