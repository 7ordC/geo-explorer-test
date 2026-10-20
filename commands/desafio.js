import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const trilhas = JSON.parse(
  readFileSync(join(__dirname, '../data/trilhas.json'), 'utf-8')
);

export function gerarDesafio(tecnologia, nivel) {
  const tech = tecnologia?.toLowerCase();
  const niv = nivel?.toLowerCase();

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

  const desafios = trilhas[tech][niv].desafios;
  const desafio = desafios[Math.floor(Math.random() * desafios.length)];

  return {
    tecnologia: tech,
    nivel: niv,
    enunciado: desafio.enunciado,
    dica: desafio.dica,
    mensagem: `Desafio de ${tech} (${niv}) gerado! Tente resolver antes de pedir a dica. 💪`
  };
}
