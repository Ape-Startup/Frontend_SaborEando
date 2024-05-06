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

    function validarEmail(email) {
        return email !== '';
    }

    function validarSenha(senha) {
        return senha.length >= 6;
    }
});
