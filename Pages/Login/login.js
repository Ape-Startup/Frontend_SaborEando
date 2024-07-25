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

        const token = localStorage.getItem('token')

        const loginDados = {
            email: emailInput.value,
            senha: senhaInput.value
        }

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDados)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Credenciais inválidas");
                console.log(loginDados);
            }
            else {
                localStorage.setItem('token', data.token);
                alert("Logado com sucesso");
                console.log(loginDados);
                console.log(data);    
                window.location.href = "../../Pages/Home/home.html"; // Replace 'outra_pagina.html' with the URL of the page you want to redirect to
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Ocorreu um erro ao tentar fazer login");
        });
    }
}



