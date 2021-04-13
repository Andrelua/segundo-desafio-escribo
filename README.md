# segundo-desafio-escribo
Implementação da parte lógica e a interface do jogo indiano “Cobras e Escadas”

## :computer: Como rodar ?

### Primeira etapa.
Como eu utilizei o VsCode baixei uma extenção chamada **Open in default browser**.
Com ele posso criar um servidor local, para poder abrir páginas html.

### Segunda etapa.
Para abrir o servidor local basta clicar com o botão direito do mouse na página **cobras_escadas.html**.
E clicar nesta opção:

![](/img_game/server.png)

### Terceira etpa.
Antes do game iniciar ele pergunta o nome dos jogadores:

![](/img_game/alertName.png)

## :man_technologist: Algumas funcionalidades que eu fiz.

### No início do jogo o jogador do turno tem que clicar, toda vez, em qualquer lugar da tela para se mover.

![](/img_game/antes_inicio.png)

### Em meio ao jogo irá aparecer qual o valor do primeiro, segundo dado e qual o resultado de sua soma, juntamente com a posição atual do jogador.

![](/img_game/em_meio.png)

### Quando o jogo finaliza aparece a seguinte mensagem:

![](/img_game/endGame.png)

### Se o jogador que perdeu tentar jogar aparecerá a seguinte mensagem:

![](/img_game/AcabouOgame.png)

### Quando os dois dados derem valores iguais aparecerá a seguinte mensagem:

![](/img_game/alertNovamente.png)

#### Consequentemente o jogador irá jogar novamente.

### Quando a posição do jogador for igual a uma cabeça de cobra, irá aparecer a seguinte mensagem: 

![](/img_game/alertCobra.png)

#### Consequentemente o jogador irá regressar as casas do corpo da cobra.

### Quando a posição do jogador for igual a o início de uma escada, irá aparecer a seguinte mensagem: 

![](/img_game/alertEscada.png)

#### Consequentemente o jogador irá avançar as casas do corpo da escada.


#### PS: Utilizei tudo que eu conhecia sobre os efeitos e animações para deixar o jogo mais interativo possível, essa é uma stack que tenho que melhorar. Por último, eu usei um módulo que achei na internet para consegui facilitar a criação do tabuleiro e dos objetos. Sinto que não segui alguns requisitos funcionais.
