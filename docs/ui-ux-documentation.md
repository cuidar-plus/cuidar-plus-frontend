# 🎨 Documentação Completa de UI/UX — Cuidar+

---

## 🧭 Visão Geral

O **Cuidar+** é uma aplicação de gestão de **Home Care** que une **tecnologia, empatia e eficiência**.  
O foco da experiência do usuário é proporcionar **simplicidade e conforto visual**, assegurando que profissionais da saúde e gestores tenham **acesso rápido, previsível e agradável** às informações.

---

## 🧱 Estrutura do Design

O sistema segue o modelo **Atomic Design**, com 5 níveis principais:

| Nível          | Descrição                                               | Exemplos                                  |
| -------------- | ------------------------------------------------------- | ----------------------------------------- |
| **Tokens**     | Variáveis de cor, tipografia, espaçamento, radius, etc. | `--color-primary`, `--fs-body`, `--sp-md` |
| **Átomos**     | Componentes base reutilizáveis                          | Botões, Inputs, Ícones                    |
| **Moléculas**  | Combinações simples de átomos                           | Cards, Alertas, Badges                    |
| **Organismos** | Conjuntos complexos                                     | Tabelas, Modais, Drawers                  |
| **Páginas**    | Layouts completos                                       | Pacientes, Usuários, Relatórios           |

---

## 🎨 Identidade Visual

### Conceito de Marca

O **Cuidar+** representa o equilíbrio entre **cuidado humano** e **tecnologia assistiva** — leveza, confiança e proximidade.

### Paleta de Cores

| Categoria     | Nome            | Código    | Uso                                 |
| ------------- | --------------- | --------- | ----------------------------------- |
| Primária      | Azul Serenity   | `#4A90E2` | Cor principal (botões, links, foco) |
| Secundária    | Verde Saúde     | `#00B894` | Sucesso e confirmação               |
| Apoio         | Laranja Cuidado | `#F5A623` | Avisos, alertas leves               |
| Erro          | Vermelho Calmo  | `#E57373` | Erros e críticas                    |
| Neutra Escura | Cinza Profundo  | `#2C3E50` | Texto e headers                     |
| Neutra Clara  | Cinza Neve      | `#F4F6F8` | Fundos neutros                      |
| Fundo         | Branco          | `#FFFFFF` | Background padrão                   |

💡 **Cores seguem WCAG 2.1 AA** e priorizam legibilidade, serenidade e acessibilidade.

---

## 🖋️ Tipografia

**Fonte principal:** [Inter](https://fonts.google.com/specimen/Inter)  
**Fallback:** Roboto, system-ui

| Tipo    | Peso | Tamanho  | Uso               |
| ------- | ---- | -------- | ----------------- |
| H1      | 700  | 2rem     | Título de páginas |
| H2      | 600  | 1.5rem   | Subtítulo         |
| Body    | 400  | 1rem     | Texto padrão      |
| Caption | 500  | 0.875rem | Legendas          |
| Button  | 600  | 1rem     | Textos de botões  |

**Altura de linha:** 140%  
**Espaçamento vertical entre seções:** 24px

---

## 🧩 Componentes Base

### Botões

- **Primário:** Azul Serenity, texto branco
- **Secundário:** Branco, borda azul
- **Perigo:** Vermelho Calmo
- **Ghost:** Fundo transparente
- Radius: 8px | Padding: 12×20px | Transição: 180ms

### Inputs

- Altura: 44px
- Borda: `#D1D5DB` → foco `#4A90E2`
- Placeholder: `#9CA3AF`
- Radius: 8px
- Ícones de status (erro/sucesso)

### Cards

- Fundo branco
- Radius: 12px
- Sombra leve: `rgba(0,0,0,0.05)`
- Padding interno: 16px

### Alertas

| Tipo    | Cor             | Ícone |
| ------- | --------------- | ----- |
| Info    | Azul Serenity   | ℹ️    |
| Sucesso | Verde Saúde     | ✔    |
| Aviso   | Laranja Cuidado | ⚠️    |
| Erro    | Vermelho Calmo  | ⛔    |

---

## 🧠 Princípios de UX

1. **Simplicidade:** foco em ações essenciais.
2. **Consistência:** padrões visuais uniformes.
3. **Visibilidade:** feedbacks claros e imediatos.
4. **Acessibilidade:** sempre navegável via teclado.
5. **Rapidez:** resposta perceptível e fluida.

---

## 📱 Layout e Responsividade

| Breakpoint  | Uso     | Layout                    |
| ----------- | ------- | ------------------------- |
| ≤768px      | Mobile  | Stack vertical            |
| 769–1024px  | Tablet  | 8 colunas                 |
| 1025–1440px | Desktop | 12 colunas                |
| >1440px     | Large   | Centralizado (max 1440px) |

**Grid:** 12 colunas, gutter 24px, margens 16–24px.

---

## ♿ Acessibilidade

- Contraste mínimo **4.5:1**
- Área clicável mínima: **44×44px**
- Suporte a **ARIA Roles** (`role`, `aria-label`, `aria-live`)
- **Modo alto contraste:** `data-contrast="high"`
- **Animações suaves:** respeitam `prefers-reduced-motion`

---

## 🌗 Temas

| Tema           | Fundo     | Texto     | Finalidade               |
| -------------- | --------- | --------- | ------------------------ |
| Claro          | `#FFFFFF` | `#2C3E50` | Padrão                   |
| Escuro         | `#1C1C1C` | `#F4F6F8` | Ambientes de pouca luz   |
| Alto Contraste | Dinâmico  | Ajustado  | Acessibilidade reforçada |

---

## ✨ Microinterações

- Transições: 150–250ms (ease-out)
- Hover com elevação e brilho suave
- Feedback de clique (escurecimento temporário)
- Skeletons para carregamento
- Toasts automáticos para sucesso/erro

---

## 🧭 Padrões de Navegação

- **Sidebar fixa** com ícones + rótulos
- **Header superior** com perfil e notificações
- **BreadCrumbs** em telas de detalhe
- **Dashboard inicial** com indicadores visuais

---

## 🪟 Componentes Interativos

### Modal

- Centralizado, com backdrop escuro.
- Fechamento via ✕, clique fora ou Esc.
- Estrutura: Header / Body / Footer.

### Drawer

- Slide lateral (direita/esquerda).
- Ideal para formulários rápidos.
- Animação: 280ms ease-out.

### Tabs

- Horizontal, underline animado.
- Teclado acessível (`← →`).

### Badges

- Bordas arredondadas, tons suaves.
- Indicam status, categorias e alertas.

---

## 🔤 Ícones e Linguagem Visual

- **Biblioteca:** Material Symbols Rounded
- **Tamanho:** 20–24px
- **Cor:** adaptável ao contexto
- **Acessibilidade:** `aria-label` obrigatório se isolado

---

## 🧭 Fluxos de Usuário

### Cadastro de Paciente

1. Clique em **“+ Novo Paciente”**.
2. Modal abre com formulário dividido (Stepper).
3. Após salvar → toast “Paciente cadastrado com sucesso”.
4. Retorna à lista com o novo registro em destaque.

### Gestão de Insumos

1. Acessa **Farmácia**.
2. Tabela com colunas ordenáveis.
3. Clique → Drawer lateral com detalhes.
4. Atualiza e recebe feedback visual de sucesso.

---

## ✍️ UX Writing (Linguagem)

| Tipo         | Regra                   | Exemplo                    |
| ------------ | ----------------------- | -------------------------- |
| Ações        | Verbos curtos e diretos | “Salvar”, “Editar”         |
| Erros        | Linguagem empática      | “Ops! Algo deu errado.”    |
| Placeholders | Descritivos             | “Digite o nome completo”   |
| Labels       | Sempre acima do campo   | “Email corporativo”        |
| Tooltips     | Breves e informativos   | “Clique para ver detalhes” |

---

## 🧮 Design Tokens (Resumo)

| Tipo              | Token             | Valor   |
| ----------------- | ----------------- | ------- |
| Cor Primária      | `--color-primary` | #4A90E2 |
| Espaçamento Médio | `--sp-md`         | 12px    |
| Raio Padrão       | `--radius-md`     | 8px     |
| Duração Base      | `--motion-base`   | 180ms   |
| Fonte Base        | `--font-family`   | Inter   |

---

---

**Última atualização:** Outubro 2025  
**Responsável:** Equipe de Design e UX — _Cuidar+_ 💚
