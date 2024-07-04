
    function saveFirstPart(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const confirmEmail = document.getElementById('confirm-email').value;
            const senha = document.getElementById('senha').value;
            const confirmSenha = document.getElementById('confirm-senha').value;
    
            localStorage.setItem('cadastro', JSON.stringify({ email, senha }));
    
            console.log('Dados salvos na primeira parte:', email, senha);
            window.location.href = 'cadastro2.html';
        }
    
        function verificarEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const mensagemEmail = document.getElementById('mensagemEmail');

    if (email === '') {
        mensagemEmail.textContent = '';
        mensagemEmail.style.display = 'none';
        emailInput.classList.remove('input-com-erro');
        return;
    }

    if (!validarEmail(email)) {
        mensagemEmail.textContent = 'E-mail inválido';
        mensagemEmail.style.display = 'block';
        emailInput.classList.add('input-com-erro');
    } else {
        mensagemEmail.textContent = '';
        mensagemEmail.style.display = 'none';
        emailInput.classList.remove('input-com-erro');
    }
}

function verificarConfEmail() {
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirm-email');
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();
    const mensagemConfEmail = document.getElementById('mensagemConfEmail');

    if (email === '' || confirmEmail === '') {
        mensagemConfEmail.textContent = '';
        mensagemConfEmail.style.display = 'none';
        confirmEmailInput.classList.remove('input-com-erro');
        return;
    }

    if (email !== confirmEmail) {
        mensagemConfEmail.textContent = 'Os e-mails não coincidem';
        mensagemConfEmail.style.display = 'block';
        confirmEmailInput.classList.add('input-com-erro');
    } else {
        mensagemConfEmail.textContent = '';
        mensagemConfEmail.style.display = 'none';
        confirmEmailInput.classList.remove('input-com-erro');
    }
}

function verificarSenha() {
    const senhaInput = document.getElementById('senha');
    const senha = senhaInput.value.trim();
    const mensagemSenha = document.getElementById('mensagemSenha');

    if (senha === '') {
        mensagemSenha.textContent = '';
        mensagemSenha.style.display = 'none';
        senhaInput.classList.remove('input-com-erro');
        return;
    }

    if (!validarSenha(senha)) {
        mensagemSenha.textContent = 'Senha inválida';
        mensagemSenha.style.display = 'block';
        senhaInput.classList.add('input-com-erro');
    } else {
        mensagemSenha.textContent = '';
        mensagemSenha.style.display = 'none';
        senhaInput.classList.remove('input-com-erro');
    }
}

function verificarConfSenha() {
    const senhaInput = document.getElementById('senha');
    const confirmSenhaInput = document.getElementById('confirm-senha');
    const senha = senhaInput.value.trim();
    const confirmSenha = confirmSenhaInput.value.trim();
    const mensagemConfSenha = document.getElementById('mensagemConfSenha');

    if (senha === '' || confirmSenha === '') {
        mensagemConfSenha.textContent = '';
        mensagemConfSenha.style.display = 'none';
        confirmSenhaInput.classList.remove('input-com-erro');
        return;
    }

    if (senha !== confirmSenha) {
        mensagemConfSenha.textContent = 'As senhas não coincidem';
        mensagemConfSenha.style.display = 'block';
        confirmSenhaInput.classList.add('input-com-erro');
    } else {
        mensagemConfSenha.textContent = '';
        mensagemConfSenha.style.display = 'none';
        confirmSenhaInput.classList.remove('input-com-erro');
    }
}

function validarEmail(email) {
    // Lógica de validação de e-mail (pode ser uma expressão regular ou outra validação)
    return /\S+@\S+\.\S+/.test(email);
}

function validarSenha(senha) {
    // Lógica de validação de senha (por exemplo, mínimo de 6 caracteres, uma letra maiúscula, etc.)
    return senha.length >= 6 && /[A-Z]/.test(senha) && /[a-z]/.test(senha);
}

// Função para verificar o estado do botão e mostrar mensagens de erro ao sair do foco
function verificarCampos() {
    verificarEmail();
    verificarConfEmail();
    verificarSenha();
    verificarConfSenha();

    const entrarButton = document.getElementById('entrarButton');
    const emailValido = validarEmail(document.getElementById('email').value);
    const emailsIguais = document.getElementById('email').value === document.getElementById('confirm-email').value;
    const senhaValida = validarSenha(document.getElementById('senha').value);
    const senhasIguais = document.getElementById('senha').value === document.getElementById('confirm-senha').value;
    const checkboxChecked = document.getElementById('termos').checked;

    if (emailValido && emailsIguais && senhaValida && senhasIguais && checkboxChecked) {
        entrarButton.classList.remove('desativado');
        entrarButton.classList.add('ativo');
        entrarButton.removeAttribute('disabled');
    } else {
        entrarButton.classList.remove('ativo');
        entrarButton.classList.add('desativado');
        entrarButton.setAttribute('disabled', 'disabled');
    }
}

// Adicionar eventos de blur para verificar os campos apenas quando o usuário sair do campo
document.getElementById('email').addEventListener('blur', verificarEmail);
document.getElementById('confirm-email').addEventListener('blur', verificarConfEmail);
document.getElementById('senha').addEventListener('blur', verificarSenha);
document.getElementById('confirm-senha').addEventListener('blur', verificarConfSenha);
document.getElementById('termos').addEventListener('change', verificarCampos);

// Inicialmente verificar campos ao carregar a página
verificarCampos();



