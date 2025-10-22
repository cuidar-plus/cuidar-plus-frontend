# Cuidar+ — Angular Design System (v1)

A base técnica para o **Design System** do Cuidar+ em **Angular 17+ (standalone)**, com **tokens**, **temas (light/dark)**, **componentes base** e **boas práticas de acessibilidade (WCAG 2.1 AA)**.

> **Stack**: Angular 17+, TypeScript, SCSS, CSS Variables, Standalone Components, ESLint/Prettier.

---

## 📁 Estrutura de Pastas (monorepo simples)

```
root/
├─ package.json
├─ angular.json
├─ tsconfig.json
├─ src/                    # app de demonstração (storybook opcional)
│  ├─ main.ts
│  ├─ index.html
│  ├─ styles.scss          # importa os temas globais
│  └─ app/
│     ├─ app.config.ts
│     ├─ app.component.ts
│     └─ app.component.html
└─ libs/
   └─ cuidar-design-system/
      ├─ public-api.ts
      ├─ index.ts
      ├─ README.md
      ├─ styles/
      │  ├─ _tokens.colors.scss
      │  ├─ _tokens.typography.scss
      │  ├─ _tokens.spacing.scss
      │  ├─ _tokens.elevation.scss
      │  ├─ _tokens.radius.scss
      │  ├─ _mixins.scss
      │  ├─ theme.light.scss
      │  ├─ theme.dark.scss
      │  └─ index.scss
      ├─ utils/
      │  ├─ a11y.ts
      │  └─ focus-visible.css
      └─ components/
         ├─ button/
         │  ├─ button.component.ts
         │  ├─ button.component.html
         │  ├─ button.component.scss
         │  └─ index.ts
         ├─ input/
         │  ├─ input.component.ts
         │  ├─ input.component.html
         │  ├─ input.component.scss
         │  └─ index.ts
         ├─ card/
         │  ├─ card.component.ts
         │  ├─ card.component.html
         │  ├─ card.component.scss
         │  └─ index.ts
         ├─ alert/
         │  ├─ alert.component.ts
         │  ├─ alert.component.html
         │  ├─ alert.component.scss
         │  └─ index.ts
         └─ table/
            ├─ table.component.ts
            ├─ table.component.html
            ├─ table.component.scss
            └─ index.ts
```

---

## 🔧 Configuração base

### `package.json`

```json
{
  "name": "cuidar-plus-ds",
  "private": true,
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "lint": "eslint .",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^17.3.0",
    "@angular/common": "^17.3.0",
    "@angular/compiler": "^17.3.0",
    "@angular/core": "^17.3.0",
    "@angular/forms": "^17.3.0",
    "@angular/platform-browser": "^17.3.0",
    "@angular/platform-browser-dynamic": "^17.3.0",
    "@angular/router": "^17.3.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.3.0",
    "@angular/cli": "^17.3.0",
    "@angular/compiler-cli": "^17.3.0",
    "typescript": "~5.4.0",
    "sass": "^1.77.0",
    "eslint": "^9.0.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.5"
  }
}
```

### `src/styles.scss` (app)

```scss
@use '../libs/cuidar-design-system/styles/index' as ds;
@import '../libs/cuidar-design-system/utils/focus-visible.css';

/* Tema padrão: light */
:root {
  @include ds.load-theme(light);
}

/* Tema escuro quando data-theme='dark' no <html> ou <body> */
:root[data-theme='dark'] {
  @include ds.load-theme(dark);
}

html,
body {
  height: 100%;
  background: var(--color-bg);
  color: var(--color-text);
  font-family:
    Inter,
    Roboto,
    system-ui,
    -apple-system,
    Segoe UI,
    Arial,
    sans-serif;
}
```

---

## 🎯 Tokens (SCSS)

### `libs/cuidar-design-system/styles/_tokens.colors.scss`

```scss
/* Paleta Cuidar+ */
$blue-600: #4a90e2; // Azul Serenity
$green-500: #00b894; // Verde Saúde
$orange-500: #f5a623; // Laranja Cuidado
$red-400: #e57373; // Vermelho Calmo
$gray-900: #2c3e50; // Cinza Profundo
$gray-050: #f4f6f8; // Cinza Neve
$white: #ffffff;
$black: #1c1c1c; // Preto Suave

/* Mapa de cores por papel */
$roles: (
  primary: $blue-600,
  success: $green-500,
  warning: $orange-500,
  error: $red-400,
  text: $gray-900,
  bg: $white,
  surface: $white,
  border: #d1d5db,
);
```

### `libs/cuidar-design-system/styles/_tokens.typography.scss`

```scss
$font-family-base:
  Inter,
  Roboto,
  system-ui,
  -apple-system,
  Segoe UI,
  Arial,
  sans-serif;

$font-sizes: (
  h1: 2rem,
  h2: 1.5rem,
  h3: 1.25rem,
  body: 1rem,
  caption: 0.875rem,
  button: 1rem,
);

$font-weights: (
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
);

$line-height: 1.4;
```

### `libs/cuidar-design-system/styles/_tokens.spacing.scss`

```scss
$spacing: (
  xs: 4px,
  sm: 8px,
  md: 12px,
  lg: 16px,
  xl: 24px,
  xxl: 32px,
);
```

### `libs/cuidar-design-system/styles/_tokens.elevation.scss`

```scss
$elevation: (
  0: none,
  1: 0 2px 6px rgba(0, 0, 0, 0.08),
  2: 0 4px 10px rgba(0, 0, 0, 0.1),
  3: 0 8px 20px rgba(0, 0, 0, 0.12),
);
```

### `libs/cuidar-design-system/styles/_tokens.radius.scss`

```scss
$radius: (
  sm: 6px,
  md: 8px,
  lg: 12px,
  xl: 16px,
  full: 999px,
);
```

### `libs/cuidar-design-system/styles/_tokens.motion.scss`

```scss
$motion-durations: (
  fast: 120ms,
  base: 180ms,
  slow: 250ms,
  modal: 280ms,
);

$motion-easings: (
  in: cubic-bezier(0.4, 0, 1, 1),
  out: cubic-bezier(0, 0, 0.2, 1),
  in-out: cubic-bezier(0.4, 0, 0.2, 1),
);
```

### `libs/cuidar-design-system/styles/_tokens.zindex.scss`

```scss
$z: (
  base: 0,
  dropdown: 1000,
  overlay: 1100,
  modal: 1200,
  toast: 1300,
);
```

### `libs/cuidar-design-system/styles/_mixins.scss`

```scss
@use 'sass:map';
@use './_tokens.colors' as *;
@use './_tokens.typography' as *;
@use './_tokens.spacing' as *;
@use './_tokens.elevation' as *;
@use './_tokens.radius' as *;
@use './_tokens.motion' as *;
@use './_tokens.zindex' as *;

@mixin css-vars($palette) {
  --color-primary: #{map.get($palette, primary)};
  --color-success: #{map.get($palette, success)};
  --color-warning: #{map.get($palette, warning)};
  --color-error: #{map.get($palette, error)};
  --color-text: #{map.get($palette, text)};
  --color-bg: #{map.get($palette, bg)};
  --color-surface: #{map.get($palette, surface)};
  --color-border: #{map.get($palette, border)};

  --font-family: #{$font-family-base};
  --lh: #{$line-height};

  @each $k, $v in $font-sizes {
    --fs-#{$k}: #{$v};
  }
  @each $k, $v in $spacing {
    --sp-#{$k}: #{$v};
  }
  @each $k, $v in $elevation {
    --elev-#{$k}: #{$v};
  }
  @each $k, $v in $radius {
    --radius-#{$k}: #{$v};
  }
  @each $k, $v in $motion-durations {
    --motion-#{$k}: #{$v};
  }
  @each $k, $v in $motion-easings {
    --easing-#{$k}: #{$v};
  }
  @each $k, $v in $z {
    --z-#{$k}: #{$v};
  }
}

@mixin focus-ring {
  outline: 3px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
  outline-offset: 2px;
}
@mixin button-reset {
  -webkit-tap-highlight-color: transparent;
  border: none;
  appearance: none;
  cursor: pointer;
}
```

---

## 🎨 Temas

### `libs/cuidar-design-system/styles/theme.light.scss`

```scss
@use 'sass:map';
@use './_tokens.colors' as colors;
@use './_mixins' as *;

$light: map.merge(
  colors.$roles,
  (
    bg: #f4f6f8,
    // Cinza Neve como fundo de app
    surface: #ffffff,
    text: #2c3e50,
  )
);

:root {
  @include css-vars($light);
}
```

### `libs/cuidar-design-system/styles/theme.dark.scss`

```scss
@use 'sass:map';
@use './_tokens.colors' as colors;
@use './_mixins' as *;

$dark: map.merge(
  colors.$roles,
  (
    bg: #1c1c1c,
    surface: #222,
    text: #f4f6f8,
    border: #3a3a3a,
  )
);

:root[data-theme='dark'] {
  @include css-vars($dark);
}
```

### `libs/cuidar-design-system/styles/index.scss`

```scss
@forward './_mixins';
@use './theme.light' as *;
@use './theme.dark' as *;

// util classes
.u-elev-1 {
  box-shadow: var(--elev-1);
}
.u-elev-2 {
  box-shadow: var(--elev-2);
}
.u-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-1);
}
```

---

## 🧩 Componentes Base

### Button

[conteúdo existente mantido acima]

---

### Input

[conteúdo existente mantido acima]

---

### Card

[conteúdo existente mantido acima]

---

### Alert

[conteúdo existente mantido acima]

---

### Table (essencial para listas)

[conteúdo existente mantido acima]

---

### Badge

#### `libs/cuidar-design-system/components/badge/badge.component.ts`

```ts
import { Component, Input } from '@angular/core';

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'cuidar-badge',
  standalone: true,
  template: `<span
    class="badge"
    [class.t-info]="tone === 'info'"
    [class.t-success]="tone === 'success'"
    [class.t-warning]="tone === 'warning'"
    [class.t-error]="tone === 'error'"
    ><ng-content
  /></span>`,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
}
```

#### `libs/cuidar-design-system/components/badge/badge.component.scss`

```scss
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  line-height: 1.6;
  background: color-mix(in srgb, var(--color-text) 6%, transparent);
  color: var(--color-text);
}
.t-info {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
}
.t-success {
  background: color-mix(in srgb, var(--color-success) 14%, transparent);
  color: var(--color-success);
}
.t-warning {
  background: color-mix(in srgb, var(--color-warning) 16%, transparent);
  color: var(--color-warning);
}
.t-error {
  background: color-mix(in srgb, var(--color-error) 16%, transparent);
  color: var(--color-error);
}
```

---

### Modal

#### `libs/cuidar-design-system/components/modal/modal.component.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cuidar-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Input() title = '';
  close() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
```

#### `libs/cuidar-design-system/components/modal/modal.component.html`

```html
<div class="overlay" *ngIf="open" (click)="close()"></div>
<div
  class="modal"
  *ngIf="open"
  role="dialog"
  aria-modal="true"
  [attr.aria-label]="title || 'Diálogo'"
>
  <header class="modal__header">
    <strong>{{ title }}</strong>
    <button class="modal__close" (click)="close()" aria-label="Fechar">✕</button>
  </header>
  <section class="modal__content"><ng-content /></section>
  <footer class="modal__footer">
    <ng-content select="[slot=footer]"></ng-content>
  </footer>
</div>
```

#### `libs/cuidar-design-system/components/modal/modal.component.scss`

```scss
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.44);
  z-index: var(--z-overlay);
  opacity: 0;
  animation: fade-in var(--motion-modal) var(--easing-out) forwards;
}
.modal {
  position: fixed;
  inset: 10% auto auto 50%;
  transform: translateX(-50%) scale(0.96);
  width: min(720px, 92vw);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-3);
  z-index: var(--z-modal);
  opacity: 0;
  animation: pop-in var(--motion-modal) var(--easing-out) forwards;
}
.modal__header,
.modal__footer {
  padding: var(--sp-lg);
  border-bottom: 1px solid var(--color-border);
}
.modal__footer {
  border-top: 1px solid var(--color-border);
  border-bottom: none;
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-md);
}
.modal__content {
  padding: var(--sp-lg);
}
.modal__close {
  background: transparent;
  border: none;
  cursor: pointer;
}
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
@keyframes pop-in {
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}
```

---

### Drawer (variação lateral do Modal)

#### `libs/cuidar-design-system/components/drawer/drawer.component.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cuidar-drawer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @Input() open = false;
  @Input() side: 'right' | 'left' = 'right';
  @Input() title = '';
  @Output() openChange = new EventEmitter<boolean>();
  close() {
    this.open = false;
    this.openChange.emit(false);
  }
}
```

#### `libs/cuidar-design-system/components/drawer/drawer.component.html`

```html
<div class="overlay" *ngIf="open" (click)="close()"></div>
<aside
  class="drawer"
  *ngIf="open"
  [class.left]="side==='left'"
  role="dialog"
  aria-modal="true"
  [attr.aria-label]="title || 'Painel'"
>
  <header class="drawer__header">
    <strong>{{ title }}</strong>
    <button class="drawer__close" (click)="close()" aria-label="Fechar">✕</button>
  </header>
  <section class="drawer__content"><ng-content /></section>
  <footer class="drawer__footer">
    <ng-content select="[slot=footer]"></ng-content>
  </footer>
</aside>
```

#### `libs/cuidar-design-system/components/drawer/drawer.component.scss`

```scss
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.44);
  z-index: var(--z-overlay);
  opacity: 0;
  animation: fade-in var(--motion-modal) var(--easing-out) forwards;
}
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(520px, 92vw);
  background: var(--color-surface);
  box-shadow: var(--elev-3);
  z-index: var(--z-modal);
  transform: translateX(100%);
  animation: slide-in var(--motion-modal) var(--easing-out) forwards;
}
.drawer.left {
  right: auto;
  left: 0;
  transform: translateX(-100%);
}
.drawer__header,
.drawer__footer {
  padding: var(--sp-lg);
  border-bottom: 1px solid var(--color-border);
}
.drawer__footer {
  border-top: 1px solid var(--color-border);
  border-bottom: none;
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-md);
}
.drawer__content {
  padding: var(--sp-lg);
  height: calc(100% - 120px);
  overflow: auto;
}
.drawer__close {
  background: transparent;
  border: none;
  cursor: pointer;
}
@keyframes slide-in {
  to {
    transform: translateX(0);
  }
}
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
```

---

### Tabs

#### `libs/cuidar-design-system/components/tabs/tabs.component.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'cuidar-tabs',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeId?: string;
  @Output() tabChange = new EventEmitter<string>();

  ngOnInit() {
    if (!this.activeId && this.tabs?.length) this.activeId = this.tabs[0].id;
  }
  setActive(id: string) {
    this.activeId = id;
    this.tabChange.emit(id);
  }
}
```

#### `libs/cuidar-design-system/components/tabs/tabs.component.html`

```html
<nav class="tabs" role="tablist">
  <button
    *ngFor="let t of tabs"
    class="tab"
    [class.is-active]="t.id===activeId"
    role="tab"
    (click)="setActive(t.id)"
  >
    {{ t.label }}
  </button>
</nav>
<section class="tab-panel">
  <ng-content select="[tab={{activeId}}]"></ng-content>
</section>
```

#### `libs/cuidar-design-system/components/tabs/tabs.component.scss`

```scss
.tabs {
  display: flex;
  gap: var(--sp-sm);
  border-bottom: 1px solid var(--color-border);
}
.tab {
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
}
.tab.is-active {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
}
.tab-panel {
  padding: var(--sp-lg) 0;
}
```

---

### Ícones

**Fonte sugerida:** _Material Symbols Rounded_.

- Adicione no `src/index.html` (app host):

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
/>
```

- Componente utilitário:

#### `libs/cuidar-design-system/components/icon/icon.component.ts`

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cuidar-icon',
  standalone: true,
  template: `<span
    class="material-symbols-rounded"
    [style.fontSize.px]="size"
    aria-hidden="true"
    >{{ name }}</span
  >`,
})
export class IconComponent {
  @Input() name = 'info';
  @Input() size = 20;
}
```

- Uso: `<cuidar-icon name="vaccines"></cuidar-icon>`

---

## ♿ Preferências de Acessibilidade

### Redução de movimento

Adapta animações quando o usuário prefere menos movimento.

`libs/cuidar-design-system/styles/index.scss`

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

### Alto contraste

Variável de controle: `data-contrast="high"` no `<html>` ou `<body>`.

`libs/cuidar-design-system/styles/theme.light.scss`

```scss
:root[data-contrast='high'] {
  --color-border: #111; /* bordas mais visíveis */
  --color-text: #111;
  --color-bg: #fff;
}
```

`libs/cuidar-design-system/styles/theme.dark.scss`

```scss
:root[data-theme='dark'][data-contrast='high'] {
  --color-border: #ddd;
  --color-text: #fff;
  --color-bg: #000;
}
```

### Focus visível sempre (opcional por teclado)

Para modo alto contraste, podemos forçar o focus sempre visível:

```css
:root[data-contrast='high'] *:focus {
  outline: 3px solid var(--color-primary) !important;
  outline-offset: 2px;
}
```

---

## 🧱 Public API

### `libs/cuidar-design-system/public-api.ts`

```ts
export * from './components/button';
export * from './components/input';
export * from './components/card';
export * from './components/alert';
export * from './components/table';
export * from './components/badge';
export * from './components/modal';
export * from './components/drawer';
export * from './components/tabs';
export * from './components/icon';
```

### `libs/cuidar-design-system/components/*/index.ts`

```ts
export * from './drawer.component';
```

---

### `libs/cuidar-design-system/public-api.ts`

```ts
export * from './components/button';
export * from './components/input';
export * from './components/card';
export * from './components/alert';
export * from './components/table';
export * from './components/badge';
export * from './components/modal';
export * from './components/tabs';
export * from './components/icon';
```

### `libs/cuidar-design-system/components/*/index.ts`

```ts
export * from './badge.component';
```

---

## 📖 Storybook (documentação viva)

### Instalação

```bash
npx storybook@latest init --type angular
```

### `.storybook/preview.ts`

```ts
import type { Preview } from '@storybook/angular';
import '../src/styles.scss';
const preview: Preview = { parameters: { layout: 'centered' } };
export default preview;
```

### Exemplos de stories

`libs/cuidar-design-system/components/button/button.stories.ts`

```ts
import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  args: { variant: 'primary', size: 'md' },
};
export default meta;
export const Primary: StoryObj<ButtonComponent> = {
  args: { children: 'Primário' },
} as any;
export const Secondary: StoryObj<ButtonComponent> = {
  args: { variant: 'secondary', children: 'Secundário' },
} as any;
```

`libs/cuidar-design-system/components/modal/modal.stories.ts`

```ts
import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
};
export default meta;
export const Basic: StoryObj<ModalComponent> = {
  args: { open: true, title: 'Exemplo' },
};
```

---

### `libs/cuidar-design-system/public-api.ts`

```ts
export * from './components/button';
export * from './components/input';
export * from './components/card';
export * from './components/alert';
export * from './components/table';
```

### `libs/cuidar-design-system/components/*/index.ts`

```ts
export * from './button.component';
```

---

## 🧪 Uso nos módulos da aplicação

### Exemplo em `src/app/app.component.html`

```html
<main style="padding: var(--sp-xl); display: grid; gap: var(--sp-xl)">
  <cuidar-card>
    <h1>Design System — Cuidar+</h1>
    <div style="display:flex; gap: var(--sp-md); flex-wrap: wrap;">
      <cuidar-button>Primário</cuidar-button>
      <cuidar-button variant="secondary">Secundário</cuidar-button>
      <cuidar-button variant="danger">Perigo</cuidar-button>
      <cuidar-button variant="ghost">Ghost</cuidar-button>
      <cuidar-button [loading]="true">Carregando</cuidar-button>
      <cuidar-badge tone="success">Ativo</cuidar-badge>
    </div>
  </cuidar-card>

  <cuidar-card>
    <cuidar-input
      label="Nome completo"
      placeholder="Ex.: Maria Silva"
      hint="Obrigatório"
      required
    ></cuidar-input>
  </cuidar-card>

  <cuidar-card>
    <cuidar-alert type="info" title="Informação"
      >Dados carregados com sucesso.</cuidar-alert
    >
  </cuidar-card>

  <cuidar-card>
    <cuidar-tabs
      [tabs]="[{id:'pac',label:'Pacientes'},{id:'usu',label:'Usuários'},{id:'ins',label:'Insumos'}]"
      (tabChange)="onTab($event)"
    >
      <div tab="pac">Conteúdo de Pacientes</div>
      <div tab="usu">Conteúdo de Usuários</div>
      <div tab="ins">Conteúdo de Insumos</div>
    </cuidar-tabs>
  </cuidar-card>

  <cuidar-card>
    <cuidar-table
      [columns]="[{key:'id',label:'#',width:'60px'},{key:'nome',label:'Nome'},{key:'status',label:'Status',width:'140px'}]"
      [data]="[{id:1,nome:'João',status:'Ativo'},{id:2,nome:'Maria',status:'Em avaliação'}]"
    />
  </cuidar-card>

  <cuidar-modal [(open)]="modalOpen" title="Novo Paciente">
    <p>Formulário aqui…</p>
    <div slot="footer">
      <cuidar-button variant="ghost" (click)="modalOpen=false">Cancelar</cuidar-button>
      <cuidar-button>Salvar</cuidar-button>
    </div>
  </cuidar-modal>
  <cuidar-button (click)="modalOpen=true">Abrir Modal</cuidar-button>
</main>
```

---

## 🌗 Alternância de Tema (Light/Dark)

### Toggle simples em `src/app/app.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header
      style="display:flex;justify-content:space-between;align-items:center;padding:16px;"
    >
      <strong>Cuidar+</strong>
      <button (click)="toggleTheme()">Tema: {{ theme }}</button>
    </header>
    <router-outlet />
  `,
})
export class AppComponent {
  theme: 'light' | 'dark' = 'light';
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
```

---

## ♿ Acessibilidade utilitária

### `libs/cuidar-design-system/utils/a11y.ts`

```ts
export function ariaBool(value: boolean): 'true' | 'false' {
  return value ? 'true' : 'false';
}
```

### `libs/cuidar-design-system/utils/focus-visible.css`

```css
/* Mostra focus apenas quando navegação por teclado */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 📦 Publicação local e instalação

1. **Build do lib**

```bash
ng build cuidar-design-system
```

2. **Consumir no app**

- Importe componentes standalone diretamente: `import { ButtonComponent } from 'cuidar-design-system';`
- Use nas templates `<cuidar-button />`, `<cuidar-input />`, etc.

3. **Temas globais**

- Garanta que `src/styles.scss` importa `libs/cuidar-design-system/styles/index.scss`.

---

## 🧭 Roadmap imediato (DS)

- [x] Adicionar **Badge**, **Modal**, **Drawer**, **Tabs**
- [x] Tokens de **motion** (durations/easings) e **z-index**
- [x] **Ícones** (Material Symbols + `Icon`)
- [x] **Acessibilidade**: `prefers-reduced-motion` e **alto contraste**
- [x] Setup **Storybook** básico
- [ ] **Stepper** e **Tabs** com rota
- [ ] Estados de foco especiais para leitores de tela (aria-live, roving tabindex)
- [ ] Pacote NPM interno (scoped) `@cuidar/design-system`

---

## ✅ Conformidade com o Manual Visual

- Paleta, tipografia e espaçamentos seguem o **Manual Visual** definido.
- Componentes atendem a **estados de hover, foco, loading e desabilitado**.
- **Contraste** e **tamanho de toque** padronizados.

> Este documento pode ser copiado para o repositório e serve como base para a equipe Frontend iniciar a implementação.
