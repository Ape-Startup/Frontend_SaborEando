document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    emailInput.addEventListener('input', validarFormulario);
    senhaInput.addEventListener('input', validarFormulario);

    function validarFormulario() {
        if (emailInput.value.trim() !== '' &&
            senhaInput.value.trim() !== '') {
            entrarButton.classList.add('ativo');
            entrarButton.classList.remove('desativado');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
        }
    }
});