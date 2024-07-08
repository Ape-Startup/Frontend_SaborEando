
        // uso estrito por conta da validação do cep -- deixa o código menos propicio a erros 
        'use strict';

        // inicia com os campos limpos
        const limparFormulario = () => {
            document.getElementById('cidade').value = '';
            document.getElementById('uf').value = '';
            document.getElementById('cep').classList.remove('input-error');
        }

        // dados de endereco
        const preencherFormulario = (endereco) => {
            document.getElementById('cidade').value = endereco.localidade || '';
            document.getElementById('uf').value = endereco.uf || '';
        }

        // expressão regular para CEP
        const cepValido = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);

        const formatarCep = (cep) => cep.replace(/\D/g, '');

        // validação do cep 
        const pesquisarCep = async () => {
            limparFormulario();

            const cepInput = document.getElementById('cep');
            let cep = cepInput.value;
            cep = formatarCep(cep);

            // adiciona a class input-error que marca a borda do input de vermelho
            if (!cepValido(cep)) {
                cepInput.classList.add('input-error');
                return;
            }

            // API da validação
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erro ao buscar CEP');
                }

                const endereco = await response.json();
                if (endereco.hasOwnProperty('erro')) {
                    throw new Error('CEP não encontrado');
                } else {
                    preencherFormulario(endereco);
                }
                // remove o input error
                cepInput.classList.remove('input-error');
            
            } catch (error) {
                console.error(error);
                alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.');
                // adiciona a classe input error
                cepInput.classList.add('input-error');
                
            }
        }

        // Pesquisa cep quando o usuário sair do input CEP
        document.getElementById('cep').addEventListener('focusout', pesquisarCep);

        // verifica se os dados foram preenchidos
        function verificarCampos() {
            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const datNasc = document.getElementById('dat-nasc').value;
            const tel = document.getElementById('tel').value.trim();
            const pais = document.getElementById('pais').value;
            const cidade = document.getElementById('cidade').value.trim();
            const estado = document.getElementById('uf').value.trim();

            
            const entrarButton = document.getElementById('entrarButton');
            
            // Campos necessários para liberar o acesso do botão prosseguir  
            if (nome !== '' && sobrenome !== '' && tel !== '' && pais !== 'padrao') {
                entrarButton.classList.remove('desativado');
                entrarButton.classList.add('ativo');
                entrarButton.removeAttribute('disabled');
            } else {
                entrarButton.classList.remove('ativo');
                entrarButton.classList.add('desativado');
                entrarButton.setAttribute('disabled', 'disabled');
            }
        }

        // Campos verificados 
        document.getElementById('nome').addEventListener('input', verificarCampos);
        document.getElementById('sobrenome').addEventListener('input', verificarCampos);
        document.getElementById('tel').addEventListener('input', verificarCampos);
        document.getElementById('pais').addEventListener('change', verificarCampos);

        // função para mandar dados para o banco de dados MySQL
        // Criação de form
        function submitForm(event) {
            // Evita campos em brancos 
            event.preventDefault();
             
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const datNasc = document.getElementById('dat-nasc').value;
            const tel = document.getElementById('tel').value;
            const cep = document.getElementById('cep').value;
            const pais = document.getElementById('pais').value;
            const cidade = document.getElementById('cidade').value;
            const estado = document.getElementById('uf').value;

            // primeira parte dos dados(email e senha) salvos no storage no cadastro parte 1
            const firstPartData = JSON.parse(localStorage.getItem('cadastro'));

            // Forma do objeto 
            const cadastroData = {
                email: firstPartData.email,
                senha: firstPartData.senha,
                nome: nome,
                sobrenome: sobrenome,
                data_nascimento: datNasc,
                foto: null,
                cep: cep,
                pais: pais,
                estado: estado,
                cidade: cidade,
                telefone: tel
                
            };

            console.log('Dados completos do cadastro:', cadastroData);

            // Requisição para acesar a rorta de cadastro
            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cadastroData)
            })
            .then(response => response.json())
            .then(data => {
                
                // respostas 
                console.log('Resposta do backend:', data);
                alert('Cadastro realizado com sucesso!');
                localStorage.removeItem('cadastro');
                window.location.href = '../../Pages/Login/login.html';    //vai para a página de login
            })
            .catch((error) => {
                console.error('Erro ao enviar dados para o backend:', error);
                alert('Erro ao realizar o cadastro.');
            });
        }
   
