document.addEventListener('DOMContentLoaded', function () {
    // Selecionar os cards da seção "Na sua cidade"
    var nscCards = document.querySelectorAll('.section-nsc .content > div');

    // Adicionar evento de clique a cada card
    nscCards.forEach(function (card) {
        card.addEventListener('click', function () {
            // Obter os dados do card clicado
            var titulo = card.querySelector('.titulos .titulo').textContent;
            var data = card.querySelector('.titulos .data').textContent;
            var local = card.querySelector('.titulos .local').textContent;

            // Atualizar os elementos do modal com os dados do card clicado
            var modal = document.getElementById('modal');
            modal.querySelector('.modal-title').textContent = titulo;
            modal.querySelector('.modal-date').textContent = data;
            modal.querySelector('.modal-location').textContent = local;

            // Exibir o modal
            modal.style.display = 'block';
        });
    });

    // Selecionar o elemento de fechar do modal
    var closeBtn = document.querySelector('.modal .close');

    // Adicionar evento de clique ao botão de fechar
    closeBtn.addEventListener('click', function () {
        // Ocultar o modal ao clicar no botão de fechar
        var modal = document.getElementById('modal');
        modal.style.display = 'none';
    });
});