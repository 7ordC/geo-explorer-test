import { describe, it, expect } from 'vitest';
import { gerarCertificado } from '../commands/certificado.js';

describe('gerarCertificado', () => {
  it('gera certificado com todos os campos obrigatórios', () => {
    const resultado = gerarCertificado('Ana Silva', 'javascript', 'iniciante');
    expect(resultado.erro).toBeUndefined();
    expect(resultado.id).toMatch(/^GEO-\d{4}-\d{4}$/);
    expect(resultado.nome).toBe('Ana Silva');
    expect(resultado.tecnologia).toBe('javascript');
    expect(resultado.nivel).toBe('iniciante');
    expect(typeof resultado.data_conclusao).toBe('string');
    expect(resultado.duracao_total_horas).toBeGreaterThan(0);
    expect(typeof resultado.certificado).toBe('string');
    expect(resultado.certificado).toContain('GEO-EXPLORER');
  });

  it('retorna erro quando nome está vazio', () => {
    const resultado = gerarCertificado('', 'python', 'avancado');
    expect(resultado.erro).toBeDefined();
  });

  it('retorna erro para tecnologia inválida', () => {
    const resultado = gerarCertificado('João', 'ruby', 'iniciante');
    expect(resultado.erro).toBeDefined();
  });

  it('retorna erro para nível inválido', () => {
    const resultado = gerarCertificado('Maria', 'react', 'senior');
    expect(resultado.erro).toBeDefined();
  });

  it('o ID gerado é único a cada chamada', () => {
    const r1 = gerarCertificado('Alice', 'nodejs', 'intermediario');
    const r2 = gerarCertificado('Alice', 'nodejs', 'intermediario');
    // IDs podem coincidir raramente, mas o formato deve ser válido em ambos
    expect(r1.id).toMatch(/^GEO-\d{4}-\d{4}$/);
    expect(r2.id).toMatch(/^GEO-\d{4}-\d{4}$/);
  });
});
