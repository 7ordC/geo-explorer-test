import { describe, it, expect } from 'vitest';
import { gerarTrilha } from '../commands/trilha.js';

describe('gerarTrilha', () => {
  it('retorna a trilha correta para tecnologia e nível válidos', () => {
    const resultado = gerarTrilha('javascript', 'iniciante');
    expect(resultado.erro).toBeUndefined();
    expect(resultado.tecnologia).toBe('javascript');
    expect(resultado.nivel).toBe('iniciante');
    expect(Array.isArray(resultado.modulos)).toBe(true);
    expect(resultado.modulos.length).toBeGreaterThan(0);
    expect(resultado.duracao_total_horas).toBeGreaterThan(0);
    expect(typeof resultado.mensagem).toBe('string');
  });

  it('retorna erro para tecnologia inválida', () => {
    const resultado = gerarTrilha('cobol', 'iniciante');
    expect(resultado.erro).toBeDefined();
    expect(resultado.erro).toContain('cobol');
  });

  it('retorna erro para nível inválido', () => {
    const resultado = gerarTrilha('python', 'expert');
    expect(resultado.erro).toBeDefined();
    expect(resultado.erro).toContain('expert');
  });

  it('calcula a duração total somando os módulos', () => {
    const resultado = gerarTrilha('react', 'intermediario');
    const soma = resultado.modulos.reduce((acc, m) => acc + m.duracao_horas, 0);
    expect(resultado.duracao_total_horas).toBe(soma);
  });

  it('funciona com letras maiúsculas na entrada', () => {
    const resultado = gerarTrilha('NODEJS', 'AVANCADO');
    expect(resultado.erro).toBeUndefined();
    expect(resultado.tecnologia).toBe('nodejs');
  });
});
