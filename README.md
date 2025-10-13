# Semáforo Sensorial de Sala de Aula - Back-end

Este é o repositório oficial do back-end para o projeto Semáforo Sensorial, desenvolvido pela equipe da ETE Advogado José David Gil Rodrigues. O servidor é construído com Node.js, Express e MySQL. 

O objetivo é criar uma solução de IoT para monitorar os níveis de ruído em salas de aula, promovendo a inclusão de estudantes com hipersensibilidade sensorial, como os que estão no espectro autista (TEA). 

## Como Rodar o Projeto Localmente

1.  **Pré-requisitos:**
    * Node.js instalado
    * XAMPP (ou outro servidor MySQL) instalado e com os módulos Apache e MySQL rodando.

2.  **Instalação:**
    ```bash
    # Clone o repositório
    git clone [https://github.com/Thz081/PROJETO-SEMAFORO.git](https://github.com/Thz081/PROJETO-SEMAFORO.git)

    # Entre na pasta do projeto
    cd PROJETO-SEMAFORO

    # Instale as dependências
    npm install
    ```

3.  **Execução:**
    ```bash
    # Inicie o servidor
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

---

## Documentação da API

Todas as rotas da API são prefixadas com `/api`.

### Rotas de Dados do Sensor

#### `POST /api/dados-sensor`
* **Descrição:** Usada pelo dispositivo (ESP32) para enviar uma nova leitura de ruído para ser salva no banco de dados.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "salaId": 1,
      "decibeis": 75.25
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (201 Created):**
    ```json
    {
      "status": "sucesso",
      "dadosRecebidos": {
        "salaId": 1,
        "decibeis": 75.25
      }
    }
    ```

#### `GET /api/status-atual`
* **Descrição:** Busca a última leitura de ruído registrada para cada sala. Ideal para a página principal do dashboard.
* **Protegida?** Sim (precisa estar logado).
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    [
      {
        "id": 482,
        "sala_id": 1,
        "decibeis": "65.50",
        "data_hora": "2025-10-07T21:30:00.000Z",
        "nome_sala": "1° A ADM | SPARTTA",
        "logo_url": "/logos/sala 1.png",
        "status": "Moderado"
      },
      {
        "id": 483,
        "sala_id": 2,
        "decibeis": "82.10",
        "data_hora": "2025-10-07T21:30:05.000Z",
        "nome_sala": "1° B ADM | ELECTRA",
        "logo_url": "/logos/sala 2.png",
        "status": "Preocupante"
      }
    ]
    ```

---

## Documentação da API

Todas as rotas da API são prefixadas com `/api`.

### Rotas de Dados do Sensor

#### `POST /api/dados-sensor`
* **Descrição:** Usada pelo dispositivo (ESP32) para enviar uma nova leitura de ruído para ser salva no banco de dados.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "salaId": 1,
      "decibeis": 75.25
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (201 Created):**
    ```json
    {
      "status": "sucesso",
      "dadosRecebidos": {
        "salaId": 1,
        "decibeis": 75.25
      }
    }
    ```

#### `GET /api/status-atual`
* **Descrição:** Busca a última leitura de ruído registrada para cada sala. Rota principal para alimentar o dashboard.
* **Protegida?** Sim. Requer autenticação.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    [
      {
        "id": 482,
        "sala_id": 1,
        "decibeis": "65.50",
        "data_hora": "2025-10-07T21:30:00.000Z",
        "nome_sala": "1° A ADM | SPARTTA",
        "logo_url": "/logos/sala 1.png",
        "status": "Moderado"
      }
    ]
    ```

#### `GET /api/historico/sala/:salaId`
* **Descrição:** Busca o histórico completo (últimos 100 registros) de leituras de uma sala específica. O `:salaId` na URL deve ser substituído pelo ID da sala desejada (ex: `/api/historico/sala/7`).
* **Protegida?** Sim. Requer autenticação.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    [
      {
        "amplitude_ruido": 85,
        "data_hora": "2025-10-07T22:10:00.000Z"
      },
      {
        "amplitude_ruido": 92,
        "data_hora": "2025-10-07T22:09:50.000Z"
      }
    ]
    ```

#### `GET /api/analise/sala/:salaId`
* **Descrição:** Calcula e retorna as métricas de análise (KPIs) para uma sala específica, com base em todo o seu histórico.
* **Protegida?** Sim. Requer autenticação.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    {
      "mediaRuido": "78",
      "picoRuido": 112,
      "contagemPreocupante": 15,
      "periodoMaisAgitado": "Tarde"
    }
    ```

### Rotas de Autenticação (`/api/auth`)

#### `POST /api/auth/register`
* **Descrição:** Cria um novo usuário administrador no sistema.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "username": "novo_admin",
      "password": "senha_forte_123"
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (201 Created):**
    ```json
    {
      "mensagem": "Usuário registrado com sucesso!"
    }
    ```

#### `POST /api/auth/login`
* **Descrição:** Autentica um usuário e cria uma sessão, "liberando" o acesso às rotas protegidas.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "username": "admin",
      "password": "senha123"
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    {
      "mensagem": "Login realizado com sucesso! Bem-vindo, admin!"
    }
    ```
