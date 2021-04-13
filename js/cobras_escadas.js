import {Canvas2dGraphics} from "./sandy-module-canvas.js";
const canvas = document.getElementById('canvas'),
    _canvasObj = new Canvas2dGraphics(canvas),
    WIDTH = 500,
    HEIGHT = 500,
    numCol = 10,
    numRow = 10,
    boxSize = WIDTH/numCol,
    corJogador1 = '#ffffff', // Cor do jogador 1 
    corJogador2 = '#000000', // Cor do jogador 2
    cardStatus = document.createElement('canvas'),
    _canvasPlayerObj = new Canvas2dGraphics(cardStatus);

// Variáveis

var boxArr = [],
    x = 0,
    y = (numRow-1)*boxSize,
    dir = 1,
    snake1 = new Image(),
    snake2 = new Image(),
    snake3 = new Image(),
    snake4 = new Image(),
    ladder1 = new Image(),
    ladder2 = new Image(),
    ladder3 = new Image(),
    ladder4 = new Image(),
    jogador1 = new Jogador(corJogador1, 'Luiz'), // Instância do jogador 1
    jogador2 = new Jogador(corJogador2, 'José'), // Instância do jogador 2
    jogador1Turno = Math.random()<0.5?false:true;

snake1.src = './img/snake1.png';
snake2.src = './img/snake2.png';
snake3.src = './img/snake1.png';
snake4.src = './img/snake3.png';

ladder1.src = './img/ladder1.png';
ladder2.src = './img/ladder1.png';
ladder3.src = './img/ladder1.png';
ladder4.src = './img/ladder1.png';

canvas.width = WIDTH;
canvas.height = HEIGHT;
cardStatus.width = 300;
cardStatus.height = 300;
cardStatus.style.background='#8585ad';
cardStatus.style.float='left';
cardStatus.style.marginRight='10px';
document.body.appendChild(cardStatus);

// Desenhando os retângulos.

for (let i = 0; i < numCol*numRow; i++){
    boxArr.push(new Box(x, y, boxSize, i));
    x = x+boxSize*dir;

    if(x>=WIDTH || x<=-boxSize){
        dir *= -1;
        x += boxSize*dir;
        y -= boxSize;
    }
}

window.addEventListener('click', Jogar);
window.addEventListener('keydown', (e) => {
    if(e.keyCode==13){
        window.location.reload();
    }
})

// Função que exibe o card de status atual do jogo (EX: De quem é o turno, Qual é a cor de cara jogador e seu respectivo nome).

function statusDetalhados() {
    _canvasPlayerObj.ClearCanvas(0, 0, cardStatus.width, cardStatus.height);

    _canvasPlayerObj.FillText('Jogador '+jogador1.nome, 20, 30, corJogador1, '25px Arial');
    _canvasPlayerObj.FillCircle(270, 20, boxSize/3, 0, 2*Math.PI, false, corJogador1);

    _canvasPlayerObj.FillText('Jogador '+jogador2.nome, 20, 70, corJogador2, '25px Arial');
    _canvasPlayerObj.FillCircle(270, 60, boxSize/3, 0, 2*Math.PI, false, corJogador2);

    // Mostrar de quem é o turno

    if (jogador1Turno) {
        _canvasPlayerObj.FillText("Turno do jogador "+jogador2.nome, 20, 120, corJogador2, '25px Arial');
    } else {
        _canvasPlayerObj.FillText("Turno do jogador "+jogador1.nome, 20, 120, corJogador1, '25px Arial');
    }

    // Mostrar o valor dos dados

    

}

// Função do game

function Jogar() {
    if (jogador1Turno) {
        Borda();
        LoadCobraseEscadas();
        jogador1.jogarDado();
        jogador1.avatar();
        jogador2.avatar();
        jogador1Turno = false;
    } else {
        Borda();
        LoadCobraseEscadas();
        jogador2.jogarDado();
        jogador2.avatar();
        jogador1.avatar();
        jogador1Turno = true;
    }
}

// Função do Player.

function Jogador(color, nome) {
    this.posicao = 0;
    this.color = color;
    this.nome = nome;
    this.ativo = false;

    this.jogarDado = function() {
        statusDetalhados();
        let r = Math.floor((Math.random() * 6) + 1); // Valor do dado (1 - 6)

        if (r == 1) {
            this.ativo = true;
        }

        if (r <= (boxArr.length - 1)-this.posicao && this.ativo){
            this.posicao+=r;
        }

        // Verificando se ele é o vencedor
        if (this.posicao == boxArr.length-1){
            alert("O jogador "+this.nome+" venceu!! \n Por favor, precione ENTER para recomeçar.");
        }
    }
    // Representação do avatar (Se for na posição onde é a cabeça da cobra, ele regressa, se for na posição do início da escada, ele avança.)
    this.avatar = function () {
        let posicaoAtual = boxArr[this.posicao];
        if (this.posicao == 58) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 1;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 98) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 25;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 85) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 32;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 31) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 8;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 20) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 40;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 16) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 55;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 6) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 34;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else if (this.posicao == 30) {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            this.posicao = 92;
            setTimeout(() => {
                posicaoAtual = boxArr[this.posicao];
                _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
            }, 200)
        } else {
            _canvasObj.FillCircle(posicaoAtual.x+posicaoAtual.tamanho/2, posicaoAtual.y+posicaoAtual.tamanho/2, boxSize/3, 0, 2*Math.PI, false, this.color);
        }
    }
}

// Função para desenha as cobras e as escadas.

function LoadCobraseEscadas() {
    _canvasObj.DrawImageWH(snake1, boxSize*1, boxSize*4.5, 80, 250);
    _canvasObj.DrawImageWH(snake2, boxSize*1, 0, 230, 400);
    _canvasObj.DrawImageWH(snake3, boxSize*8, boxSize*6.3, 80, 180);
    _canvasObj.DrawImageWH(snake4, boxSize*5, boxSize*1.2, 150, 280);
    _canvasObj.Save();
    _canvasObj.Rotate(0.25);
    _canvasObj.DrawImageWH(ladder1, boxSize*5, boxSize*3, 30, 220);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.25);
    _canvasObj.DrawImageWH(ladder2, boxSize*7.12, boxSize*2.5, 30, 320);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.2);
    _canvasObj.DrawImageWH(ladder3, boxSize*4, boxSize*7.1, 30, 180);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.DrawImageWH(ladder4, boxSize*0.1, boxSize*5, 27, 145);
    _canvasObj.Restore();
}


/**
 * Função que retorna o desenho das caixas(Retângulos), mas a cor do desenho vária de acordo com as posições das caixas(Retângulos).
 * Cores:
 * '#00BFFF' // DeepSkyBlue
 * '#836FFF' // SlateBlue1
 * '#4682B4' // SteelBlue
 * '#00FF7F' // SpringGreen
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} tamanho 
 * @param {*} index 
 */

function Box (x, y, tamanho, index){
    this.x=x;
    this.y=y;
    this.tamanho=tamanho;
    this.index=index;

    if(this.index % 4 == 1){
        this.color = '#00BFFF';
    } else if(this.index % 4 == 2){
        this.color = '#836FFF';
    } else if(this.index % 4 == 3){
        this.color = '#4682B4';
    } else {
        this.color = '#00FF7F';
    }
}

Box.prototype.drawBox=function(){
    _canvasObj.FillRectangle(this.x, this.y, this.tamanho, this.tamanho, this.color); // Chamando o objeto do canvas e preenchendo o retângulo.
    _canvasObj.FillText(this.index+1, this.x+this.tamanho/1.5, this.y+this.tamanho/4, '#000', '10px Arial'); // Chamando o objeto do canvas e preenchendo o texto.
}


/**
 * Função que desenha a borda da caixa e exibe na tela, através do módulo exportado e usando a array criada acima para armazenar o x
 *  e o y.
 */
function Borda() {
    boxArr.forEach((b)=>{
        b.drawBox();
    })
}

window.onload = function () { 
    Borda();
    LoadCobraseEscadas();
    jogador1.avatar();
    jogador2.avatar();
    statusDetalhados();
}

