import * as readline from 'readline';
import { gerarTrilha } from './commands/trilha.js';
import { gerarDesafio } from './commands/desafio.js';
import { gerarCertificado } from './commands/certificado.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

function limpar() {
  console.clear();
}

function cabecalho() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║              🌍  GEO-EXPLORER  🌍                    ║');
  console.log('║       Seu explorador de trilhas de tecnologia        ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log();
}

async function menuPrincipal() {
  limpar();
  cabecalho();
  console.log('O que você quer fazer?\n');
  console.log('  1. 📚 Ver trilha de estudos');
  console.log('  2. 💪 Receber um desafio de código');
  console.log('  3. 🎓 Gerar meu certificado');
  console.log('  0. 🚪 Sair\n');

  const opcao = await pergunta('Digite o número da opção: ');
  return opcao.trim();
}

const TECNOLOGIAS = ['javascript', 'python', 'react', 'nodejs'];
const NIVEIS = ['iniciante', 'intermediario', 'avancado'];

async function escolherTecnologia() {
  console.log('\nTecnologias disponíveis:\n');
  TECNOLOGIAS.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  console.log();
  const entrada = await pergunta('Digite o número ou o nome da tecnologia: ');
  const v = entrada.trim().toLowerCase();
  const porNumero = TECNOLOGIAS[parseInt(v) - 1];
  return porNumero || v;
}

async function escolherNivel() {
  console.log('\nNíveis disponíveis:\n');
  NIVEIS.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  console.log();
  const entrada = await pergunta('Digite o número ou o nome do nível: ');
  const v = entrada.trim().toLowerCase();
  const porNumero = NIVEIS[parseInt(v) - 1];
  return porNumero || v;
}

async function fluxoTrilha() {
  limpar();
  cabecalho();
  console.log('📚 TRILHA DE ESTUDOS\n');

  const tech = await escolherTecnologia();
  const nivel = await escolherNivel();

  const resultado = gerarTrilha(tech, nivel);

  console.log('\n' + '─'.repeat(56));

  if (resultado.erro) {
    console.log('\n❌ ' + resultado.erro);
  } else {
    console.log('\n✅ ' + resultado.mensagem);
    console.log(`\n📝 ${resultado.descricao}\n`);

    if (resultado.recursos_iniciais?.length > 0) {
      console.log('🔗 Por onde começar:\n');
      resultado.recursos_iniciais.forEach(r => console.log(`  • ${r.titulo}\n    ${r.url}`));
    }

    console.log('\n📋 Módulos da trilha:\n');
    resultado.modulos.forEach((m, i) => {
      console.log(`  ${i + 1}. ${m.titulo} (${m.duracao_horas}h)`);
      if (m.conceitos?.length > 0) {
        m.conceitos.forEach(c => console.log(`     → ${c}`));
      }
      if (m.recursos?.length > 0) {
        m.recursos.forEach(r => console.log(`     📖 ${r.titulo}: ${r.url}`));
      }
      console.log();
    });
    console.log(`⏱️  Carga total: ${resultado.duracao_total_horas}h`);
  }
}

async function fluxoDesafio() {
  limpar();
  cabecalho();
  console.log('💪 DESAFIO DE CÓDIGO\n');

  const tech = await escolherTecnologia();
  const nivel = await escolherNivel();

  const resultado = gerarDesafio(tech, nivel);

  console.log('\n' + '─'.repeat(56));

  if (resultado.erro) {
    console.log('\n❌ ' + resultado.erro);
  } else {
    console.log('\n✅ ' + resultado.mensagem);
    console.log('\n🎯 Enunciado:\n');
    console.log('  ' + resultado.enunciado);
    console.log('\n💡 Dica (só olhe se travar!):\n');
    console.log('  ' + resultado.dica);
  }
}

async function fluxoCertificado() {
  limpar();
  cabecalho();
  console.log('🎓 CERTIFICADO DE CONCLUSÃO\n');

  const nome = await pergunta('Seu nome completo: ');
  const tech = await escolherTecnologia();
  const nivel = await escolherNivel();

  const resultado = gerarCertificado(nome, tech, nivel);

  console.log('\n' + '─'.repeat(56));

  if (resultado.erro) {
    console.log('\n❌ ' + resultado.erro);
  } else {
    console.log('\n' + resultado.certificado);
    console.log('\n🎉 ' + resultado.mensagem);
  }
}

async function main() {
  while (true) {
    const opcao = await menuPrincipal();

    if (opcao === '0') {
      limpar();
      cabecalho();
      console.log('Até mais! Continue explorando. 🚀\n');
      rl.close();
      break;
    } else if (opcao === '1') {
      await fluxoTrilha();
    } else if (opcao === '2') {
      await fluxoDesafio();
    } else if (opcao === '3') {
      await fluxoCertificado();
    } else {
      console.log('\n❌ Opção inválida. Tente novamente.');
    }

    await pergunta('\nPressione ENTER para voltar ao menu...');
  }
}

main();
