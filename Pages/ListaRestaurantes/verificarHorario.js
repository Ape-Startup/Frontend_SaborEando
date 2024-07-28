// Horários de funcionamento dos restaurantes (no formato 24 horas)
const horarios = {
    //cotidiano
    restaurante1: { abre: 11, fecha: 23 }, // Bar do tonhao abre às 11h e fecha às 23h
    restaurante2: { abre: 7.30, fecha: 17 },   // Tapioca Rendada do Damião abre às 7:30h e fecha às 17h
    restaurante3: { abre: 10, fecha: 23 }, // Bar da Geralda abre às 10h e fecha às 23h
    restaurante4: { abre: 11, fecha: 16 },  // Beca Bar abre às 11h e fecha às 16h
    restaurante5: { abre: 11.30, fecha: 22 }, // Manguai abre às 11:30h e fecha às 22h
    restaurante6: { abre: 18, fecha: 24 },   // Esquina do Malte abre às 18h e fecha às 24h
    restaurante7: { abre: 11, fecha: 23 },  // João da Carne de Sol abre às 11h e fecha às 23h
    restaurante8: { abre: 11, fecha: 17 }, // Cantinho da Bel abre às 11h e fecha às 17h
    restaurante9: { abre: 18, fecha: 24 },   // Esquina do Malte abre às 18h e fecha às 24h

    //frutos do mar
    restaurante10: { abre: 11.30, fecha: 22 }, // Camarada Camarão abre às 11:30h e fecha às 22h
    restaurante11: { abre: 11.30, fecha: 21 },   // Nau abre às 11:30h e fecha às 21h
    restaurante12: { abre: 11.30, fecha: 22.30 }, // Vieira restaurante bar abre às 11:30h e fecha às 22:30h
    restaurante13: { abre: 11, fecha: 16 },  // Bar do cabo abre às 11h e fecha às 16h
    restaurante14: { abre: 11, fecha: 16 }, // ilha dos navegantes abre às 11h e fecha às 16h
    restaurante15: { abre: 11, fecha: 24 },   // Entre Amigos praia abre às 11h e fecha às 24h

    //Doces
    restaurante16: { abre: 8, fecha: 21 }, // casa dos frios abre às 8h e fecha às 21h
    restaurante17: { abre: 11.30, fecha: 16 },   // Tio pepe abre às 11:30h e fecha às 16h
    restaurante18: { abre: 11.30, fecha: 22 }, // parraxaxá abre às 11:30h e fecha às 22h
    restaurante19: { abre: 12, fecha: 23 },  // Terraço Capibaribe abre às 12h e fecha às 23h
    restaurante20: { abre: 9, fecha: 22 }, // Café Tão cafeteria abre às 9h e fecha às 22h
    restaurante21: { abre: 7.30, fecha: 17 },   // Tapioca Rendada do Damião abre às 7:30h e fecha às 17h
    restaurante22: { abre: 9, fecha: 22 },  // São Braz abre às 9h e fecha às 22h
    restaurante23: { abre: 15, fecha: 21 }, // Café mais prosa abre às 15h e fecha às 21h
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