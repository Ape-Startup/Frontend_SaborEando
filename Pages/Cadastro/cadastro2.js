document.addEventListener("DOMContentLoaded", function() {
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const telInput = document.getElementById('tel');
    const entrarButton = document.getElementById('entrarButton');

    nomeInput.addEventListener('input', validarFormulario);
    sobrenomeInput.addEventListener('input', validarFormulario);
    telInput.addEventListener('input', validarFormulario);

    function validarFormulario() {
        const nome = nomeInput.value.trim();
        const sobrenome = sobrenomeInput.value.trim();
        const tel = telInput.value.trim();

        if (nome !== '' && sobrenome !== '' && tel.length > 8) {
            entrarButton.classList.remove('desativado');
            entrarButton.classList.add('ativo');
            entrarButton.removeAttribute('disabled');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
            entrarButton.setAttribute('disabled', 'disabled');
        }
    }
});

