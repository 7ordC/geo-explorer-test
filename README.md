Sobre o Geo-Explorer

> Um agente de IA que gera trilhas de estudo, desafios de código e certificados fictícios

O que é o Geo-Explorer

O Geo-Explorer é um projetoconstruído com Node.js que expõe três comandos principais via um servidor MCP(Model Context Protocol):

| Comando | O que faz |
|---------|-----------|
| `geo_trilha` | Apresenta um plano de estudos com módulos e carga horária para uma tecnologia e nível |
| `geo_desafio` | Gera um desafio de código aleatório para praticar |
| `geo_certificado` | Emite um certificado fictício de conclusão de trilha |

Os dados vêm de uma base de trilhas fictícias (`data/trilhas.json`) com **4 tecnologias** (`javascript`, `python`, `react`, `nodejs`) e **3 níveis** cada (`iniciante`, `intermediario`, `avancado`).

O servidor MCP permite que qualquer harness moderno (Bob, Claude Code, Cursor, etc.) acesse essas funcionalidades como ferramentas nativas, sem precisar de uma interface web.



Estrutura do projeto


geo-explorer/
├── AGENTS.md                  Definição do agente para harnesses
├── package.json               Dependências e scripts
├── data/
│   └── trilhas.json           Base de trilhas fictícias
├── commands/
│   ├── trilha.js              Comando: gera plano de estudos
│   ├── desafio.js             Comando: gera desafio de código
│   └── certificado.js         Comando: emite certificado fictício
├── mcp-server/
│   └── index.js               Servidor MCP (expõe os 3 comandos)
├── tests/
│   ├── trilha.test.js         Testes do comando trilha
│   ├── desafio.test.js        Testes do comando desafio
│   └── certificado.test.js    Testes do comando certificado
└── docs/




Como executar o projeto

Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- npm (vem junto com o Node)


Como usar os comandos

Os comandos podem ser chamados diretamente via Node.js ou pelo servidor MCP.

### Exemplo direto no Node (REPL ou script)

js
import { gerarTrilha } from './commands/trilha.js';
import { gerarDesafio } from './commands/desafio.js';
import { gerarCertificado } from './commands/certificado.js';

// Plano de estudos
console.log(gerarTrilha('javascript', 'iniciante'));

// Desafio de código
console.log(gerarDesafio('python', 'intermediario'));

// Certificado fictício
console.log(gerarCertificado('Ana Silva', 'react', 'avancado'));


Via servidor MCP (harness)

Registre o servidor MCP no seu harness apontando para

node /caminho/para/geo-explorer/mcp-server/index.js


Depois, use as ferramentas geo_trilha, geo_desafio e geo_certificado diretamente na conversa.

Tecnologias e níveis disponíveis

| Tecnologias | Níveis |
|-------------|--------|
| `javascript` | `iniciante` |
| `python` | `intermediario` |
| `react` | `avancado` |
| `nodejs` | |



executar os testes

```bash
npm test
```

O projeto usa [Vitest](https://vitest.dev) como test runner. Os testes cobrem os três comandos com **14 casos de teste** validando:

- Retorno correto para entradas válidas
- Erros descritivos para tecnologias e níveis inválidos
- Cálculo correto de carga horária total
- Formato do ID do certificado
- Tolerância a letras maiúsculas na entrada

Saída esperada:

 tests/trilha.test.js       (5 tests)
 tests/desafio.test.js      (4 tests)
 tests/certificado.test.js  (5 tests)

Test Files  3 passed (3)
      Tests 14 passed (14)



 Melhorias realizadas

Em relação ao escopo do desafio, foram adicionadas:

1. Tolerância a maiúsculas/minúsculas — os comandos aceitam JavaScript, PYTHON, Iniciante, etc., convertendo automaticamente para minúsculas.
2. Mensagens descritivas de erro — quando uma tecnologia ou nível não existe, o erro informa o que foi digitado e lista as opções disponíveis.
3. Certificado visual em ASCII — o certificado é gerado como um quadro formatado em texto, mais apresentável do que um simples JSON.
4. Cálculo dinâmico de carga horária — a duração total da trilha é calculada somando os módulos em tempo real, não é um campo fixo.
5. Cobertura de testes acima do mínimo — 14 testes contra os 6 mínimos exigidos (2 por comando)

O que aprendi durante o desafio

  Aprendi durante o desafio que é bem complicado porem muito divertido utilizar agentes de ia para quem é iniciante, a maneira com que se passa instruções para a maquina tem q ser de forma direta e objetiva,  não é so escrever prompt e deixar la, evolve economia de tokens(bobcoins) gestão de riscos e se vc não souber o que pedir e como pedir da melhor maneira possível vc acabar gastando muitos recursos e muitas vezes envenenado seus projetos e gastando muito recursos. 
Também tive q aprender coisas como:
- Model Context Protocol(MCP): aprendi como estruturar um servidor MCP com o SDK oficial da Anthropic, registrando ferramentas com schema JSON e transporte stdio. Entendi que o MCP é uma forma padronizada de conectar agentes de IA a ferramentas externas, independente do harness.

-Módulos ES6 no Node.js: com "type": "module" no package.json, todo o projeto usa import/export nativo. Aprendi a reconstruir _dirname com fileURLToPath e import.meta.url, já que ele não existe nos módulos ES6.

- Vitest para testes: o Vitest tem configuração zero para projetos Node puros. Aprendi a estruturar testes com describe/it/expect e a testar tanto caminhos felizes quanto erros.

- Separação de responsabilidades: manter os comandos (`commands/`) separados do servidor MCP (`mcp-server/`) tornou o código mais testável — os testes importam diretamente os comandos sem precisar subir o servidor.

- Dados estruturados como fonte de verdade: centralizar tudo em `data/trilhas.json` facilita adicionar novas tecnologias sem tocar nos comandos. É o mesmo princípio de um banco de dados, mas em formato simples e versionável.
