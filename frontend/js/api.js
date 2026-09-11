const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const isLoggedIn = () => !!getToken();

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const register = async (userData) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
};

const login = async (userData) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if(data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.localStorage.href = 'index.html';
};

//  RESTAURANT FUNCTION

const getRestaurants = async () => {
    const response = await fetch(`${API_URL}/restaurants`);
    const data = await response.json();
    return data;
};

const getRestaurantById = async (id) => {
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    const data = await response.json();
    return data;
};

const getMenuItems = async (restaurantId) => {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}/menu`);
    const data = await response.json();
    return data;
};

//  CART FUNCTION

const getCart = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const addToCart = async (menuItemId, quantity) => {
    const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ menuItemId, quantity }), 
    });
    const data = await response.json();
    return data;
};

const removeFromCart = async (menuItemId) => {
    const response = await fetch(`${API_URL}/cart/item/${menuItemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

const clearCart = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
};

//  ORDER FUNCTION

const placeOrder = async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(orderData),
    });
    const data = await response.json();
    return data;
};

const getMyrders = async () => {
    const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    const data = await response.jaon();
    return data;
};