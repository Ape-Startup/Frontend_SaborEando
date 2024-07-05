    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    emailInput.addEventListener('input', validarFormulario);
    senhaInput.addEventListener('input', validarFormulario);

    entrarButton.addEventListener('click', atualizarInfoAcesso);
    
    function validarFormulario() {
        if (emailInput.value.trim() !== '' &&
            senhaInput.value.trim() !== '') {
                entrarButton.classList.remove('desativado');
                entrarButton.classList.add('ativo');
                entrarButton.removeAttribute('disabled');
        } else {
            entrarButton.classList.remove('ativo');
            entrarButton.classList.add('desativado');
            entrarButton.setAttribute('disabled', 'disabled');
        }
    }


    function atualizarInfoAcesso() {
        console.log("chega a ativar")
        if (entrarButton.classList.contains('ativo')) {

            const AlterarAcesso = {
                email: emailInput.value,
                senha: senhaInput.value
            }
            fetch('http://localhost:3000/api/info-acesso/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(AlterarAcesso)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("Informações inválidas");
                    console.log(AlterarAcesso);
                } else {
                    alert("Informações de acesso atualizadas com sucesso");
                    console.log(AlterarAcesso);
                    console.log(data);    
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert("Ocorreu um erro ao tentar atualizar os dados de acesso");
            });
        }
    }
