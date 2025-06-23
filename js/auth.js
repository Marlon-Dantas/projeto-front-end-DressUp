// js/auth.js

// Função para verificar se o usuário está logado
export function isUserLoggedIn() {
    return sessionStorage.getItem('loggedInUser') !== null;
}

// Função para obter o usuário logado
export function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem('loggedInUser'));
}

// Função para fazer logout
export function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.reload(); // Recarrega a página para atualizar a UI
}

// Função para obter o carrinho de compras do localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Função para salvar o carrinho de compras no localStorage
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}