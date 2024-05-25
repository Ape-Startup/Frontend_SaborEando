document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementsByName('email')[0];
    const confirmEmailInput = document.getElementsByName('confirm-email')[0];
    const senhaInput = document.getElementsByName('senha')[0];
    const confirmSenhaInput = document.getElementsByName('confirm-senha')[0];
    const checkboxInput = document.querySelector('.ui-checkbox');
    const entrarButton = document.getElementById('entrarButton');

    emailInput.addEventListener('input', validarFormulario);
    confirmEmailInput.addEventListener('input', validarFormulario);
    senhaInput.addEventListener('input', validarFormulario);
    confirmSenhaInput.addEventListener('input', validarFormulario);
    checkboxInput.addEventListener('change', validarFormulario);

    function validarFormulario() {
        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmSenha = confirmSenhaInput.value.trim();
        const checkboxChecked = checkboxInput.checked;

        const emailValido = validarEmail(email);
        const emailsIguais = email === confirmEmail;
        const senhaValida = validarSenha(senha);
        const senhasIguais = senha === confirmSenha;
        const temMaiuscula = /[A-Z]/.test(senha);
        const temMinuscula = /[a-z]/.test(senha);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

        if (emailValido && emailsIguais && senhaValida && senhasIguais && checkboxChecked && temMaiuscula && temMinuscula && emailRegex) {
            entrarButton.classList.remove('desativado');
            entrarButton.classList.add('ativo');
            entrarButton.removeAttribute('disabled');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
            entrarButton.setAttribute('disabled', 'disabled');
        }
    }

    function validarEmail(email) {
        return email !== '';
    }
    

    function validarSenha(senha) {
        return senha.length >= 6;
    }

    function senhaOK() {
        const senha = senhaInput.value.trim();
        const temMaiuscula = /[A-Z]/.test(senha);
        const temMinuscula = /[a-z]/.test(senha);

        if (senha.length < 6) {
            mensagemSenha.textContent = null;
            senhaInput.classList.add('erro');
            senhaInput.classList.remove('ativo');
            mensagemSenha.textContent = "Senha precisa de pelo menos 6 caracteres";
        } else if (!temMaiuscula) {
            mensagemSenha.textContent = null;
            senhaInput.classList.add('erro');
            senhaInput.classList.remove('ativo');
            mensagemSenha.textContent = "A senha precisa ter uma letra maiúscula"
        } else if (!temMinuscula) {
            mensagemSenha.textContent = null;
            senhaInput.classList.add('erro');
            senhaInput.classList.remove('ativo');
            mensagemSenha.textContent = "A senha precisa ter uma letra minúscula";
        } else {
            mensagemSenha.textContent = null;
            senhaInput.classList.remove('erro');
            senhaInput.classList.add('sucesso');
        }
    }
    
    function emailOK() {

        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

        if (!emailRegex) {
            mensagemEmail.textContent = null;
            emailInput.classList.add('erro');
            emailInput.classList.remove('ativo');
            mensagemEmail.textContent = "O formato do email é inválido";
        }
        else {
            mensagemEmail.textContent = null;
            emailInput.classList.remove('erro');
            emailInput.classList.add('sucesso');
        }

    }

    function emailCorreto() {

        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        const emailsIguais = email === confirmEmail;

        if (!emailsIguais) {
            mensagemConfEmail.textContent = null
            confirmEmailInput.classList.add('erro');
            confirmEmailInput.classList.remove('ativo');
            mensagemConfEmail.textContent = "Os emails não são iguais";
        }
        else {
            mensagemConfEmail.textContent = null
            confirmEmailInput.classList.remove('erro');
            confirmEmailInput.classList.add('sucesso');
        }
    }

    function senhaCorreta() {

        const senha = senhaInput.value.trim();
        const confirmSenha = confirmSenhaInput.value.trim();
        const senhasIguais = senha === confirmSenha;

        if (!senhasIguais) {
            mensagemConfSenha.textContent = null;
            confirmSenhaInput.classList.add('erro');
            confirmSenhaInput.classList.remove('ativo');
            mensagemConfSenha.textContent = "As senhas não são iguais";
        }
        else {
            mensagemConfSenha.textContent = null;
            confirmSenhaInput.classList.remove('erro');
            confirmSenhaInput.classList.add('sucesso');
        }
    }

    senhaInput.addEventListener('input', senhaOK);
    emailInput.addEventListener('input', emailOK);
    confirmEmailInput.addEventListener('input', emailCorreto);
    confirmSenhaInput.addEventListener('input', senhaCorreta);
    
});




