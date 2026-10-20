import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const trilhas = JSON.parse(
  readFileSync(join(__dirname, '../data/trilhas.json'), 'utf-8')
);

export function gerarTrilha(tecnologia, nivel) {
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

  const dados = trilhas[tech][niv];
  const duracao_total_horas = dados.modulos.reduce((acc, m) => acc + m.duracao_horas, 0);

  return {
    tecnologia: tech,
    nivel: niv,
    descricao: dados.descricao,
    recursos_iniciais: dados.recursos_iniciais || [],
    modulos: dados.modulos,
    duracao_total_horas,
    mensagem: `Trilha de ${tech} (${niv}) carregada com sucesso! São ${dados.modulos.length} módulos e ${duracao_total_horas}h de conteúdo. Bons estudos! 🚀`
  };
}
