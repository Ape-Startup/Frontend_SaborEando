    //Token que armazena a identificação do usuario na pagina(backend)
    const token = localStorage.getItem('token');
    
    

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

    //Função do botão e backend
    function atualizarInfoAcesso(event) {
        event.preventDefault();

        
        if (entrarButton.classList.contains('ativo')) {

            const AlterarAcesso = {
                email: emailInput.value,
                senha: senhaInput.value
            }
            fetch('http://localhost:3000/api/info-acesso', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(AlterarAcesso)
            })
            .then(response => response.json())
                .then(data => {
                    
                if (data.error) {
                    if (data.error === 'Token inválido') {
                        window.location.href = '../../Pages/Login/login.html';
                        alert("Faça login novamente");
                    }
                    else {
                        alert(data.error);
                    }
                    
                    
                } else {
                    alert("Informações de acesso atualizadas com sucesso");
                    window.location.href = '../../Pages/Configuracao/configuracao.html';
                    //console.log(AlterarAcesso);
                    //console.log(data);    
                }
            })
            .catch(error => {
                alert(error);
                //alert("Ocorreu um erro ao tentar atualizar os dados de acesso");
            });
        }
    }
