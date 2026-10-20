import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { gerarTrilha } from '../commands/trilha.js';
import { gerarDesafio } from '../commands/desafio.js';
import { gerarCertificado } from '../commands/certificado.js';

const server = new McpServer({
  name: 'geo-explorer',
  version: '1.0.0'
});

server.tool(
  'geo_trilha',
  'Retorna o plano de estudos de uma tecnologia e nível. Tecnologias: javascript, python, react, nodejs. Níveis: iniciante, intermediario, avancado.',
  {
    tecnologia: z.string().describe('Nome da tecnologia (javascript, python, react, nodejs)'),
    nivel: z.string().describe('Nível do estudante (iniciante, intermediario, avancado)')
  },
  async ({ tecnologia, nivel }) => {
    const resultado = gerarTrilha(tecnologia, nivel);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }]
    };
  }
);

server.tool(
  'geo_desafio',
  'Gera um desafio de código aleatório para uma tecnologia e nível. Tecnologias: javascript, python, react, nodejs. Níveis: iniciante, intermediario, avancado.',
  {
    tecnologia: z.string().describe('Nome da tecnologia (javascript, python, react, nodejs)'),
    nivel: z.string().describe('Nível do estudante (iniciante, intermediario, avancado)')
  },
  async ({ tecnologia, nivel }) => {
    const resultado = gerarDesafio(tecnologia, nivel);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }]
    };
  }
);

server.tool(
  'geo_certificado',
  'Emite um certificado fictício de conclusão de trilha. Tecnologias: javascript, python, react, nodejs. Níveis: iniciante, intermediario, avancado.',
  {
    nome: z.string().describe('Nome completo do aluno'),
    tecnologia: z.string().describe('Nome da tecnologia (javascript, python, react, nodejs)'),
    nivel: z.string().describe('Nível concluído (iniciante, intermediario, avancado)')
  },
  async ({ nome, tecnologia, nivel }) => {
    const resultado = gerarCertificado(nome, tecnologia, nivel);
    return {
      content: [{ type: 'text', text: JSON.stringify(resultado, null, 2) }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
