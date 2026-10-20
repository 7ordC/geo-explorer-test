import { describe, it, expect } from 'vitest';
import { gerarDesafio } from '../commands/desafio.js';

describe('gerarDesafio', () => {
  it('retorna um desafio válido para tecnologia e nível existentes', () => {
    const resultado = gerarDesafio('javascript', 'iniciante');
    expect(resultado.erro).toBeUndefined();
    expect(resultado.tecnologia).toBe('javascript');
    expect(resultado.nivel).toBe('iniciante');
    expect(typeof resultado.enunciado).toBe('string');
    expect(resultado.enunciado.length).toBeGreaterThan(0);
    expect(typeof resultado.dica).toBe('string');
  });

  it('retorna erro para tecnologia inválida', () => {
    const resultado = gerarDesafio('java', 'iniciante');
    expect(resultado.erro).toBeDefined();
  });

  it('retorna erro para nível inválido', () => {
    const resultado = gerarDesafio('python', 'master');
    expect(resultado.erro).toBeDefined();
  });

  it('funciona para todos os níveis de python', () => {
    ['iniciante', 'intermediario', 'avancado'].forEach(nivel => {
      const resultado = gerarDesafio('python', nivel);
      expect(resultado.erro).toBeUndefined();
      expect(resultado.enunciado).toBeTruthy();
    });
  });
});
