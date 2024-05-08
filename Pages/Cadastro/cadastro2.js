    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const datNascInput = document.getElementById('dat-nasc');
    const telInput = document.getElementById('tel');
    const cepInput = document.getElementById('cep');
    const paisSelect = document.getElementById('pais');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const entrarButton = document.getElementById('entrarButton');

    nomeInput.addEventListener('input', validarFormulario);
    sobrenomeInput.addEventListener('input', validarFormulario);
    datNascInput.addEventListener('input', validarFormulario);
    telInput.addEventListener('input', validarFormulario);
    cepInput.addEventListener('input', validarFormulario);
    paisSelect.addEventListener('input', validarFormulario);
    cidadeInput.addEventListener('input', validarFormulario);
    estadoInput.addEventListener('input', validarFormulario);

    function validarFormulario() {
        if (nomeInput.value.trim() !== '' &&
            sobrenomeInput.value.trim() !== '' &&
            datNascInput.value.trim() !== '' &&
            telInput.value.trim() !== '' &&
            cepInput.value.trim() !== '' &&
            paisSelect.value !== 'padrao' &&
            cidadeInput.value.trim() !== '' &&
            estadoInput.value.trim() !== '') {
            entrarButton.classList.add('ativo');
            entrarButton.removeAttribute('desativado');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
            
        }
    }

