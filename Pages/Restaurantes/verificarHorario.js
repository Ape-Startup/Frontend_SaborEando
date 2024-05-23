// Horários de funcionamento dos restaurantes (no formato 24 horas)
const horarios = {
    restaurante1: { abre: 10, fecha: 20 }, // Restaurante 1 abre às 10h e fecha às 20h
    restaurante2: { abre: 9, fecha: 17 }   // Restaurante 2 abre às 9h e fecha às 21h
    // Adicione mais restaurantes conforme necessário
};

// Função para verificar se o restaurante está aberto ou fechado
function verificarStatus() {
    const agora = new Date();
    const horaAtual = agora.getHours();

    for (const restauranteId in horarios) {
        if (horarios.hasOwnProperty(restauranteId)) {
            const restaurante = horarios[restauranteId];
            const statusElement = document.getElementById("status-" + restauranteId);

            if (statusElement) {
                if (horaAtual >= restaurante.abre && horaAtual < restaurante.fecha) {
                    statusElement.textContent = "Aberto agora";
                    statusElement.classList.remove("fechado");
                    statusElement.classList.add("aberto");
                } else {
                    statusElement.textContent = "Fechado agora";
                    statusElement.classList.remove("aberto");
                    statusElement.classList.add("fechado");
                }
            } else {
                console.error("Elemento de status não encontrado para o restaurante: " + restauranteId);
            }
        }
    }
}

// Atualizar o status inicialmente
document.addEventListener("DOMContentLoaded", function() {
    verificarStatus();
    // Atualizar o status a cada minuto para manter o status atualizado
    setInterval(verificarStatus, 60000); // 60000 milissegundos = 1 minuto
});