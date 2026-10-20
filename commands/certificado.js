import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const trilhas = JSON.parse(
  readFileSync(join(__dirname, '../data/trilhas.json'), 'utf-8')
);

export function gerarCertificado(nome, tecnologia, nivel) {
  const tech = tecnologia?.toLowerCase();
  const niv = nivel?.toLowerCase();

  if (!nome || nome.trim() === '') {
    return { erro: 'O nome do aluno é obrigatório para emitir o certificado.' };
  }

  if (!trilhas[tech]) {
    return {
      erro: `Tecnologia "${tecnologia}" não encontrada. Disponíveis: ${Object.keys(trilhas).join(', ')}.`
    };
  }

  if (!trilhas[tech][niv]) {
    return {
      erro: `Nível "${nivel}" não encontrado para ${tecnologia}. Disponíveis: ${Object.keys(trilhas[tech]).join(', ')}.`
    };
  }

  const id = `GEO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const data = new Date().toLocaleDateString('pt-BR');
  const duracao = trilhas[tech][niv].modulos.reduce((acc, m) => acc + m.duracao_horas, 0);

  return {
    id,
    nome: nome.trim(),
    tecnologia: tech,
    nivel: niv,
    data_conclusao: data,
    duracao_total_horas: duracao,
    certificado: [
      '╔══════════════════════════════════════════════════════╗',
      '║              🌍  GEO-EXPLORER  🌍                    ║',
      '║           CERTIFICADO DE CONCLUSÃO                   ║',
      '╠══════════════════════════════════════════════════════╣',
      `║  Aluno    : ${nome.trim().padEnd(40)}║`,
      `║  Trilha   : ${tech.padEnd(40)}║`,
      `║  Nível    : ${niv.padEnd(40)}║`,
      `║  Carga    : ${String(duracao + 'h').padEnd(40)}║`,
      `║  Emissão  : ${data.padEnd(40)}║`,
      `║  ID       : ${id.padEnd(40)}║`,
      '╠══════════════════════════════════════════════════════╣',
      '║  Parabéns pela conclusão! Continue explorando. 🚀    ║',
      '╚══════════════════════════════════════════════════════╝'
    ].join('\n'),
    mensagem: `Certificado emitido com sucesso para ${nome.trim()}! ID: ${id} 🎉`
  };
}
