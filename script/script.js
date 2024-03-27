function carregarImagem() {
    fetch('https://niloweb.com.br/transit-room/api/reg_endpoint.php')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0 && data[0].res && data[0].dia) {
                const imagem = document.createElement('img');
                const condition = data[0].res;
                switch (condition) {
                    case 'A':
                        imagem.src = "images/amarela.png";
                        break;
                    case 'B':
                        imagem.src = "images/vermelho.png";
                        break;
                    case 'L':
                        imagem.src = "images/verde.png";
                        break;
                    default:
                        console.error('Condição desconhecida:', condition);
                }
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                imageContainer.appendChild(imagem);

                som();
            } else {
                console.error('Erro ao carregar imagem da API.');
            }
        })
        .catch(error => {
            console.error('Erro ao conectar à API:', error);
        });

    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
}

function exibirExplicacao() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharExplicacao() {
    document.getElementById('modal').style.display = 'none';
}

function som() {
    const audio = new Audio('sing/discord-notification.mp3');
    audio.onended = function() {};
    audio.play();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function carregarDashboardTransito() {
    fetch('https://niloweb.com.br/transit-room/api/reg_endpoint_all.php')
        .then(response => response.json())
        .then(data => {
            const trafficDashboard = document.getElementById('trafficDashboard');
            trafficDashboard.innerHTML = '';

            if (data.length > 0) {
                const table = document.createElement('table');
                const headerRow = document.createElement('tr');
                const headers = ['ID', 'Status', 'Horário'];
                
                headers.forEach(headerText => {
                    const header = document.createElement('th');
                    header.textContent = headerText;
                    headerRow.appendChild(header);
                });
                table.appendChild(headerRow);

                data.forEach(item => {
                    const row = document.createElement('tr');
                    Object.values(item).forEach(value => {
                        const cell = document.createElement('td');
                        cell.textContent = value;
                        row.appendChild(cell);
                    });
                    table.appendChild(row);
                });

                trafficDashboard.appendChild(table);
            } else {
                trafficDashboard.textContent = 'Não há informações de trânsito disponíveis.';
            }
        })
        .catch(error => {
            console.error('Erro ao conectar à API:', error);
        });
}

setInterval(carregarImagem, 60000);
window.onload = function() {
    carregarImagem();
    carregarDashboardTransito();
};