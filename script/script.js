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

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

setInterval(carregarImagem, 2000);

window.onload = carregarImagem;