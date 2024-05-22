'use strict';

const limparFormulario = () => {
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cep').classList.remove('input-error'); // Reset the CEP input error state on clear
}

const preencherFormulario = (endereco) => {
    document.getElementById('cidade').value = endereco.localidade || '';
    document.getElementById('uf').value = endereco.uf || '';
}

const cepValido = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);

const formatarCep = (cep) => cep.replace(/\D/g, '');

const pesquisarCep = async () => {
    limparFormulario();
    
    const cepInput = document.getElementById('cep');
    let cep = cepInput.value;
    cep = formatarCep(cep);
    
    if (cep.length !== 8) {
        cepInput.classList.add('input-error');
        return;
    }
    
    if (!cepValido(cep)) {
        cepInput.classList.add('input-error');
        return;
    }
    
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
        cepInput.classList.remove('input-error');
    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.');
        cepInput.classList.add('input-error');
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
