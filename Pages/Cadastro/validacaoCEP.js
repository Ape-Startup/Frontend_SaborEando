'use strict'; // Ativa o modo estrito do JavaScript para escrever um código mais seguro e menos propenso a erros.

const limparFormulario = () => {
    // Função para limpar os campos do formulário de cidade e estado.
    document.getElementById('cidade').value = ''; // Limpa o campo da cidade.
    document.getElementById('estado').value = ''; // Limpa o campo do estado.
    document.getElementById('cep').classList.remove('input-error'); // Remove a classe de erro do campo de CEP.
}

const preencherFormulario = (endereco) => {
    // Função para preencher os campos do formulário com os dados do endereço.
    document.getElementById('cidade').value = endereco.localidade || ''; // Preenche o campo da cidade com o valor obtido, ou deixa vazio se não houver.
    document.getElementById('uf').value = endereco.uf || ''; // Preenche o campo do estado com o valor obtido, ou deixa vazio se não houver.
}

const cepValido = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);
// Função para validar o CEP. Verifica se tem 8 dígitos e se são todos números.

const formatarCep = (cep) => cep.replace(/\D/g, '');
// Função para formatar o CEP. Remove todos os caracteres não numéricos.

const pesquisarCep = async () => {
    limparFormulario(); // Limpa o formulário antes de iniciar a pesquisa.

    const cepInput = document.getElementById('cep'); // Obtém o elemento do input de CEP.
    let cep = cepInput.value; // Obtém o valor do CEP.
    cep = formatarCep(cep); // Formata o CEP para remover caracteres não numéricos.

 
    if (!cepValido(cep)) { // Verifica se o CEP é válido.
        cepInput.classList.add('input-error'); // Adiciona a classe de erro se o CEP for inválido.
        return; // Sai da função.
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`; // URL para buscar o CEP na API ViaCEP.

    try {
        const response = await fetch(url); // Faz a requisição para a API ViaCEP. / await não é diretamente aplicado a uma constante e sim a chamadas assíncronas que retornam promises. / função await espera que essas operações assíncronas sejam concluídas antes de continuar com o código síncrono subsequente.
        if (!response.ok) { // Verifica se a resposta não é OK.
            throw new Error('Erro ao buscar CEP'); // Lança um erro se a resposta não for OK.
        }

        const endereco = await response.json(); // Converte a resposta para JSON.
        if (endereco.hasOwnProperty('erro')) { // Verifica se o JSON retornou um erro.
            throw new Error('CEP não encontrado'); // Lança um erro se o CEP não for encontrado.
        } else {
            preencherFormulario(endereco); // Preenche o formulário com os dados do endereço.
        }
        cepInput.classList.remove('input-error'); // Remove a classe de erro do input de CEP.
    
    } catch (error) {
        console.error(error); // Loga o erro no console.
        alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.'); // Exibe um alerta com o erro.
        cepInput.classList.add('input-error'); // Adiciona a classe de erro ao input de CEP.
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
// Adiciona um event listener ao campo de CEP para disparar a função de pesquisa quando o campo perde o foco.


