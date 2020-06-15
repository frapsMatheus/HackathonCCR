# Zap na Estrada

<div align="center">
  <img alt="Logo" title="#logo" width="300px" src="logo.png">
  <br><br>
</div>

Partindo do princípio de que dos 87.7% dos caminhoneiros que usam a internet, 98.1% utilizam o Whatsapp, o Zap na Estrada surge para criar um clube de recomendação com prêmios. O Zap na estrada é um sistema de mensageria com diversos serviços integrados, utilizando como banco de dados o Google Spreadsheet e arquivos auxiliares do Google Scripts para _side-effects_. Os arquivos do Google Scripts são baseados em Javascript.

# Índice

- [Sobre](#sobre)

- [Tecnologias](#tecnologias-utilizadas)

- [Arquivos](#arquivos)

- [Serviços Integrados (APIs)](#apis)

<a  id="sobre"></a>

## :bookmark: Sobre

Partindo do princípio de que dos 87.7% dos caminhoneiros que usam a internet, 98.1% utilizam o Whatsapp, o Zap na Estrada surge para criar um clube de recomendação com prêmios. O Zap na estrada é um sistema de mensageria com diversos serviços integrados, utilizando como banco de dados o Google Spreadsheet e arquivos auxiliares do Google Scripts para _side-effects_. Os arquivos do Google Scripts são baseados em Javascript.

O caminhoneiro se inscreve em um formulário construído com [JotForm](https://www.jotform.com/). Ao submeter os dados do formulário, o JotForm envia uma requisição para o nosso sistema, onde serão salvos as informações do caminhoneiro. A partir disso, disparamos uma mensagem utilizando o serviço de mensagens da [Twillio](https://www.twilio.com/). Essa mensagem contêm o link de compartilhamento desse caminhoneiro! Com esse link, ele pode enviar para seus contatos de profissão próximos fazendo com que ele ganhe cupons para concorrer a prêmios incríveis. Vale a pena ressaltar que para tornar o link mais amigável, foi utilizada a API da [Rel Ink](https://rel.ink/).

Após a primeira interação do caminhoneiro com a plataforma, enviamos uma mensagem convidando-o para realizar uma triagem. Ao preencher o formulário de triagem, que também é feito com JotForm, uma requisição é feita para nosso sistema, onde salvamos os dados referentes à resposta da triagem e redirecionamos o caminhoneiro para uma página do [YouCanBookMe](https://youcanbook.me/) para agendar uma consulta de telemedicina.

Ao marcar a consulta, o sistema da YouCanBookMe dispara um POST request para o nosso sistema, configurado a partir de um webhook, com o horário da consulta. Assim, conseguimos tratar o horário e agendar uma ligação no [Zoom](https://zoom.us/) para o usuário.

<a  id="tecnologias-utilizadas"></a>

## :rocket: Tecnologias Utilizadas

### Banco de dados

Como descrito, nosso banco de dados foi desenvolvido utilizando uma planilha do Google Spreadsheets. O link para a planilha é https://docs.google.com/spreadsheets/d/1RBXWmCdWVsXg61Y7Co-0JK9ev876LGKNN1w4df9H9DY/edit?usp=sharing.

### Dashboard

Para compilarmos os dados e mostrarmos para tomados de decisão, criamos um app com dashboard para acompanhamento dos dados que são levantados a partir do preenchimento dos formulários de cadastro e triagem. Para acessar o app: [https://hackathon-ccr.glideapp.io/full](https://hackathon-ccr.glideapp.io/full)

<a  id="arquivos"></a>

## :pencil: Arquivos

### Whatsapp.gs

Esse arquivo configura a API do _Twillio_ com o token correto e uma mensagem de template. Além disso, cria uma classe responsável pela função de enviar a mensagem para os números cadastrados.

### FirstMessage.gs

Controla o envio da mensagem inicial para o primeiro contato cadastrado.

### NewMessage.gs

NewMessage é uma classe utilizada para cadastrar o link de recomendação dos caminhoneiros em nosso banco de dados e mandar mensagens específicas no momento da criação desses registros.

### NewUser.gs

Formata os dados dos caminhoneiros para inserção dos registros no banco de dados. Nesse arquivo também verificamos quem recomendou a inscrição do caminhoneiro, atribuindo os pontos para ele.

### OnEditRow.gs

OnEditRow é um gatilho. Assim que uma tabela específica for modificada, uma mensagem nova é enviada para a base de dados.

### CuponsCheckup.gs

CuponsCheckup envia uma mensagem reportando quantos cupons o caminhoneiro possui.

### Redirect.gs

O arquivo Redirect.gs recebe todas as requisições GET do sistema, as trata e decide o comportamento que será seguido, como por exemplo agendar uma ligação no Zoom, redirecionar para uma página de agendamentos online ou para a própria página da CCR.

### RestPost.gs

Restpost.gs recebe todas as requisições POST do sistema e, assim como Redirect.gs, as trata e redireciona o caminhoneiro para o serviço de agendamento (YouCanBookMe) ou para o site oficial da CCR.

### Triagem.gs

Triagem.gs trata os campos submetidos por cada caminhoneiro no formulário de triagem. Assim, conseguimos trabalhar esses dados para gerar um html com essas informações que será embutido em um QRCode enviado para o caminhoneiro.

### TriagemJob.gs

Esse arquivo verifica quais caminhoneiros ainda não receberam o convite para triagem e dispara uma mensagem convidando-os.

### YouCanBookMe.gs

YouCanBookMe.gs é responsável por receber os dados de horário da API do YouCanBookMe e formata-los de uma maneira mais amigável para o caminhoneiro.

### ZoomAPI.gs

Utilizada para fazer uma requisição POST para a API do Zoom para marcar uma ligação referente ao agendamento feito no YouCanBookMe.

### URLShortener.gs

O URLShortener é uma classe responsável por fazer uma requisição para o serviço de encurtador de link Relink e retornar o resultado da requisição.

### QRCodeAPI.gs

QRCodeAPI retorna a URL da imagem do QRCode referente às informações colhidas no momento da triagem.

<a  id="apis"></a>

## :wrench: Serviços Integrados

### Google Spreadsheets

A aplicação utiliza como banco de dados o Google Spreadsheet, ferramenta de criação de planilhas da Google. Para a automatização de algumas tarefas, utilizamos Google script (formato `.gs`).

### Twillio

Twillio é uma API de mensagens que permite a integração com o Whatsapp. Com ele, conseguimos automatizar o envio de mensagens para essa plataforma, facilitando a comunicação com o usuário.

### Jotform

Jotform é um site que permite a criação de formulários de contato utilizando _Drag and drop_. O Jotform foi utilizado para cadastrar caminhoneiros novos em nosso sistema, além de ser utilizado no momento da triagem.

### You Can Book Me

You can Book me é um sistema de reservas de online para que pessoas interessadas possam marcar horários específicos diretamente no próprio site. Esse serviço foi integrado no momento em que o caminhoneiro deseja marcar uma consulta logo após o momento da triagem.

### Glide App

Glide app permite com que seja criado um app consumindo dados de uma planilha do Google Spreadsheets. Sendo assim, utilizamos para consumir os dados resultantes da triagem que geram dashboards para os gestores fazerem o acompanhamento.

### ZOOM

A Api para agendamento de video conferências do Zoom foi utilizada para agendar as consultar de Telemedicina após a reserva online. A ligação é agendada e enviada para o Whatsapp do caminhoneiro.

### qrserver

QRServer foi utilizado para condensar todas as informações referentes à triagem em um QRcode enviado logo após preencher o formulário de triagem. Ao consultar-se em um posto presencial, o caminhoneiro mostrará o QRCode para quem for o atender.

### Relink

Para tornar os links enviados aos caminhoneiros mais amigáveis, utilizamos o encurtador de links Relink.
