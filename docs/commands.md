# Referência dos Comandos

Documentação técnica dos três comandos do Geo-Explorer.

---

## `gerarTrilha(tecnologia, nivel)`

**Arquivo:** `commands/trilha.js`

Retorna o plano de estudos completo para uma tecnologia e nível.

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `tecnologia` | string | Nome da tecnologia (`javascript`, `python`, `react`, `nodejs`) |
| `nivel` | string | Nível do estudante (`iniciante`, `intermediario`, `avancado`) |

### Retorno (sucesso)

```json
{
  "tecnologia": "javascript",
  "nivel": "iniciante",
  "descricao": "Fundamentos de JavaScript...",
  "modulos": [
    { "titulo": "Introdução ao JavaScript", "duracao_horas": 2 }
  ],
  "duracao_total_horas": 15,
  "mensagem": "Trilha de javascript (iniciante) carregada com sucesso!..."
}
```

### Retorno (erro)

```json
{ "erro": "Tecnologia \"ruby\" não encontrada. Disponíveis: javascript, python, react, nodejs." }
```

---

## `gerarDesafio(tecnologia, nivel)`

**Arquivo:** `commands/desafio.js`

Retorna um desafio de código aleatório para a tecnologia e nível informados.

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `tecnologia` | string | Nome da tecnologia |
| `nivel` | string | Nível do estudante |

### Retorno (sucesso)

```json
{
  "tecnologia": "python",
  "nivel": "iniciante",
  "enunciado": "Escreva uma função fatorial...",
  "dica": "Use recursão ou um laço for...",
  "mensagem": "Desafio de python (iniciante) gerado!..."
}
```

---

## `gerarCertificado(nome, tecnologia, nivel)`

**Arquivo:** `commands/certificado.js`

Emite um certificado fictício de conclusão de trilha.

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `nome` | string | Nome completo do aluno |
| `tecnologia` | string | Nome da tecnologia concluída |
| `nivel` | string | Nível concluído |

### Retorno (sucesso)

```json
{
  "id": "GEO-2025-4821",
  "nome": "Ana Silva",
  "tecnologia": "react",
  "nivel": "avancado",
  "data_conclusao": "15/06/2025",
  "duracao_total_horas": 22,
  "certificado": "╔══...╗\n║ GEO-EXPLORER ║\n...",
  "mensagem": "Certificado emitido com sucesso para Ana Silva! ID: GEO-2025-4821 🎉"
}
```
