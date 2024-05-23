const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const entrarButton = document.getElementById('entrarButton');

emailInput.addEventListener('input', validarFormulario);
senhaInput.addEventListener('input', validarFormulario);

function validarFormulario() {
    if (emailInput.value.trim() !== '' && senhaInput.value.trim() !== '') {
        entrarButton.classList.add('active');
        entrarButton.removeAttribute('disabled');
    } else {
        entrarButton.classList.remove('active');
        entrarButton.setAttribute('disabled', 'disabled');
    }
}

function redirecionar() {
    if (entrarButton.classList.contains('active')) {
        window.location.href = "../../Pages/Home/home.html"; // Replace 'outra_pagina.html' with the URL of the page you want to redirect to
    }
} 
