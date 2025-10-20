# Semáforo Sensorial de Sala de Aula - Back-end

[cite_start]Este é o repositório oficial do back-end para o projeto Semáforo Sensorial, desenvolvido pela equipe da ETE Advogado José David Gil Rodrigues. [cite: 4] [cite_start]O servidor é construído com Node.js, Express e MySQL. [cite: 32]

[cite_start]O objetivo é criar uma solução de IoT para monitorar os níveis de ruído em salas de aula, promovendo a inclusão de estudantes com hipersensibilidade sensorial, como os que estão no espectro autista (TEA). [cite: 14, 15, 17]

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

    ### Rotas de Gestão de Salas (`/api/salas`)

### Rotas de Gestão de Salas (`/api/salas`)

**Observação:** Todas as rotas abaixo são protegidas e requerem autenticação (o usuário precisa estar logado).

#### `GET /api/salas`
* **Descrição:** Retorna uma lista com todas as salas cadastradas no sistema, ordenadas por ID. Útil para preencher listas ou exibir todas as opções de salas no painel administrativo.
* **Protegida?** Sim.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    [
      { "id": 1, "nome_sala": "1° A ADM | SPARTTA", "logo_url": "/logos/sala 1.png" },
      { "id": 2, "nome_sala": "1° B ADM | ELECTRA", "logo_url": "/logos/sala 2.png" }
    ]
    ```

#### `POST /api/salas`
* **Descrição:** Cria uma nova sala no banco de dados.
* **Protegida?** Sim.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "nome_sala": "3° C DS | VIKINGS",
      "logo_url": "/logos/sala13.png"
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (201 Created):** Retorna o objeto da sala recém-criada, incluindo o novo `id`.
    ```json
    {
      "id": 13,
      "nome_sala": "3° C DS | VIKINGS",
      "logo_url": "/logos/sala13.png"
    }
    ```

#### `PUT /api/salas/:id`
* **Descrição:** Atualiza as informações (nome e/ou URL da logo) de uma sala específica, identificada pelo `:id` na URL (ex: `/api/salas/13`).
* **Protegida?** Sim.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "nome_sala": "3° C DS | VIKINGS (ATUALIZADO)",
      "logo_url": "/logos/vikings_novo.png"
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    { "mensagem": "Sala atualizada com sucesso." }
    ```

#### `DELETE /api/salas/:id`
* **Descrição:** Deleta uma sala específica do banco de dados, identificada pelo `:id` na URL. **Atenção:** Esta ação é irreversível.
* **Protegida?** Sim.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    { "mensagem": "Sala deletada com sucesso." }
    ```

### Rotas de Autenticação (`/api/auth`) - Complemento

#### `GET /api/auth/logout`
* **Descrição:** Encerra a sessão do usuário logado, invalidando seu "crachá" de acesso (cookie).
* **Protegida?** Não (mas só faz sentido chamar se estiver logado).
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    { "mensagem": "Logout realizado com sucesso." }
    ```

#### `GET /api/auth/checar-login`
* **Descrição:** Rota protegida utilizada pelo front-end para verificar se o usuário atual possui uma sessão ativa (se está logado). Essencial para proteger o acesso a páginas administrativas.
* **Protegida?** Sim.
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):** Retorna o status e os dados básicos do usuário logado.
    ```json
    {
      "status": "autenticado",
      "userId": 5,
      "username": "admin"
    }
    ```
* **Exemplo de Resposta (JSON) - Falha (401 Unauthorized):** Se o usuário não estiver logado.
    ```json
    { "mensagem": "Acesso não autorizado. Faça o login primeiro." }
    ```

#### `POST /api/auth/forgot-password`
* **Descrição:** Inicia o processo de recuperação de senha. Recebe o e-mail do usuário, gera um token secreto e envia um link de redefinição para o e-mail cadastrado.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    { "email": "usuario_cadastrado@exemplo.com" }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):** Retorna uma mensagem genérica por segurança.
    ```json
    { "mensagem": "Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha." }
    ```

#### `POST /api/auth/reset-password`
* **Descrição:** Finaliza o processo de recuperação de senha. Recebe o token enviado por e-mail e a nova senha desejada. Valida o token e, se estiver correto e dentro da validade, atualiza a senha do usuário no banco.
* **Protegida?** Não.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "token": "token_secreto_recebido_no_email",
      "newPassword": "novaSenhaSuperSegura123"
    }
    ```
* **Exemplo de Resposta (JSON) - Sucesso (200 OK):**
    ```json
    { "mensagem": "Senha redefinida com sucesso!" }
    ```