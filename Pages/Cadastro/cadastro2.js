const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const telInput = document.getElementById('tel');
const entrarButton = document.getElementById('entrarButton');

nomeInput.addEventListener('input', validarFormulario);
sobrenomeInput.addEventListener('input', validarFormulario);
telInput.addEventListener('input', validarFormulario);


function validarFormulario() {
    if (nomeInput.value.trim() !== '' &&
        sobrenomeInput.value.trim() !== ''&&
        telInput.value.length > 8) {
            entrarButton.classList.remove('desativado');
            entrarButton.classList.add('ativo');
    } else {
        entrarButton.classList.remove('ativo');
        entrarButton.classList.add('desativado');
    }
}


