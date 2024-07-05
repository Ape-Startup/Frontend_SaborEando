
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const datNascInput = document.getElementById('dat-nasc');
    const telInput = document.getElementById('tel');
    const cepInput = document.getElementById('cep');
    const entrarButton = document.getElementById('entrarButton');

    nomeInput.addEventListener('input', validarFormulario);
    sobrenomeInput.addEventListener('input', validarFormulario);
    datNascInput.addEventListener('input', validarFormulario);
    telInput.addEventListener('input', validarFormulario);
    cepInput.addEventListener('input', validarFormulario);

    entrarButton.addEventListener('click', atualizarInfoPessoal);

    function validarFormulario() {
        if (nomeInput.value.trim() !== '' &&
            sobrenomeInput.value.trim() !== '' &&
            datNascInput.value.trim() !== '' &&
            telInput.value.trim() !== '' &&
            cepInput.value.trim() !== '') {
            entrarButton.classList.remove('desativado');
            entrarButton.classList.add('ativo');
            entrarButton.removeAttribute('disabled');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
            entrarButton.setAttribute('disabled', 'disabled');
        }
    }
    
    function atualizarInfoPessoal() {
        console.log("chega a ativar")
        if (entrarButton.classList.contains('ativo')) {

            const alterarDados = {
                nome: nomeInput.value,
                sobrenome: sobrenomeInput.value,
                data_nascimento: datNascInput.value,
                cep: cepInput.value,
                telefone: telInput.value
            }
            fetch('http://localhost:3000/api/info-pessoais/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alterarDados)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("Informações inválidas");
                    console.log(alterarDados);
                } else {
                    alert("Informações atualizadas com sucesso");
                    console.log(alterarDados);
                    console.log(data);    
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Ocorreu um erro ao tentar atualizar os dados");
            });
        }
    }

