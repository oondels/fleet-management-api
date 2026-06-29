# Fleet Management API

Backend para uma plataforma de **Gestão de Frota**, desenvolvido com foco em arquitetura modular, segurança, escalabilidade, padronização da modelagem de dados e confiabilidade operacional.

A aplicação fornece uma base robusta para gerenciamento de veículos, marcas, modelos e usuários, utilizando autenticação JWT, persistência relacional com SQL Server, cache com Redis, mensageria assíncrona, auditoria de interações e testes automatizados.

---

## Visão Geral

O projeto tem como objetivo centralizar e estruturar as operações relacionadas à gestão de frota, permitindo o cadastro, consulta, manutenção e rastreabilidade de entidades essenciais do domínio.

A API foi construída com foco em:

* Organização modular por domínio
* Separação clara de responsabilidades
* Segurança nas operações
* Padronização de entidades e metadados
* Cache para otimização de consultas
* Auditoria das interações do serviço
* Comunicação assíncrona por mensageria
* Testabilidade das regras de negócio
* Execução reprodutível com Docker

---

## Domínio da Aplicação

A aplicação contempla os principais elementos de uma estrutura de frota:

### Usuários

Representam os usuários responsáveis por operar o sistema. São utilizados para autenticação, autorização e rastreamento de autoria nas operações realizadas.

### Marcas

Representam os fabricantes ou marcas dos veículos cadastrados na plataforma.

### Modelos

Representam os modelos de veículos disponíveis na frota, podendo estar associados a uma marca.

### Veículos

Representam os veículos gerenciados pela plataforma, contendo informações como placa, chassi, Renavam, ano e modelo associado.

---

## Stack Utilizada

| Tecnologia        | Finalidade                          |
| ----------------- | ----------------------------------- |
| Node.js           | Runtime da aplicação                |
| NestJS            | Framework backend                   |
| TypeScript        | Linguagem principal                 |
| TypeORM           | ORM e gerenciamento de migrations   |
| SQL Server        | Banco de dados relacional principal |
| Redis             | Cache de consultas                  |
| JWT               | Autenticação stateless              |
| Jest              | Testes automatizados                |
| Docker            | Containerização da aplicação        |
| Docker Compose    | Orquestração local dos serviços     |
| RabbitMQ          | Mensageria assíncrona               |
| MongoDB           | Armazenamento de auditoria          |
| Swagger/OpenAPI   | Documentação da API                 |
| class-validator   | Validação de dados de entrada       |
| class-transformer | Transformação de objetos e DTOs     |

---

## Arquitetura

A aplicação segue uma arquitetura modular baseada em domínios, favorecendo baixo acoplamento, alta coesão e facilidade de manutenção.

Cada domínio possui sua própria estrutura de módulos, controllers, services, DTOs, entities e testes. A lógica de negócio permanece concentrada nos services, enquanto os controllers atuam apenas como camada de entrada HTTP.

A arquitetura foi organizada para facilitar:

* Evolução independente dos módulos
* Escrita de testes unitários e de integração
* Manutenção de regras de negócio
* Reuso de componentes comuns
* Clareza na separação entre infraestrutura, domínio e aplicação

---

## Principais Recursos

A aplicação implementa os seguintes recursos:

* Autenticação com JWT
* Proteção das rotas da aplicação
* Gerenciamento de usuários
* Gerenciamento de marcas
* Gerenciamento de modelos de veículos
* Gerenciamento de veículos
* Relacionamento entre marcas, modelos e veículos
* Metadados de criação e atualização nas entidades
* Identificação do usuário responsável por cada operação
* Cache Redis em consultas de veículos
* Invalidação automática de cache em operações de escrita
* Auditoria das interações do serviço
* Mensageria para eventos relevantes do domínio
* Validação de dados de entrada
* Tratamento padronizado de erros
* Migrations para versionamento do banco de dados
* Seeds para carga inicial de dados
* Testes automatizados com Jest
* Execução local com Docker Compose

---

## Modelagem de Dados

A modelagem foi definida com foco em clareza, integridade relacional e rastreabilidade.

As entidades principais da aplicação são:

* `users`
* `brands`
* `models`
* `vehicles`

Todas as entidades de domínio possuem metadados padronizados, permitindo rastrear quando um registro foi criado, atualizado e por qual usuário.

---

## Entidades

### Users

Responsável por representar os usuários da aplicação.

Campos principais:

* `id`
* `nickname`
* `name`
* `email`
* `password_hash`
* `created_at`
* `updated_at`

---

### Brands

Responsável por representar as marcas dos veículos.

Campos principais:

* `id`
* `name`
* `created_at`
* `updated_at`
* `created_by`

---

### Models

Responsável por representar os modelos dos veículos.

Campos principais:

* `id`
* `name`
* `brand_id`
* `created_at`
* `updated_at`
* `created_by`

---

### Vehicles

Responsável por representar os veículos da frota.

Campos principais:

* `id`
* `license_plate`
* `chassis`
* `renavam`
* `year`
* `model_id`
* `created_at`
* `updated_at`
* `created_by`

---

## Autenticação e Segurança

A autenticação da aplicação é baseada em JWT.

Após autenticação, o usuário recebe um token de acesso que deve ser utilizado para consumir os recursos protegidos da API.

A aplicação adota as seguintes práticas de segurança:

* Autenticação stateless com JWT
* Proteção das rotas por guards
* Senhas armazenadas com hash
* Validação dos dados de entrada com DTOs
* Preenchimento automático de metadados com base no usuário autenticado
* Bloqueio de manipulação direta do campo `created_by` pelo cliente
* Tratamento padronizado de respostas de erro

---

## Cache com Redis

O Redis é utilizado para otimizar consultas relacionadas a veículos.

A estratégia de cache foi aplicada para reduzir acessos repetidos ao banco de dados em operações de leitura, aumentando a eficiência da aplicação em cenários de maior volume de consultas.

O tempo de expiração do cache é configurável por variável de ambiente.

A aplicação também realiza invalidação automática do cache sempre que uma operação de criação, atualização ou remoção de veículo é executada. Dessa forma, as consultas não retornam informações obsoletas após alterações no banco de dados.

---

## Mensageria

A aplicação utiliza mensageria assíncrona para desacoplar operações e permitir evolução do sistema em direção a uma arquitetura orientada a eventos.

Eventos relevantes do domínio podem ser publicados para processamento assíncrono, como operações de criação, atualização e remoção de registros.

Essa abordagem permite:

* Redução de acoplamento entre módulos
* Processamento assíncrono de tarefas
* Melhor organização de efeitos colaterais
* Preparação da aplicação para cenários distribuídos
* Maior flexibilidade para integrações futuras

---

## Auditoria

A aplicação possui uma camada de auditoria responsável por registrar interações relevantes do serviço.

Os registros de auditoria permitem acompanhar ações executadas, entidades impactadas, usuários envolvidos e momentos de ocorrência.

Essa camada contribui para:

* Rastreabilidade operacional
* Análise de comportamento do sistema
* Apoio à investigação de falhas
* Histórico de interações relevantes
* Maior controle sobre operações sensíveis

---

## Banco de Dados

O SQL Server é utilizado como banco de dados relacional principal da aplicação.

A estrutura do banco é controlada por migrations, garantindo que a evolução do schema seja versionada, reprodutível e segura.

A aplicação não depende de sincronização automática de entidades em ambiente de execução. Alterações estruturais são conduzidas por migrations explícitas.

---

## Migrations

As migrations são utilizadas para criar e evoluir a estrutura do banco de dados.

Essa abordagem permite:

* Versionamento do schema
* Reprodutibilidade entre ambientes
* Controle sobre alterações estruturais
* Redução de riscos em mudanças no banco
* Maior previsibilidade no ciclo de desenvolvimento

---

## Seeds

O projeto possui seeds para criação de dados iniciais necessários à execução da aplicação.

As seeds incluem:

* Usuário inicial da aplicação
* Marcas iniciais
* Modelos iniciais
* Veículos iniciais a partir de arquivo JSON

O arquivo `seed_vehicles.json` é utilizado como base para carga inicial de veículos no ambiente local.

---

## Testes

A aplicação utiliza Jest para testes automatizados.

A suíte de testes cobre pontos essenciais da aplicação, incluindo:

* Serviços
* Regras de negócio
* Validações
* Autenticação
* Operações de domínio
* Comportamento de cache
* Invalidação de cache
* Integrações mínimas

A estratégia de testes foi definida para validar o comportamento da aplicação em cenários esperados e em cenários de erro.

---

## Docker

O projeto possui suporte a execução com Docker e Docker Compose.

A composição local da aplicação contempla os principais serviços necessários para execução do ambiente:

* Aplicação backend
* SQL Server
* Redis
* RabbitMQ
* MongoDB

Essa estrutura permite executar o ambiente de forma padronizada, reduzindo dependências manuais e facilitando a reprodução do projeto em diferentes máquinas.

---

## Estrutura de Pastas

```txt
src/
  main.ts
  app.module.ts

  config/
    database.config.ts
    redis.config.ts
    jwt.config.ts
    queue.config.ts
    audit.config.ts

  common/
    decorators/
    filters/
    guards/
    interceptors/
    entities/
    errors/

  database/
    migrations/
    seeds/
    data-source.ts

  auth/
    dto/
    guards/
    strategies/
    auth.controller.ts
    auth.module.ts
    auth.service.ts

  users/
    dto/
    user.entity.ts
    users.controller.ts
    users.module.ts
    users.service.ts

  brands/
    dto/
    brand.entity.ts
    brands.controller.ts
    brands.module.ts
    brands.service.ts

  models/
    dto/
    vehicle-model.entity.ts
    models.controller.ts
    models.module.ts
    models.service.ts

  vehicles/
    dto/
    vehicle.entity.ts
    vehicles-cache.service.ts
    vehicles.controller.ts
    vehicles.module.ts
    vehicles.service.ts

  messaging/
    events/
    publishers/
    consumers/
    messaging.module.ts

  audit/
    schemas/
    audit.service.ts
    audit.module.ts
```

---

## Decisões Técnicas

### Arquitetura modular

A aplicação foi organizada por domínios para manter responsabilidades isoladas e facilitar a evolução do código.

### TypeORM com migrations

O TypeORM é utilizado com migrations para manter o schema do banco versionado e controlado.

### JWT para autenticação

A autenticação utiliza JWT por permitir uma abordagem stateless, adequada para APIs REST e ambientes distribuídos.

### Redis para cache

O Redis foi adotado para reduzir carga em consultas frequentes de veículos e melhorar o tempo de resposta da aplicação.

### Mensageria assíncrona

A mensageria foi incluída para permitir publicação e processamento de eventos de domínio de forma desacoplada.

### Auditoria em banco não relacional

A auditoria utiliza armazenamento não relacional para registrar interações do serviço de forma flexível e independente do banco transacional principal.

### Docker Compose

O Docker Compose é utilizado para padronizar o ambiente local e facilitar a execução dos serviços necessários para a aplicação.

---

## Qualidade de Código

O projeto busca manter padrões consistentes de qualidade, incluindo:

* Código organizado por responsabilidade
* Baixo acoplamento entre módulos
* DTOs para entrada de dados
* Validações explícitas
* Tratamento centralizado de exceções
* Services testáveis
* Entidades padronizadas
* Scripts de execução e manutenção
* Documentação progressiva da API
