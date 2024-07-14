# Projeto Firebase com Arquitetura DDD
Este projeto implementa uma API e triggers do Firestore utilizando Firebase Functions. A arquitetura escolhida é o Domain-Driven Design (DDD) para garantir escalabilidade e manutenibilidade.

## Estrutura do Projeto
A estrutura do projeto é organizada de acordo com os princípios do DDD, separando responsabilidades e mantendo o código modular e fácil de manter.

```
src/
├── config
├── core/records
│   ├── dtos/
│   │   └── createRecordDTO.ts
│   ├── models/
│   │   └── Record.ts
│   ├── usecases/
│   │   └── createRecordUseCase.ts
│   └── handlers/
│       └── createRecordHandler.ts
│       └── incrementIdTriggerHandler.ts
├── index.ts
└── package.json

```
## Módulos e Responsabilidades
**config/**: Gerenciamento centralizado de configurações.<br>
**records/**: Contém a lógica de domínio relacionada a registros, incluindo criação e triggers.

## Instalação
Para rodar o projeto, siga os passos abaixo:

1 Clone o repositório

2 Instale as dependências

Certifique-se de ter o Node.js e o Firebase CLI instalados. Depois, instale as dependências do projeto com o npm ou yarn:

```
npm install
# ou
yarn install
```

3 Configure o Firebase

Inicialize o projeto Firebase e configure suas credenciais:

```
firebase login
```

4 Execute o projeto localmente

Use o Firebase CLI para emular as funções localmente:

```
firebase emulators:start
ou
npm run server
```

## Arquitetura e Design
### Domain-Driven Design (DDD)
A escolha por DDD foi feita para garantir uma arquitetura escalável e de fácil manutenção. Cada módulo é responsável por uma parte específica do domínio da aplicação. Isso facilita a adição de novas funcionalidades e a manutenção das existentes, minimizando o impacto nas outras partes do sistema.

Principais Componentes
- ConfigManager: Gerencia as configurações de forma centralizada, facilitando a alteração de parâmetros sem impactar o código.<br>
- createRecord: Função HTTP que cria um novo registro no Firestore. Inclui validação de entrada e tratamento de erros.<br>
- incrementIdTrigger: Trigger do Firestore que é executada ao criar um novo documento na coleção especificada. Realiza ações adicionais, como incrementar IDs.<br>

## Testes
Os testes são realizados utilizando Jest. Para executar os testes, use o comando:

```
npm run test
# ou
yarn test
# ou 
npx jest
```
Os testes estão localizados no mesmo diretório dos arquivos que testam

