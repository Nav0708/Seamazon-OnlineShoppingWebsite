import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '/src/logo.png';
import '/src/style/cart.css';
import { useNavigate, NavLink,useLocation } from 'react-router-dom';
import { FaSadTear  } from 'react-icons/fa';

const getQuantity = async (productId) => {
  try {
      const Id=productId._id;
      const response = await axios.get(`http://localhost:3000/product/${Id}`);
      if (response.data.success) {
          return response.data.quantity
      } else {
        console.error('Error fetching data:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
};

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const [number, setNumber] = useState(1);
    const [quantities, setQuantities] = useState([]);
    const [counters, setCounters] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        if (!email) {
          console.error('No email found in session storage');
          return;
        }
        const response = await axios.get(`http://localhost:3000/cart/${email}`);
        if (response.data.success) {
          const cartdata=(response.data.cartData);
          setProducts(cartdata);
          console.log(cartdata);
          //console.log(getQuantity(products.productId));
          const quantitiesArray= await Promise.all(response.data.cartData.map(product => getQuantity(product.productId)));
          console.log(quantitiesArray);
          setQuantities(quantitiesArray);
          console.log(quantities);
          const counters = response.data.cartData.map(i => i = 1);
          console.log(counters);
          setCounters(counters);
        } else {
          console.error('Error fetching data:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [orderPlaced]);

  useEffect(() => {
    // Log the quantities after they have been updated
    console.log('Quantities updated:', quantities);
  }, [quantities]);

const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
};

const handlePlaceOrder = async (productId, productName, userEmail, quantity) => {
    try {
      if (!selectedPayment) {
        alert('Please select a payment method');
        return;
        }
        const id=productId._id;
        console.log("products",productId,userEmail,productName);
        const response = await axios.delete(`http://localhost:3000/cart/${userEmail}/${id}`);
        await axios.patch(`http://localhost:3000/product/${id}/${quantity}`)
        if (response.data.success) {
          setOrderPlaced(!orderPlaced);
          alert(`Order Placed, Your ${productName} is on the way `)
          navigate('/home');
        } else {
          console.error('Error fetching data:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
};

  
const toHome = async () => {
    try {
      navigate('/home'); 
    } catch (error) {
      console.error('Error:', error.message);
    }
};

const updateQuantity = (index, value) => {

    setCounters(prevCounters => {
        const newCounters = [...prevCounters];
        newCounters[index] = Math.max(1, Math.min(quantities[index], newCounters[index] + value));
        console.log(newCounters);
        return newCounters;
      });
};

useEffect(() => {
  console.log('Counter is  updated:', counters);
}, [counters]);

if (products.length === 0) {
  return (
    <>
      <div className="p-3 m-0 border-0 bd-example m-0 border-0">
          <NavLink to='/' class="navbar-brand" href="#"><img src={logo} alt="Logo" style={{ marginLeft: '10px', marginTop: '10px', width: '250px', height: '100px' }} /> </NavLink>
      <h2>Shopping Cart</h2>
      <p>Your Cart is Empty.  <FaSadTear /></p>
      
      <button style={{backgroundColor: 'rgb(216, 169, 17)', border: '1px solid #141313'}}onClick={toHome} className="cart">Go to Home</button>
    </div>
    </>
  );
}
return (
  <>
  <div className="p-3 m-0 border-0 bd-example m-0 border-0">
  <NavLink to='/home' class="navbar-link" href="#"><img src={logo} alt="Logo" style={{ marginLeft: '10px', marginTop: '10px', width: '250px', height: '100px' }} /> </NavLink>
    <h2 className="cart-heading">Shopping Cart</h2>
  <div className="cart-container">
    {products.length === 0 ? (
      <div className="empty-cart">
        <p>Your Cart is Empty!</p>
        <button  style={{backgroundColor: 'rgb(216, 169, 17)', border: '1px solid #141313'}} onClick={toHome} className="cart">Back to Home</button>
      </div>
    ) : (
      <div>
        <ul className="cart-list">
          {products.map((product, index) => (
            <li key={product.productId || index} className="cart-item">
              <div className="product-details">
                <div className="product-name"><h5>{product.name}</h5></div>
                <div className="product-price"><h5>${product.price}</h5></div>
              </div>
              <div className="quantity-container">
                <button className="quantity-btn" onClick={() => updateQuantity(index, -1)}>-</button>
                <h3>{counters[index]}</h3>
                <button className="quantity-btn" onClick={() => updateQuantity(index, 1)}>+</button>
              </div>
              <div className="total-price"><h4>Total Price ${Math.floor((product.price * counters[index]) * 100) / 100}</h4></div>
              <div className="payment-selection" style={{color: 'blue'}}>
                  <h5><input type="radio"
                         value="creditCard"
                         checked={selectedPayment === 'creditCard'}
                         onChange={handlePaymentChange}/>Credit Card</h5>
                    <h5><input
                      type="radio"
                      value="paypal"
                      checked={selectedPayment === 'paypal'}
                      onChange={handlePaymentChange}
                    />PayPal</h5>
                  <h5><input
                      type="radio"
                      value="bankTransfer"
                      checked={selectedPayment === 'bankTransfer'}
                      onChange={handlePaymentChange}
                    />Bank Transfer</h5>
                  <div className="selected-payment">
                    {selectedPayment && <p>Selected Payment Method: {selectedPayment}</p>}
                  </div>
                </div>
                <button className="order-btn" onClick={() => handlePlaceOrder(product.productId, product.name, product.userId, quantities[index] - counters[index])}>Place Order</button>  
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  <button  style={{backgroundColor: 'rgb(216, 169, 17)', border: '1px solid #141313'}} onClick={toHome} className="cart">Back to Home</button>
  </div>
  </>
);
};

export default CartPage;



