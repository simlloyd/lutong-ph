const updateNavbar = () => {
    const user = getUser();
    const navAuth = document.getElementById('nav-auth');
    const navCart = document.getElementById('nav-cart');
    const navOrders = document.getElementById('nav-orders');
    const navLogout = document.getElementById('nav-logout');
    const navUser = document.getElementById('nav-user');

    if (isLoggedIn() && user) {
        if (navAuth) navAuth.style.display = 'none';
        if (navCart) navCart.style.display = 'block';
        if (navOrders) navOrders.style.display = 'block';
        if (navLogout) navLogout.style.display = 'block';
        if (navUser) navUser.textContent = `Hi, ${user.name}!`;
    } else {
        if (navAuth) navAuth.style.display = 'block';
        if (navCart) navCart.style.display = "none";
        if (navOrders) navOrders.style.display = 'none';
        if (navLogout) navLogout.style.display = 'none';
        if (navUser) navUser.textContent = '';
    }
};

document.addEventListener('DOMContentLoaded', updateNavbar);