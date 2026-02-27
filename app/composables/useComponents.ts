export interface ComponentProp {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentDefinition {
  name: string
  slug: string
  category: string
  description: string
  platforms: ('HTML' | 'Vue' | 'React')[]
  props: ComponentProp[]
  code: {
    html?: string
    vue?: string
    react?: string
  }
}

const components: ComponentDefinition[] = [
  // ─── PRIMITIVI ───────────────────────────────────────
  {
    name: 'Button',
    slug: 'button',
    category: 'Primitivi',
    description: 'Pulsante con varianti primary, outline e ghost.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'variant', type: "'primary' | 'outline' | 'ghost'", default: "'primary'", description: 'Stile visivo del pulsante.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dimensione del pulsante.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabilita il pulsante.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Mostra lo spinner di caricamento.' },
    ],
    code: {
      html: `<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-primary {
    background-color: #2B3038;
    color: #fff;
  }
  .btn-primary:hover {
    background-color: #3d4551;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid #d1d5db;
    color: #2B3038;
  }
  .btn-outline:hover {
    background-color: #F2F3EF;
  }

  .btn-ghost {
    background: transparent;
    color: #2B3038;
  }
  .btn-ghost:hover {
    background-color: #F2F3EF;
  }
</style>

<button class="btn btn-primary">Conferma</button>
<button class="btn btn-outline">Annulla</button>
<button class="btn btn-ghost">Scopri di più</button>`,

      vue: `<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <button
    class="btn"
    :class="[
      \`btn--\${variant}\`,
      \`btn--\${size}\`,
      { 'btn--disabled': disabled || loading }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="spinner" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  gap: 8px;
}
.btn--sm { font-size: 12px; padding: 6px 12px; }
.btn--md { font-size: 14px; padding: 8px 16px; }
.btn--lg { font-size: 16px; padding: 10px 24px; }

.btn--primary { background: #2B3038; color: #fff; }
.btn--primary:hover { background: #3d4551; }

.btn--outline {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #2B3038;
}
.btn--outline:hover { background: #F2F3EF; }

.btn--ghost { background: transparent; color: #2B3038; }
.btn--ghost:hover { background: #F2F3EF; }

.btn--disabled { opacity: 0.5; pointer-events: none; }
</style>`,

      react: `import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}
        \${disabled || loading ? 'btn--disabled' : ''}
        \${className ?? ''}\`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  )
}`,
    },
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'Primitivi',
    description: 'Cerchio con immagine profilo o iniziali di fallback.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'src', type: 'string', default: "''", description: "URL dell'immagine profilo." },
      { name: 'initials', type: 'string', default: "'?'", description: 'Iniziali da mostrare come fallback.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Dimensione dell'avatar." },
    ],
    code: {
      html: `<style>
  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #F2F3EF;
    color: #6b7280;
    font-weight: 500;
    overflow: hidden;
    flex-shrink: 0;
  }
  .avatar--sm { width: 28px; height: 28px; font-size: 10px; }
  .avatar--md { width: 36px; height: 36px; font-size: 12px; }
  .avatar--lg { width: 44px; height: 44px; font-size: 14px; }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<!-- Con iniziali -->
<div class="avatar avatar--md">AB</div>

<!-- Con immagine -->
<div class="avatar avatar--lg">
  <img src="/avatar.jpg" alt="Nome Utente" />
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  src?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const imgError = ref(false)
</script>

<template>
  <div class="avatar" :class="\`avatar--\${size}\`">
    <img
      v-if="src && !imgError"
      :src="src"
      @error="imgError = true"
    />
    <span v-else>{{ initials || '?' }}</span>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #F2F3EF;
  color: #6b7280;
  font-weight: 500;
  overflow: hidden;
  flex-shrink: 0;
}
.avatar--sm { width: 28px; height: 28px; font-size: 10px; }
.avatar--md { width: 36px; height: 36px; font-size: 12px; }
.avatar--lg { width: 44px; height: 44px; font-size: 14px; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
</style>`,

      react: `import { useState } from 'react'

interface AvatarProps {
  src?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, initials = '?', size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={\`avatar avatar--\${size}\`}>
      {src && !imgError ? (
        <img src={src} onError={() => setImgError(true)} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}`,
    },
  },
  {
    name: 'Badge',
    slug: 'badge',
    category: 'Primitivi',
    description: 'Etichetta compatta per categorie, stati e tag.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'variant', type: "'default' | 'outline' | 'muted'", default: "'default'", description: 'Stile del badge.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Dimensione del badge.' },
    ],
    code: {
      html: `<style>
  .badge {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    user-select: none;
  }
  .badge--sm {
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .badge--md {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 6px;
  }
  .badge--default {
    background-color: #2B3038;
    color: #F2F3EF;
  }
  .badge--outline {
    border: 1px solid #d1d5db;
    color: #2B3038;
  }
  .badge--muted {
    background-color: #eceee9;
    color: #6b7280;
  }
</style>

<span class="badge badge--md badge--default">Default</span>
<span class="badge badge--md badge--outline">Outline</span>
<span class="badge badge--sm badge--muted">Muted</span>`,

      vue: `<script setup lang="ts">
interface Props {
  variant?: 'default' | 'outline' | 'muted'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})
</script>

<template>
  <span class="badge" :class="[\`badge--\${variant}\`, \`badge--\${size}\`]">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  user-select: none;
}
.badge--sm { font-size: 10px; padding: 2px 8px; border-radius: 4px; }
.badge--md { font-size: 12px; padding: 4px 10px; border-radius: 6px; }
.badge--default { background: #2B3038; color: #F2F3EF; }
.badge--outline { border: 1px solid #d1d5db; color: #2B3038; }
.badge--muted { background: #eceee9; color: #6b7280; }
</style>`,

      react: `interface BadgeProps {
  variant?: 'default' | 'outline' | 'muted'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
}: BadgeProps) {
  return (
    <span className={\`badge badge--\${variant} badge--\${size}\`}>
      {children}
    </span>
  )
}`,
    },
  },

  // ─── FORM ──────────────────────────────────────────────
  {
    name: 'Input',
    slug: 'input',
    category: 'Form',
    description: 'Campo di testo con label opzionale e stati focus/error.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra il campo.' },
      { name: 'placeholder', type: 'string', default: "''", description: 'Testo placeholder.' },
      { name: 'type', type: 'string', default: "'text'", description: 'Tipo di input HTML.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabilita il campo.' },
    ],
    code: {
      html: `<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-label {
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    font-family: inherit;
    color: #2B3038;
    background: #F2F3EF;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    transition: all 0.15s ease;
  }

  .input::placeholder { color: #9ca3af; }
  .input:focus {
    border-color: #2B3038;
    box-shadow: 0 0 0 2px rgba(43, 48, 56, 0.08);
  }
</style>

<div class="input-group">
  <label class="input-label">Email</label>
  <input class="input" type="email" placeholder="nome@esempio.com" />
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  label?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      class="input-field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.input-group { display: flex; flex-direction: column; gap: 6px; }
.input-label {
  font-size: 11px; font-weight: 500;
  color: #6b7280; text-transform: uppercase;
  letter-spacing: 0.05em;
}
.input-field {
  width: 100%; padding: 10px 14px;
  font-size: 14px; font-family: inherit;
  color: #2B3038; background: #F2F3EF;
  border: 1px solid #e5e7eb; border-radius: 8px;
  outline: none; transition: all 0.15s ease;
}
.input-field::placeholder { color: #9ca3af; }
.input-field:focus {
  border-color: #2B3038;
  box-shadow: 0 0 0 2px rgba(43, 48, 56, 0.08);
}
.input-field:disabled { opacity: 0.5; cursor: not-allowed; }
</style>`,

      react: `import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input className={\`input-field \${className ?? ''}\`} {...props} />
    </div>
  )
}`,
    },
  },
  {
    name: 'Select',
    slug: 'select',
    category: 'Form',
    description: 'Dropdown di selezione con lista di opzioni.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Lista delle opzioni.' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra il select.' },
      { name: 'placeholder', type: 'string', default: "'Seleziona...'", description: 'Testo placeholder.' },
    ],
    code: {
      html: `<style>
  .select-group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 260px;
  }

  .select-label {
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .select-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 14px;
    font-family: inherit;
    color: #2B3038;
    background: #F2F3EF;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    transition: all 0.15s ease;
  }

  .select-trigger:focus {
    border-color: #2B3038;
    box-shadow: 0 0 0 2px rgba(43, 48, 56, 0.08);
  }

  .select-trigger .placeholder {
    color: #9ca3af;
  }

  .select-trigger .chevron {
    width: 16px;
    height: 16px;
    color: #6b7280;
    transition: transform 0.2s;
  }

  .select-trigger.open .chevron {
    transform: rotate(180deg);
  }

  .select-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 4px 0;
    z-index: 50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .select-dropdown.open {
    display: block;
  }

  .select-option {
    width: 100%;
    padding: 8px 14px;
    font-size: 14px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    font-family: inherit;
    transition: all 0.1s;
  }

  .select-option:hover {
    background: #F2F3EF;
    color: #2B3038;
  }

  .select-option.selected {
    background: #eceee9;
    color: #2B3038;
    font-weight: 500;
  }
</style>

<div class="select-group">
  <label class="select-label">Ruolo</label>
  <button class="select-trigger" onclick="toggleSelect(this)">
    <span class="placeholder">Seleziona...</span>
    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>
  <div class="select-dropdown">
    <button class="select-option" onclick="pickOption(this, 'designer')">Designer</button>
    <button class="select-option" onclick="pickOption(this, 'developer')">Developer</button>
    <button class="select-option" onclick="pickOption(this, 'manager')">Manager</button>
  </div>
</div>

<script>
  function toggleSelect(trigger) {
    const dropdown = trigger.nextElementSibling;
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.select-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.select-trigger.open').forEach(t => t.classList.remove('open'));
    if (!isOpen) {
      dropdown.classList.add('open');
      trigger.classList.add('open');
    }
  }

  function pickOption(option, value) {
    const group = option.closest('.select-group');
    const trigger = group.querySelector('.select-trigger');
    const label = trigger.querySelector('span');
    label.textContent = option.textContent;
    label.classList.remove('placeholder');
    group.querySelectorAll('.select-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    group.querySelector('.select-dropdown').classList.remove('open');
    trigger.classList.remove('open');
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.select-group')) {
      document.querySelectorAll('.select-dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.select-trigger.open').forEach(t => t.classList.remove('open'));
    }
  });
<\/script>`,

      vue: `<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  modelValue?: string
  options: Option[]
  placeholder?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Seleziona...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const selectRef = ref<HTMLElement>()

function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}

function onClickOutside(e: Event) {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="selectRef" class="select-group">
    <label v-if="label" class="select-label">{{ label }}</label>
    <button class="select-trigger" @click="open = !open">
      <span :class="{ placeholder: !modelValue }">
        {{ options.find(o => o.value === modelValue)?.label || placeholder }}
      </span>
      <svg class="chevron" :class="{ rotated: open }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    <div v-if="open" class="select-dropdown">
      <button
        v-for="opt in options"
        :key="opt.value"
        class="select-option"
        :class="{ selected: opt.value === modelValue }"
        @click="select(opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.select-group { position: relative; display: flex; flex-direction: column; gap: 6px; }
.select-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
.select-trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; font-size: 14px; font-family: inherit;
  background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px;
  cursor: pointer; outline: none; transition: all 0.15s ease;
}
.select-trigger:focus { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
.placeholder { color: #9ca3af; }
.chevron { width: 16px; height: 16px; color: #6b7280; transition: transform 0.2s; }
.chevron.rotated { transform: rotate(180deg); }
.select-dropdown {
  position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 4px 0; z-index: 50; overflow: hidden;
}
.select-option {
  width: 100%; padding: 8px 14px; font-size: 14px; text-align: left;
  background: none; border: none; cursor: pointer; color: #6b7280;
  transition: all 0.1s;
}
.select-option:hover { background: #F2F3EF; color: #2B3038; }
.select-option.selected { background: #eceee9; color: #2B3038; font-weight: 500; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect } from 'react'

interface Option { label: string; value: string }

interface SelectProps {
  value?: string
  options: Option[]
  placeholder?: string
  label?: string
  onChange?: (value: string) => void
}

export function Select({
  value, options, placeholder = 'Seleziona...', label, onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div ref={ref} className="select-group">
      {label && <label className="select-label">{label}</label>}
      <button className="select-trigger" onClick={() => setOpen(!open)}>
        <span className={!value ? 'placeholder' : ''}>
          {selected?.label || placeholder}
        </span>
      </button>
      {open && (
        <div className="select-dropdown">
          {options.map(opt => (
            <button
              key={opt.value}
              className={\`select-option \${opt.value === value ? 'selected' : ''}\`}
              onClick={() => { onChange?.(opt.value); setOpen(false) }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
    },
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'Form',
    description: 'Casella di spunta con label e stato controllato.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Stato della checkbox.' },
      { name: 'label', type: 'string', default: "''", description: 'Testo associato.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabilita la checkbox.' },
    ],
    code: {
      html: `<style>
  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-box {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    flex-shrink: 0;
  }

  .checkbox-box.checked {
    background: #2B3038;
    border-color: #2B3038;
  }

  .checkbox-box svg {
    width: 12px;
    height: 12px;
    color: #fff;
    display: none;
  }

  .checkbox-box.checked svg {
    display: block;
  }

  .checkbox-label {
    font-size: 14px;
    color: #2B3038;
  }
</style>

<label class="checkbox-group" onclick="this.querySelector('.checkbox-box').classList.toggle('checked')">
  <div class="checkbox-box checked">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </div>
  <span class="checkbox-label">Accetto i termini</span>
</label>

<label class="checkbox-group" onclick="this.querySelector('.checkbox-box').classList.toggle('checked')">
  <div class="checkbox-box">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </div>
  <span class="checkbox-label">Ricordami</span>
</label>`,

      vue: `<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="checkbox-group" :class="{ disabled }">
    <div
      class="checkbox-box"
      :class="{ checked: modelValue }"
      @click="!disabled && emit('update:modelValue', !modelValue)"
    >
      <svg v-if="modelValue" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-group { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.checkbox-box {
  width: 18px; height: 18px; border: 2px solid #d1d5db;
  border-radius: 4px; display: flex; align-items: center;
  justify-content: center; transition: all 0.15s ease;
}
.checkbox-box.checked { background: #2B3038; border-color: #2B3038; }
.check-icon { width: 12px; height: 12px; color: #fff; }
.checkbox-label { font-size: 14px; color: #2B3038; }
.disabled { opacity: 0.5; pointer-events: none; }
</style>`,

      react: `interface CheckboxProps {
  checked?: boolean
  label?: string
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  checked = false, label, disabled, onChange,
}: CheckboxProps) {
  return (
    <label className={\`checkbox-group \${disabled ? 'disabled' : ''}\`}>
      <div
        className={\`checkbox-box \${checked ? 'checked' : ''}\`}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        {checked && (
          <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  )
}`,
    },
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    category: 'Form',
    description: 'Interruttore on/off per impostazioni binarie.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Stato del toggle.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabilita il toggle.' },
    ],
    code: {
      html: `<style>
  .toggle {
    position: relative;
    display: inline-flex;
    width: 44px;
    height: 24px;
    background: #d1d5db;
    border-radius: 12px;
    cursor: pointer;
    border: none;
    padding: 0;
    transition: background 0.2s ease;
  }

  .toggle.active {
    background: #2B3038;
  }

  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .toggle.active .toggle-knob {
    transform: translateX(20px);
  }
</style>

<button class="toggle active" onclick="this.classList.toggle('active')">
  <span class="toggle-knob"></span>
</button>`,

      vue: `<script setup lang="ts">
interface Props {
  modelValue?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <button
    class="toggle"
    :class="{ active: modelValue, disabled }"
    @click="!disabled && emit('update:modelValue', !modelValue)"
  >
    <span class="toggle-knob" />
  </button>
</template>

<style scoped>
.toggle {
  position: relative; display: inline-flex;
  width: 44px; height: 24px;
  background: #d1d5db; border-radius: 12px;
  cursor: pointer; border: none; padding: 0;
  transition: background 0.2s ease;
}
.toggle.active { background: #2B3038; }
.toggle-knob {
  position: absolute; top: 2px; left: 2px;
  width: 20px; height: 20px;
  background: #fff; border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.toggle.active .toggle-knob { transform: translateX(20px); }
.toggle.disabled { opacity: 0.5; pointer-events: none; }
</style>`,

      react: `'use client'

interface ToggleProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export function Toggle({ checked = false, disabled, onChange }: ToggleProps) {
  return (
    <button
      className={\`toggle \${checked ? 'active' : ''} \${disabled ? 'disabled' : ''}\`}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      <span className="toggle-knob" />
    </button>
  )
}`,
    },
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    category: 'Form',
    description: 'Campo di testo multiriga con ridimensionamento.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra il campo.' },
      { name: 'placeholder', type: 'string', default: "''", description: 'Testo placeholder.' },
      { name: 'rows', type: 'number', default: '4', description: 'Numero di righe visibili.' },
    ],
    code: {
      html: `<style>
  .textarea-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .textarea-label {
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .textarea {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    font-family: inherit;
    color: #2B3038;
    background: #F2F3EF;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    resize: vertical;
    transition: all 0.15s ease;
  }

  .textarea::placeholder { color: #9ca3af; }
  .textarea:focus {
    border-color: #2B3038;
    box-shadow: 0 0 0 2px rgba(43, 48, 56, 0.08);
  }
</style>

<div class="textarea-group">
  <label class="textarea-label">Messaggio</label>
  <textarea class="textarea" rows="4" placeholder="Scrivi il tuo messaggio..."></textarea>
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  label?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="textarea-group">
    <label v-if="label" class="textarea-label">{{ label }}</label>
    <textarea
      class="textarea-field"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<style scoped>
.textarea-group { display: flex; flex-direction: column; gap: 6px; }
.textarea-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
.textarea-field {
  width: 100%; padding: 10px 14px; font-size: 14px; font-family: inherit;
  color: #2B3038; background: #F2F3EF; border: 1px solid #e5e7eb;
  border-radius: 8px; outline: none; resize: vertical; transition: all 0.15s ease;
}
.textarea-field::placeholder { color: #9ca3af; }
.textarea-field:focus { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
</style>`,

      react: `import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="textarea-group">
      {label && <label className="textarea-label">{label}</label>}
      <textarea className={\`textarea-field \${className ?? ''}\`} rows={4} {...props} />
    </div>
  )
}`,
    },
  },

  // ─── NAVIGAZIONE ─────────────────────────────────────
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'Navigazione',
    description: 'Barra di tab con indicatore animato.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'tabs', type: '{ label: string; value: string }[]', default: '[]', description: 'Lista delle tab.' },
      { name: 'modelValue', type: 'string', default: "''", description: 'Tab attiva corrente.' },
    ],
    code: {
      html: `<style>
  .tabs {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    background: #eceee9;
    border-radius: 8px;
  }

  .tab {
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border: none;
    background: transparent;
    color: #6b7280;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab:hover { color: #2B3038; }

  .tab.active {
    background: #fff;
    color: #2B3038;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  }
</style>

<div class="tabs">
  <button class="tab active">Generale</button>
  <button class="tab">Sicurezza</button>
  <button class="tab">Notifiche</button>
</div>`,

      vue: `<script setup lang="ts">
interface Tab { label: string; value: string }

interface Props {
  modelValue: string
  tabs: Tab[]
}

defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="tabs-bar">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="tab-item"
      :class="{ active: tab.value === modelValue }"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs-bar { display: flex; gap: 2px; padding: 4px; background: #eceee9; border-radius: 8px; }
.tab-item {
  padding: 6px 14px; font-size: 14px; font-weight: 500;
  font-family: inherit; border: none; background: transparent;
  color: #6b7280; border-radius: 6px; cursor: pointer; transition: all 0.2s;
}
.tab-item:hover { color: #2B3038; }
.tab-item.active {
  background: #fff; color: #2B3038;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
</style>`,

      react: `'use client'

interface Tab { label: string; value: string }

interface TabsProps {
  value: string
  tabs: Tab[]
  onChange: (value: string) => void
}

export function Tabs({ value, tabs, onChange }: TabsProps) {
  return (
    <div className="tabs-bar">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={\`tab-item \${tab.value === value ? 'active' : ''}\`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}`,
    },
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'Navigazione',
    description: 'Percorso di navigazione con separatori.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: '{ label: string; href?: string }[]', default: '[]', description: 'Segmenti del percorso.' },
    ],
    code: {
      html: `<style>
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .breadcrumb-link {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.15s;
  }
  .breadcrumb-link:hover { color: #2B3038; }

  .breadcrumb-separator {
    color: #d1d5db;
    font-size: 12px;
  }

  .breadcrumb-current {
    color: #2B3038;
    font-weight: 500;
  }
</style>

<nav class="breadcrumb">
  <a href="/" class="breadcrumb-link">Home</a>
  <span class="breadcrumb-separator">›</span>
  <a href="/products" class="breadcrumb-link">Prodotti</a>
  <span class="breadcrumb-separator">›</span>
  <span class="breadcrumb-current">Dettaglio</span>
</nav>`,

      vue: `<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{ items: BreadcrumbItem[] }>()
</script>

<template>
  <nav class="breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <NuxtLink v-if="item.to" :to="item.to" class="breadcrumb-link">
        {{ item.label }}
      </NuxtLink>
      <span v-else class="breadcrumb-current">{{ item.label }}</span>
      <span v-if="i < items.length - 1" class="breadcrumb-separator">›</span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.breadcrumb-link { color: #6b7280; text-decoration: none; transition: color 0.15s; }
.breadcrumb-link:hover { color: #2B3038; }
.breadcrumb-separator { color: #d1d5db; font-size: 12px; }
.breadcrumb-current { color: #2B3038; font-weight: 500; }
</style>`,

      react: `interface BreadcrumbItem { label: string; href?: string }

interface BreadcrumbProps { items: BreadcrumbItem[] }

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <a href={item.href} className="breadcrumb-link">{item.label}</a>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="breadcrumb-separator">›</span>}
        </span>
      ))}
    </nav>
  )
}`,
    },
  },
  {
    name: 'Dropdown Menu',
    slug: 'dropdown-menu',
    category: 'Navigazione',
    description: 'Menu contestuale con azioni e separatori.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: '{ label: string; action?: () => void; separator?: boolean }[]', default: '[]', description: 'Voci del menu.' },
    ],
    code: {
      html: `<style>
  .dropdown {
    position: relative;
    display: inline-flex;
  }

  .dropdown-trigger {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #2B3038;
    transition: all 0.15s;
  }

  .dropdown-trigger:hover {
    background: #F2F3EF;
  }

  .dropdown-trigger .chevron {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    min-width: 160px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 4px 0;
    z-index: 50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .dropdown-menu.open {
    display: block;
  }

  .dropdown-item {
    width: 100%;
    padding: 8px 14px;
    font-size: 14px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: #2B3038;
    font-family: inherit;
    transition: background 0.1s;
  }

  .dropdown-item:hover {
    background: #F2F3EF;
  }

  .dropdown-item.danger {
    color: #dc2626;
  }

  .dropdown-item.danger:hover {
    background: #fef2f2;
  }

  .dropdown-separator {
    height: 1px;
    background: #e5e7eb;
    margin: 4px 0;
  }
</style>

<div class="dropdown">
  <button class="dropdown-trigger" onclick="this.nextElementSibling.classList.toggle('open')">
    Azioni
    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div class="dropdown-menu">
    <button class="dropdown-item" onclick="alert('Modifica')">Modifica</button>
    <button class="dropdown-item" onclick="alert('Duplica')">Duplica</button>
    <div class="dropdown-separator"></div>
    <button class="dropdown-item danger" onclick="alert('Elimina')">Elimina</button>
  </div>
</div>

<script>
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    }
  });
<\/script>`,

      vue: `<script setup lang="ts">
interface MenuItem {
  label: string
  danger?: boolean
  action?: () => void
}

defineProps<{ items: MenuItem[] }>()

const open = ref(false)
const menuRef = ref<HTMLElement>()

function onClickOutside(e: Event) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="menuRef" class="dropdown">
    <button class="dropdown-trigger" @click="open = !open">
      <slot>Azioni</slot>
    </button>
    <div v-if="open" class="dropdown-menu">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="dropdown-item"
        :class="{ danger: item.danger }"
        @click="item.action?.(); open = false"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown { position: relative; display: inline-flex; }
.dropdown-trigger {
  padding: 6px 12px; font-size: 14px; font-weight: 500;
  background: transparent; border: 1px solid #d1d5db;
  border-radius: 8px; cursor: pointer; font-family: inherit;
}
.dropdown-menu {
  position: absolute; top: 100%; left: 0; margin-top: 4px;
  min-width: 160px; background: #fff; border: 1px solid #e5e7eb;
  border-radius: 8px; padding: 4px 0; z-index: 50;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.dropdown-item {
  width: 100%; padding: 8px 14px; font-size: 14px;
  text-align: left; background: none; border: none;
  cursor: pointer; color: #2B3038; transition: background 0.1s;
}
.dropdown-item:hover { background: #F2F3EF; }
.dropdown-item.danger { color: #dc2626; }
.dropdown-item.danger:hover { background: #fef2f2; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect } from 'react'

interface MenuItem { label: string; danger?: boolean; action?: () => void }

interface DropdownMenuProps {
  trigger?: React.ReactNode
  items: MenuItem[]
}

export function DropdownMenu({ trigger = 'Azioni', items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div ref={ref} className="dropdown">
      <button className="dropdown-trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </button>
      {open && (
        <div className="dropdown-menu">
          {items.map((item, i) => (
            <button
              key={i}
              className={\`dropdown-item \${item.danger ? 'danger' : ''}\`}
              onClick={() => { item.action?.(); setOpen(false) }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
    },
  },

  // ─── OVERLAY ─────────────────────────────────────────
  {
    name: 'Modal',
    slug: 'modal',
    category: 'Overlay',
    description: 'Dialogo modale con overlay, header e azioni.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Visibilità del modale.' },
      { name: 'title', type: 'string', default: "''", description: 'Titolo del modale.' },
    ],
    code: {
      html: `<style>
  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-overlay.open {
    display: flex;
  }

  .modal-content {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 440px;
    overflow: hidden;
    animation: modal-in 0.2s ease;
  }

  @keyframes modal-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
  }

  .modal-title {
    font-size: 16px;
    font-weight: 600;
    color: #2B3038;
    margin: 0;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 16px;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
  }

  .modal-close:hover {
    color: #2B3038;
  }

  .modal-body {
    padding: 0 24px 20px;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px;
    background: #fafafa;
    border-top: 1px solid #e5e7eb;
  }

  .modal-footer .btn {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
  }

  .modal-footer .btn-outline {
    background: transparent;
    border: 1px solid #d1d5db;
    color: #2B3038;
  }

  .modal-footer .btn-primary {
    background: #2B3038;
    color: #fff;
  }
</style>

<button class="btn btn-primary" onclick="document.getElementById('myModal').classList.add('open')">
  Apri modale
</button>

<div id="myModal" class="modal-overlay" onclick="if(event.target===this)this.classList.remove('open')">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Conferma eliminazione</h3>
      <button class="modal-close" onclick="document.getElementById('myModal').classList.remove('open')">✕</button>
    </div>
    <div class="modal-body">
      Sei sicuro di voler eliminare questo elemento? L'azione è irreversibile.
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="document.getElementById('myModal').classList.remove('open')">Annulla</button>
      <button class="btn btn-primary" onclick="document.getElementById('myModal').classList.remove('open')">Elimina</button>
    </div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  open: boolean
  title?: string
}

defineProps<Props>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" @click="emit('close')">✕</button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-content {
  background: #fff; border-radius: 16px;
  width: 100%; max-width: 440px; overflow: hidden;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px;
}
.modal-title { font-size: 16px; font-weight: 600; color: #2B3038; }
.modal-close {
  background: none; border: none; font-size: 16px;
  color: #6b7280; cursor: pointer;
}
.modal-body { padding: 0 24px 20px; font-size: 14px; color: #6b7280; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 16px 24px; background: #fafafa;
  border-top: 1px solid #e5e7eb;
}
</style>`,

      react: `'use client'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}`,
    },
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'Overlay',
    description: 'Tooltip informativo che appare al passaggio del mouse.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'text', type: 'string', default: "''", description: 'Testo del tooltip.' },
      { name: 'position', type: "'top' | 'bottom'", default: "'top'", description: 'Posizione del tooltip.' },
    ],
    code: {
      html: `<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .tooltip-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background: #2B3038;
    border-radius: 6px;
    white-space: nowrap;
    z-index: 50;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .tooltip-wrapper:hover .tooltip-box {
    opacity: 1;
  }

  .tooltip-box.top {
    bottom: calc(100% + 8px);
  }

  .tooltip-box.bottom {
    top: calc(100% + 8px);
  }

  .tooltip-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #2B3038;
  }

  .tooltip-box.top .tooltip-arrow {
    bottom: -4px;
  }

  .tooltip-box.bottom .tooltip-arrow {
    top: -4px;
  }

  .tooltip-trigger {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    color: #2B3038;
  }
</style>

<div class="tooltip-wrapper">
  <button class="tooltip-trigger">Passa sopra</button>
  <div class="tooltip-box top">
    Testo di aiuto
    <div class="tooltip-arrow"></div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  text: string
  position?: 'top' | 'bottom'
}

withDefaults(defineProps<Props>(), {
  position: 'top',
})

const visible = ref(false)
</script>

<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <div v-if="visible" class="tooltip-box" :class="\`tooltip--\${position}\`">
      {{ text }}
      <div class="tooltip-arrow" />
    </div>
  </div>
</template>

<style scoped>
.tooltip-wrapper { position: relative; display: inline-flex; }
.tooltip-box {
  position: absolute; left: 50%; transform: translateX(-50%);
  padding: 6px 10px; font-size: 12px; font-weight: 500;
  color: #fff; background: #2B3038; border-radius: 6px;
  white-space: nowrap; z-index: 50; pointer-events: none;
}
.tooltip--top { bottom: calc(100% + 8px); }
.tooltip--bottom { top: calc(100% + 8px); }
.tooltip-arrow {
  position: absolute; left: 50%; transform: translateX(-50%) rotate(45deg);
  width: 8px; height: 8px; background: #2B3038;
}
.tooltip--top .tooltip-arrow { bottom: -4px; }
.tooltip--bottom .tooltip-arrow { top: -4px; }
</style>`,

      react: `'use client'
import { useState } from 'react'

interface TooltipProps {
  text: string
  position?: 'top' | 'bottom'
  children: React.ReactNode
}

export function Tooltip({ text, position = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={\`tooltip-box tooltip--\${position}\`}>
          {text}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  )
}`,
    },
  },

  // ─── LAYOUT ──────────────────────────────────────────
  {
    name: 'Card',
    slug: 'card',
    category: 'Layout',
    description: 'Contenitore con bordo e aree per header, body e footer.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'title', type: 'string', default: "''", description: 'Titolo della card.' },
      { name: 'description', type: 'string', default: "''", description: 'Descrizione breve.' },
    ],
    code: {
      html: `<style>
  .card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
  }

  .card-cover {
    height: 140px;
    background: linear-gradient(135deg, #F2F3EF, #e5e7eb);
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: #2B3038;
    margin: 0 0 4px;
  }

  .card-description {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }
</style>

<div class="card">
  <div class="card-cover"></div>
  <div class="card-body">
    <h3 class="card-title">Titolo card</h3>
    <p class="card-description">
      Una breve descrizione del contenuto di questa card.
    </p>
  </div>
</div>`,

      vue: `<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="card">
    <slot name="cover" />
    <div class="card-body">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-description">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
.card-body { padding: 20px; }
.card-title { font-size: 14px; font-weight: 600; color: #2B3038; margin: 0 0 4px; }
.card-description { font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5; }
</style>`,

      react: `interface CardProps {
  title?: string
  description?: string
  cover?: React.ReactNode
  children?: React.ReactNode
}

export function Card({ title, description, cover, children }: CardProps) {
  return (
    <div className="card">
      {cover}
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
    </div>
  )
}`,
    },
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'Layout',
    description: 'Pannelli espandibili per mostrare/nascondere contenuto.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: '{ title: string; content: string }[]', default: '[]', description: 'Pannelli da renderizzare.' },
    ],
    code: {
      html: `<style>
  .accordion {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }

  .accordion-item + .accordion-item {
    border-top: 1px solid #e5e7eb;
  }

  .accordion-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    color: #2B3038;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .accordion-trigger:hover { background: #fafafa; }

  .accordion-content {
    padding: 0 16px 14px;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }
</style>

<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-trigger">
      Come funziona?
      <span>▾</span>
    </button>
    <div class="accordion-content">
      Copia il codice e incollalo nel tuo progetto.
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-trigger">
      È gratuito?
      <span>▸</span>
    </button>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface AccordionItem {
  title: string
  content: string
}

defineProps<{ items: AccordionItem[] }>()
const openIndex = ref<number>(-1)
</script>

<template>
  <div class="accordion">
    <div v-for="(item, i) in items" :key="i" class="accordion-item">
      <button
        class="accordion-trigger"
        @click="openIndex = openIndex === i ? -1 : i"
      >
        {{ item.title }}
        <svg
          class="accordion-icon"
          :class="{ open: openIndex === i }"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-if="openIndex === i" class="accordion-content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
.accordion-item + .accordion-item { border-top: 1px solid #e5e7eb; }
.accordion-trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; font-size: 14px; font-weight: 500; font-family: inherit;
  color: #2B3038; background: none; border: none; cursor: pointer; text-align: left;
}
.accordion-trigger:hover { background: #fafafa; }
.accordion-icon { width: 16px; height: 16px; color: #6b7280; transition: transform 0.2s; }
.accordion-icon.open { transform: rotate(180deg); }
.accordion-content { padding: 0 16px 14px; font-size: 14px; color: #6b7280; line-height: 1.5; }
</style>`,

      react: `'use client'
import { useState } from 'react'

interface AccordionItem { title: string; content: string }

interface AccordionProps { items: AccordionItem[] }

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(-1)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            className="accordion-trigger"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {item.title}
            <span className={\`accordion-icon \${openIndex === i ? 'open' : ''}\`}>▾</span>
          </button>
          {openIndex === i && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}`,
    },
  },

  // ─── DATI ────────────────────────────────────────────
  {
    name: 'Data Table',
    slug: 'data-table',
    category: 'Dati',
    description: 'Tabella dati con header, righe e colonne tipizzate.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'columns', type: '{ key: string; label: string }[]', default: '[]', description: 'Definizione colonne.' },
      { name: 'rows', type: 'Record<string, any>[]', default: '[]', description: 'Dati delle righe.' },
    ],
    code: {
      html: `<style>
  .table-wrapper {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .data-table th {
    padding: 10px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
    background: #F2F3EF;
  }

  .data-table td {
    padding: 10px 16px;
    color: #2B3038;
    border-top: 1px solid #f3f4f6;
  }

  .data-table tr:hover td {
    background: #fafafa;
  }

  .badge-sm {
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .badge-active {
    background: #2B3038;
    color: #F2F3EF;
  }

  .badge-inactive {
    background: #eceee9;
    color: #6b7280;
  }
</style>

<div class="table-wrapper">
  <table class="data-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Ruolo</th>
        <th>Stato</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Marco Rossi</td>
        <td style="color: #6b7280;">Admin</td>
        <td><span class="badge-sm badge-active">Attivo</span></td>
      </tr>
      <tr>
        <td>Laura Bianchi</td>
        <td style="color: #6b7280;">Editor</td>
        <td><span class="badge-sm badge-inactive">Inattivo</span></td>
      </tr>
      <tr>
        <td>Luca Verdi</td>
        <td style="color: #6b7280;">Viewer</td>
        <td><span class="badge-sm badge-active">Attivo</span></td>
      </tr>
    </tbody>
  </table>
</div>`,

      vue: `<script setup lang="ts">
interface Column { key: string; label: string }

defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
}>()
</script>

<template>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.data-table th {
  padding: 10px 16px; text-align: left; font-size: 12px;
  font-weight: 500; color: #6b7280; background: #F2F3EF;
}
.data-table td {
  padding: 10px 16px; color: #2B3038;
  border-top: 1px solid #f3f4f6;
}
.data-table tr:hover td { background: #fafafa; }
</style>`,

      react: `interface Column { key: string; label: string }

interface DataTableProps {
  columns: Column[]
  rows: Record<string, any>[]
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`,
    },
  },

  // ─── FEEDBACK ────────────────────────────────────────
  {
    name: 'Toast',
    slug: 'toast',
    category: 'Feedback',
    description: 'Notifica temporanea con varianti successo, errore e info.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'message', type: 'string', default: "''", description: 'Testo della notifica.' },
      { name: 'variant', type: "'success' | 'error' | 'info'", default: "'success'", description: 'Stile della notifica.' },
    ],
    code: {
      html: `<style>
  .toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 360px;
    margin-bottom: 8px;
  }

  .toast--success { border-color: #bbf7d0; }
  .toast--error { border-color: #fecaca; }
  .toast--info { border-color: #bfdbfe; }

  .toast-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toast--success .toast-icon {
    background: #dcfce7;
    color: #16a34a;
  }

  .toast--error .toast-icon {
    background: #fee2e2;
    color: #dc2626;
  }

  .toast--info .toast-icon {
    background: #dbeafe;
    color: #2563eb;
  }

  .toast-icon svg {
    width: 12px;
    height: 12px;
  }

  .toast-body {
    flex: 1;
  }

  .toast-title {
    font-size: 14px;
    font-weight: 500;
    color: #2B3038;
    margin: 0;
  }

  .toast-desc {
    font-size: 12px;
    color: #6b7280;
    margin: 2px 0 0;
  }

  .toast-close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 14px;
    padding: 2px;
    line-height: 1;
  }

  .toast-close:hover {
    color: #2B3038;
  }
</style>

<div class="toast toast--success">
  <div class="toast-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  </div>
  <div class="toast-body">
    <p class="toast-title">Salvato con successo</p>
    <p class="toast-desc">Le modifiche sono state applicate.</p>
  </div>
  <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
</div>

<div class="toast toast--error">
  <div class="toast-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
  <div class="toast-body">
    <p class="toast-title">Errore</p>
    <p class="toast-desc">Qualcosa è andato storto.</p>
  </div>
  <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
</div>`,

      vue: `<script setup lang="ts">
interface Props {
  message: string
  variant?: 'success' | 'error' | 'info'
  visible?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'success',
  visible: true,
})

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :class="\`toast--\${variant}\`">
      <div class="toast-icon">
        <svg v-if="variant === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <svg v-else-if="variant === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 9v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      </div>
      <p class="toast-message">{{ message }}</p>
      <button class="toast-close" @click="emit('close')">✕</button>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; background: #fff;
  border: 1px solid #e5e7eb; border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.toast--success { border-color: #bbf7d0; }
.toast--error { border-color: #fecaca; }
.toast--info { border-color: #bfdbfe; }
.toast-icon { width: 20px; height: 20px; flex-shrink: 0; }
.toast--success .toast-icon { color: #16a34a; }
.toast--error .toast-icon { color: #dc2626; }
.toast--info .toast-icon { color: #2563eb; }
.toast-message { font-size: 14px; color: #2B3038; font-weight: 500; }
.toast-close { background: none; border: none; color: #9ca3af; cursor: pointer; margin-left: auto; }
</style>`,

      react: `'use client'

interface ToastProps {
  message: string
  variant?: 'success' | 'error' | 'info'
  onClose?: () => void
}

export function Toast({ message, variant = 'success', onClose }: ToastProps) {
  return (
    <div className={\`toast toast--\${variant}\`}>
      <div className="toast-icon">
        {variant === 'success' && '✓'}
        {variant === 'error' && '✕'}
        {variant === 'info' && 'ℹ'}
      </div>
      <p className="toast-message">{message}</p>
      {onClose && (
        <button className="toast-close" onClick={onClose}>✕</button>
      )}
    </div>
  )
}`,
    },
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    category: 'Feedback',
    description: 'Placeholder animato per contenuto in caricamento.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'width', type: 'string', default: "'100%'", description: 'Larghezza dello skeleton.' },
      { name: 'height', type: 'string', default: "'16px'", description: 'Altezza dello skeleton.' },
      { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'text'", description: 'Forma dello skeleton.' },
    ],
    code: {
      html: `<style>
  .skeleton {
    background: #e5e7eb;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .skeleton--text {
    height: 12px;
    border-radius: 6px;
  }

  .skeleton--circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .skeleton--rect {
    height: 100px;
    border-radius: 12px;
  }

  @keyframes skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
</style>

<!-- Esempio di skeleton per una card -->
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
  <div class="skeleton skeleton--circle"></div>
  <div style="flex: 1;">
    <div class="skeleton skeleton--text" style="width: 120px; margin-bottom: 8px;"></div>
    <div class="skeleton skeleton--text" style="width: 80px; height: 10px;"></div>
  </div>
</div>
<div class="skeleton skeleton--text" style="margin-bottom: 8px;"></div>
<div class="skeleton skeleton--text" style="width: 80%;"></div>`,

      vue: `<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  variant?: 'text' | 'circle' | 'rect'
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '16px',
  variant: 'text',
})
</script>

<template>
  <div
    class="skeleton"
    :class="\`skeleton--\${variant}\`"
    :style="{ width, height }"
  />
</template>

<style scoped>
.skeleton {
  background: #e5e7eb;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
.skeleton--text { border-radius: 6px; }
.skeleton--circle { border-radius: 50%; }
.skeleton--rect { border-radius: 12px; }

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>`,

      react: `interface SkeletonProps {
  width?: string
  height?: string
  variant?: 'text' | 'circle' | 'rect'
  className?: string
}

export function Skeleton({
  width = '100%',
  height = '16px',
  variant = 'text',
  className,
}: SkeletonProps) {
  const borderRadius =
    variant === 'circle' ? '50%' :
    variant === 'rect' ? '12px' : '6px'

  return (
    <div
      className={\`skeleton \${className ?? ''}\`}
      style={{ width, height, borderRadius }}
    />
  )
}`,
    },
  },

  // ─── FORM (nuovi) ─────────────────────────────────

  {
    name: 'Switch',
    slug: 'switch',
    category: 'Form',
    description: 'Interruttore con etichetta integrata e stato on/off.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Stato dello switch.' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta associata.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabilita lo switch.' },
    ],
    code: {
      html: `<style>
  .switch-row { display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; }
  .switch-track {
    position: relative; width: 44px; height: 24px; background: #d1d5db;
    border-radius: 12px; border: none; padding: 0; cursor: pointer;
    transition: background 0.2s; flex-shrink: 0;
  }
  .switch-track.on { background: #2B3038; }
  .switch-thumb {
    position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
    background: #fff; border-radius: 50%; transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1); pointer-events: none;
  }
  .switch-track.on .switch-thumb { transform: translateX(20px); }
  .switch-text { font-size: 14px; color: #2B3038; }
</style>

<label class="switch-row">
  <button class="switch-track on" onclick="this.classList.toggle('on')">
    <span class="switch-thumb"></span>
  </button>
  <span class="switch-text">Notifiche attive</span>
</label>`,

      vue: `<script setup lang="ts">
interface Props { modelValue?: boolean; label?: string; disabled?: boolean }
withDefaults(defineProps<Props>(), { modelValue: false })
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <label class="switch-row" :class="{ disabled }">
    <button class="switch-track" :class="{ on: modelValue }" @click.prevent="!disabled && emit('update:modelValue', !modelValue)">
      <span class="switch-thumb" />
    </button>
    <span v-if="label" class="switch-text">{{ label }}</span>
  </label>
</template>

<style scoped>
.switch-row { display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; }
.switch-track { position: relative; width: 44px; height: 24px; background: #d1d5db; border-radius: 12px; border: none; padding: 0; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
.switch-track.on { background: #2B3038; }
.switch-thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.1); pointer-events: none; }
.switch-track.on .switch-thumb { transform: translateX(20px); }
.switch-text { font-size: 14px; color: #2B3038; }
.disabled { opacity: 0.5; pointer-events: none; }
</style>`,

      react: `'use client'

interface SwitchProps { checked?: boolean; label?: string; disabled?: boolean; onChange?: (v: boolean) => void }

export function Switch({ checked = false, label, disabled, onChange }: SwitchProps) {
  return (
    <label className={\`switch-row \${disabled ? 'disabled' : ''}\`}>
      <button className={\`switch-track \${checked ? 'on' : ''}\`} onClick={() => !disabled && onChange?.(!checked)}>
        <span className="switch-thumb" />
      </button>
      {label && <span className="switch-text">{label}</span>}
    </label>
  )
}`,
    },
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    category: 'Form',
    description: 'Gruppo di radio button per selezione singola.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Opzioni disponibili.' },
      { name: 'value', type: 'string', default: "''", description: 'Valore selezionato.' },
    ],
    code: {
      html: `<style>
  .radio-group { display: flex; flex-direction: column; gap: 10px; }
  .radio-item { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
  .radio-circle {
    width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .radio-circle.selected { border-color: #2B3038; }
  .radio-dot {
    width: 10px; height: 10px; border-radius: 50%; background: #2B3038;
    transform: scale(0); transition: transform 0.15s;
  }
  .radio-circle.selected .radio-dot { transform: scale(1); }
  .radio-text { font-size: 14px; color: #2B3038; }
</style>

<div class="radio-group">
  <label class="radio-item" onclick="selectRadio(this)">
    <div class="radio-circle selected"><div class="radio-dot"></div></div>
    <span class="radio-text">Opzione A</span>
  </label>
  <label class="radio-item" onclick="selectRadio(this)">
    <div class="radio-circle"><div class="radio-dot"></div></div>
    <span class="radio-text">Opzione B</span>
  </label>
  <label class="radio-item" onclick="selectRadio(this)">
    <div class="radio-circle"><div class="radio-dot"></div></div>
    <span class="radio-text">Opzione C</span>
  </label>
</div>

<script>
  function selectRadio(item) {
    const group = item.closest('.radio-group');
    group.querySelectorAll('.radio-circle').forEach(c => c.classList.remove('selected'));
    item.querySelector('.radio-circle').classList.add('selected');
  }
<\/script>`,

      vue: `<script setup lang="ts">
interface Option { label: string; value: string }
interface Props { modelValue?: string; options: Option[] }
defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="radio-group">
    <label v-for="opt in options" :key="opt.value" class="radio-item" @click="emit('update:modelValue', opt.value)">
      <div class="radio-circle" :class="{ selected: opt.value === modelValue }">
        <div class="radio-dot" />
      </div>
      <span class="radio-text">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.radio-group { display: flex; flex-direction: column; gap: 10px; }
.radio-item { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.radio-circle { width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
.radio-circle.selected { border-color: #2B3038; }
.radio-dot { width: 10px; height: 10px; border-radius: 50%; background: #2B3038; transform: scale(0); transition: transform 0.15s; }
.radio-circle.selected .radio-dot { transform: scale(1); }
.radio-text { font-size: 14px; color: #2B3038; }
</style>`,

      react: `'use client'

interface Option { label: string; value: string }
interface RadioGroupProps { value?: string; options: Option[]; onChange?: (v: string) => void }

export function RadioGroup({ value, options, onChange }: RadioGroupProps) {
  return (
    <div className="radio-group">
      {options.map(opt => (
        <label key={opt.value} className="radio-item" onClick={() => onChange?.(opt.value)}>
          <div className={\`radio-circle \${opt.value === value ? 'selected' : ''}\`}>
            <div className="radio-dot" />
          </div>
          <span className="radio-text">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}`,
    },
  },
  {
    name: 'Slider',
    slug: 'slider',
    category: 'Form',
    description: 'Cursore per selezionare un valore numerico in un intervallo.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'min', type: 'number', default: '0', description: 'Valore minimo.' },
      { name: 'max', type: 'number', default: '100', description: 'Valore massimo.' },
      { name: 'value', type: 'number', default: '50', description: 'Valore corrente.' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra lo slider.' },
    ],
    code: {
      html: `<style>
  .slider-group { display: flex; flex-direction: column; gap: 8px; width: 260px; }
  .slider-header { display: flex; justify-content: space-between; align-items: center; }
  .slider-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .slider-value { font-size: 14px; font-weight: 600; color: #2B3038; }
  .slider {
    -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
    background: #e5e7eb; border-radius: 3px; outline: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 20px; height: 20px;
    background: #2B3038; border-radius: 50%; cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }
  .slider::-moz-range-thumb {
    width: 20px; height: 20px; background: #2B3038;
    border-radius: 50%; cursor: pointer; border: none;
  }
</style>

<div class="slider-group">
  <div class="slider-header">
    <span class="slider-label">Volume</span>
    <span class="slider-value" id="sliderVal">50</span>
  </div>
  <input type="range" class="slider" min="0" max="100" value="50"
    oninput="document.getElementById('sliderVal').textContent=this.value" />
</div>`,

      vue: `<script setup lang="ts">
interface Props { modelValue?: number; min?: number; max?: number; label?: string }
withDefaults(defineProps<Props>(), { modelValue: 50, min: 0, max: 100 })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<template>
  <div class="slider-group">
    <div v-if="label" class="slider-header">
      <span class="slider-label">{{ label }}</span>
      <span class="slider-value">{{ modelValue }}</span>
    </div>
    <input type="range" class="slider" :min="min" :max="max" :value="modelValue"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))" />
  </div>
</template>

<style scoped>
.slider-group { display: flex; flex-direction: column; gap: 8px; }
.slider-header { display: flex; justify-content: space-between; align-items: center; }
.slider-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
.slider-value { font-size: 14px; font-weight: 600; color: #2B3038; }
.slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; outline: none; }
.slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #2B3038; border-radius: 50%; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
</style>`,

      react: `'use client'

interface SliderProps { value?: number; min?: number; max?: number; label?: string; onChange?: (v: number) => void }

export function Slider({ value = 50, min = 0, max = 100, label, onChange }: SliderProps) {
  return (
    <div className="slider-group">
      {label && (
        <div className="slider-header">
          <span className="slider-label">{label}</span>
          <span className="slider-value">{value}</span>
        </div>
      )}
      <input type="range" className="slider" min={min} max={max} value={value}
        onChange={e => onChange?.(Number(e.target.value))} />
    </div>
  )
}`,
    },
  },
  {
    name: 'Input OTP',
    slug: 'input-otp',
    category: 'Form',
    description: 'Campo segmentato per codici OTP a 6 cifre con auto-focus.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'length', type: 'number', default: '6', description: 'Numero di cifre.' },
      { name: 'value', type: 'string', default: "''", description: 'Valore corrente.' },
    ],
    code: {
      html: `<style>
  .otp-group { display: flex; gap: 8px; }
  .otp-input {
    width: 44px; height: 52px; text-align: center; font-size: 20px;
    font-weight: 600; font-family: inherit; color: #2B3038;
    background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px;
    outline: none; transition: all 0.15s;
  }
  .otp-input:focus {
    border-color: #2B3038;
    box-shadow: 0 0 0 2px rgba(43, 48, 56, 0.08);
  }
</style>

<div class="otp-group">
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
  <input class="otp-input" maxlength="1" inputmode="numeric" oninput="otpNext(this)" onkeydown="otpBack(event, this)" />
</div>

<script>
  function otpNext(el) {
    el.value = el.value.replace(/\\D/g, '').slice(0, 1);
    if (el.value && el.nextElementSibling) el.nextElementSibling.focus();
  }
  function otpBack(e, el) {
    if (e.key === 'Backspace' && !el.value && el.previousElementSibling) {
      el.previousElementSibling.focus();
    }
  }
<\/script>`,

      vue: `<script setup lang="ts">
interface Props { length?: number; modelValue?: string }
const props = withDefaults(defineProps<Props>(), { length: 6, modelValue: '' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const inputs = ref<HTMLInputElement[]>([])

function onInput(index: number, e: Event) {
  const el = e.target as HTMLInputElement
  el.value = el.value.replace(/\\D/g, '').slice(0, 1)
  const chars = props.modelValue.split('')
  chars[index] = el.value
  emit('update:modelValue', chars.join(''))
  if (el.value && index < props.length - 1) inputs.value[index + 1]?.focus()
}

function onKeydown(index: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !(e.target as HTMLInputElement).value && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}
</script>

<template>
  <div class="otp-group">
    <input
      v-for="i in length" :key="i"
      :ref="el => { if (el) inputs[i - 1] = el as HTMLInputElement }"
      class="otp-input"
      maxlength="1"
      inputmode="numeric"
      :value="modelValue[i - 1] || ''"
      @input="onInput(i - 1, $event)"
      @keydown="onKeydown(i - 1, $event)"
    />
  </div>
</template>

<style scoped>
.otp-group { display: flex; gap: 8px; }
.otp-input { width: 44px; height: 52px; text-align: center; font-size: 20px; font-weight: 600; font-family: inherit; color: #2B3038; background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; outline: none; transition: all 0.15s; }
.otp-input:focus { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
</style>`,

      react: `'use client'
import { useRef } from 'react'

interface OtpInputProps { length?: number; value?: string; onChange?: (v: string) => void }

export function OtpInput({ length = 6, value = '', onChange }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function handleInput(i: number, val: string) {
    const clean = val.replace(/\\D/g, '').slice(0, 1)
    const chars = value.split('')
    chars[i] = clean
    onChange?.(chars.join(''))
    if (clean && i < length - 1) refs.current[i + 1]?.focus()
  }

  function handleKey(i: number, key: string) {
    if (key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus()
  }

  return (
    <div className="otp-group">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          className="otp-input"
          maxLength={1}
          inputMode="numeric"
          value={value[i] || ''}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKey(i, e.key)}
        />
      ))}
    </div>
  )
}`,
    },
  },

  // ─── FEEDBACK (nuovi) ─────────────────────────────

  {
    name: 'Spinner',
    slug: 'spinner',
    category: 'Feedback',
    description: 'Indicatore di caricamento circolare animato.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dimensione dello spinner.' },
    ],
    code: {
      html: `<style>
  .spinner {
    border: 2.5px solid #e5e7eb;
    border-top-color: #2B3038;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  .spinner--sm { width: 16px; height: 16px; }
  .spinner--md { width: 24px; height: 24px; }
  .spinner--lg { width: 36px; height: 36px; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<div style="display: flex; align-items: center; gap: 16px;">
  <div class="spinner spinner--sm"></div>
  <div class="spinner spinner--md"></div>
  <div class="spinner spinner--lg"></div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { size?: 'sm' | 'md' | 'lg' }
withDefaults(defineProps<Props>(), { size: 'md' })
</script>

<template>
  <div class="spinner" :class="\`spinner--\${size}\`" />
</template>

<style scoped>
.spinner { border: 2.5px solid #e5e7eb; border-top-color: #2B3038; border-radius: 50%; animation: spin 0.6s linear infinite; }
.spinner--sm { width: 16px; height: 16px; }
.spinner--md { width: 24px; height: 24px; }
.spinner--lg { width: 36px; height: 36px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>`,

      react: `interface SpinnerProps { size?: 'sm' | 'md' | 'lg' }

export function Spinner({ size = 'md' }: SpinnerProps) {
  return <div className={\`spinner spinner--\${size}\`} />
}`,
    },
  },
  {
    name: 'Progress',
    slug: 'progress',
    category: 'Feedback',
    description: 'Barra di avanzamento orizzontale con percentuale.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Percentuale di avanzamento (0-100).' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta opzionale.' },
    ],
    code: {
      html: `<style>
  .progress-group { display: flex; flex-direction: column; gap: 6px; width: 280px; }
  .progress-header { display: flex; justify-content: space-between; align-items: center; }
  .progress-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .progress-value { font-size: 12px; font-weight: 600; color: #2B3038; }
  .progress-track {
    width: 100%; height: 6px; background: #e5e7eb;
    border-radius: 3px; overflow: hidden;
  }
  .progress-bar {
    height: 100%; background: #2B3038; border-radius: 3px;
    transition: width 0.3s ease;
  }
</style>

<div class="progress-group">
  <div class="progress-header">
    <span class="progress-label">Caricamento</span>
    <span class="progress-value">65%</span>
  </div>
  <div class="progress-track">
    <div class="progress-bar" style="width: 65%;"></div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { value?: number; label?: string }
withDefaults(defineProps<Props>(), { value: 0 })
</script>

<template>
  <div class="progress-group">
    <div v-if="label" class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-value">{{ value }}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-bar" :style="{ width: value + '%' }" />
    </div>
  </div>
</template>

<style scoped>
.progress-group { display: flex; flex-direction: column; gap: 6px; }
.progress-header { display: flex; justify-content: space-between; align-items: center; }
.progress-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
.progress-value { font-size: 12px; font-weight: 600; color: #2B3038; }
.progress-track { width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; }
.progress-bar { height: 100%; background: #2B3038; border-radius: 3px; transition: width 0.3s ease; }
</style>`,

      react: `interface ProgressProps { value?: number; label?: string }

export function Progress({ value = 0, label }: ProgressProps) {
  return (
    <div className="progress-group">
      {label && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-value">{value}%</span>
        </div>
      )}
      <div className="progress-track">
        <div className="progress-bar" style={{ width: value + '%' }} />
      </div>
    </div>
  )
}`,
    },
  },

  // ─── LAYOUT (nuovi) ───────────────────────────────

  {
    name: 'Separator',
    slug: 'separator',
    category: 'Layout',
    description: 'Linea separatrice orizzontale con testo opzionale.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'text', type: 'string', default: "''", description: 'Testo centrale opzionale.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientamento del separatore.' },
    ],
    code: {
      html: `<style>
  .separator {
    display: flex; align-items: center; gap: 16px;
    color: #9ca3af; font-size: 12px; margin: 16px 0;
  }
  .separator::before, .separator::after {
    content: ''; flex: 1; height: 1px; background: #e5e7eb;
  }
  .separator--plain::before { flex: 1; }
  .separator--plain::after { display: none; }
  .separator--plain { gap: 0; }

  .separator-vertical {
    width: 1px; background: #e5e7eb; align-self: stretch;
  }
</style>

<div class="separator">oppure</div>

<div style="margin-top: 16px;">
  <div class="separator separator--plain"></div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { text?: string; orientation?: 'horizontal' | 'vertical' }
withDefaults(defineProps<Props>(), { orientation: 'horizontal' })
</script>

<template>
  <div v-if="orientation === 'vertical'" class="separator-vertical" />
  <div v-else class="separator" :class="{ 'separator--plain': !text }">
    <template v-if="text">{{ text }}</template>
  </div>
</template>

<style scoped>
.separator { display: flex; align-items: center; gap: 16px; color: #9ca3af; font-size: 12px; margin: 16px 0; }
.separator::before, .separator::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
.separator--plain { gap: 0; }
.separator--plain::after { display: none; }
.separator-vertical { width: 1px; background: #e5e7eb; align-self: stretch; }
</style>`,

      react: `interface SeparatorProps { text?: string; orientation?: 'horizontal' | 'vertical' }

export function Separator({ text, orientation = 'horizontal' }: SeparatorProps) {
  if (orientation === 'vertical') return <div className="separator-vertical" />
  return (
    <div className={\`separator \${!text ? 'separator--plain' : ''}\`}>
      {text && <>{text}</>}
    </div>
  )
}`,
    },
  },
  {
    name: 'Multi Select',
    slug: 'multi-select',
    category: 'Form',
    description: 'Dropdown con selezione multipla e chip removibili.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'options', type: '{ label: string; value: string }[]', default: '[]', description: 'Opzioni disponibili.' },
      { name: 'selected', type: 'string[]', default: '[]', description: 'Valori selezionati.' },
      { name: 'placeholder', type: 'string', default: "'Seleziona...'", description: 'Testo placeholder.' },
    ],
    code: {
      html: `<style>
  .multi-select { position: relative; width: 280px; }
  .multi-trigger {
    width: 100%; display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
    min-height: 42px; padding: 6px 10px; font-size: 14px; font-family: inherit;
    background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;
  }
  .multi-trigger:focus { border-color: #2B3038; outline: none; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
  .multi-chip {
    display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px;
    font-size: 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; color: #2B3038;
  }
  .multi-chip-x { background: none; border: none; font-size: 14px; color: #9ca3af; cursor: pointer; padding: 0; line-height: 1; }
  .multi-placeholder { color: #9ca3af; font-size: 14px; }
  .multi-dropdown {
    display: none; position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 4px 0;
    z-index: 50; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-height: 200px; overflow-y: auto;
  }
  .multi-dropdown.open { display: block; }
  .multi-option {
    width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 12px;
    font-size: 14px; background: none; border: none; cursor: pointer; color: #2B3038;
    font-family: inherit; transition: background 0.1s;
  }
  .multi-option:hover { background: #F2F3EF; }
  .multi-check {
    width: 16px; height: 16px; border: 2px solid #d1d5db; border-radius: 3px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s;
  }
  .multi-option.selected .multi-check { background: #2B3038; border-color: #2B3038; }
  .multi-checkmark { display: none; color: #fff; font-size: 10px; font-weight: bold; }
  .multi-option.selected .multi-checkmark { display: block; }
</style>

<div class="multi-select">
  <div class="multi-trigger" tabindex="0" onclick="this.nextElementSibling.classList.toggle('open')">
    <span class="multi-chip">Vue <button class="multi-chip-x" onclick="event.stopPropagation()">×</button></span>
    <span class="multi-chip">React <button class="multi-chip-x" onclick="event.stopPropagation()">×</button></span>
  </div>
  <div class="multi-dropdown">
    <button class="multi-option selected" onclick="this.classList.toggle('selected')"><div class="multi-check"><span class="multi-checkmark">✓</span></div> Vue</button>
    <button class="multi-option selected" onclick="this.classList.toggle('selected')"><div class="multi-check"><span class="multi-checkmark">✓</span></div> React</button>
    <button class="multi-option" onclick="this.classList.toggle('selected')"><div class="multi-check"><span class="multi-checkmark">✓</span></div> Angular</button>
    <button class="multi-option" onclick="this.classList.toggle('selected')"><div class="multi-check"><span class="multi-checkmark">✓</span></div> Svelte</button>
  </div>
</div>

<script>
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.multi-select')) {
      document.querySelectorAll('.multi-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
<\/script>`,

      vue: `<script setup lang="ts">
interface Option { label: string; value: string }
interface Props { modelValue?: string[]; options: Option[]; placeholder?: string }
const props = withDefaults(defineProps<Props>(), { modelValue: () => [], placeholder: 'Seleziona...' })
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()
const open = ref(false)
const wrapperRef = ref<HTMLElement>()

function toggle(value: string) {
  const arr = [...props.modelValue]
  const idx = arr.indexOf(value)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(value)
  emit('update:modelValue', arr)
}

function remove(value: string) {
  emit('update:modelValue', props.modelValue.filter(v => v !== value))
}

function onClickOutside(e: Event) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="wrapperRef" class="multi-select">
    <div class="multi-trigger" tabindex="0" @click="open = !open">
      <template v-if="modelValue.length">
        <span v-for="v in modelValue" :key="v" class="multi-chip">
          {{ options.find(o => o.value === v)?.label }}
          <button class="multi-chip-x" @click.stop="remove(v)">×</button>
        </span>
      </template>
      <span v-else class="multi-placeholder">{{ placeholder }}</span>
    </div>
    <div v-if="open" class="multi-dropdown">
      <button v-for="opt in options" :key="opt.value" class="multi-option" :class="{ selected: modelValue.includes(opt.value) }" @click="toggle(opt.value)">
        <div class="multi-check"><span class="multi-checkmark">✓</span></div>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.multi-select { position: relative; }
.multi-trigger { width: 100%; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; min-height: 42px; padding: 6px 10px; font-size: 14px; font-family: inherit; background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; }
.multi-trigger:focus { border-color: #2B3038; outline: none; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
.multi-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; font-size: 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; color: #2B3038; }
.multi-chip-x { background: none; border: none; font-size: 14px; color: #9ca3af; cursor: pointer; padding: 0; line-height: 1; }
.multi-placeholder { color: #9ca3af; }
.multi-dropdown { position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 4px 0; z-index: 50; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-height: 200px; overflow-y: auto; }
.multi-option { width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 12px; font-size: 14px; background: none; border: none; cursor: pointer; color: #2B3038; font-family: inherit; transition: background 0.1s; }
.multi-option:hover { background: #F2F3EF; }
.multi-check { width: 16px; height: 16px; border: 2px solid #d1d5db; border-radius: 3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
.multi-option.selected .multi-check { background: #2B3038; border-color: #2B3038; }
.multi-checkmark { display: none; color: #fff; font-size: 10px; font-weight: bold; }
.multi-option.selected .multi-checkmark { display: block; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect } from 'react'

interface Option { label: string; value: string }
interface MultiSelectProps { value?: string[]; options: Option[]; placeholder?: string; onChange?: (v: string[]) => void }

export function MultiSelect({ value = [], options, placeholder = 'Seleziona...', onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  function toggle(v: string) {
    const arr = [...value]
    const idx = arr.indexOf(v)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(v)
    onChange?.(arr)
  }

  return (
    <div ref={ref} className="multi-select">
      <div className="multi-trigger" tabIndex={0} onClick={() => setOpen(!open)}>
        {value.length ? value.map(v => (
          <span key={v} className="multi-chip">
            {options.find(o => o.value === v)?.label}
            <button className="multi-chip-x" onClick={e => { e.stopPropagation(); toggle(v) }}>×</button>
          </span>
        )) : <span className="multi-placeholder">{placeholder}</span>}
      </div>
      {open && (
        <div className="multi-dropdown">
          {options.map(opt => (
            <button key={opt.value} className={\`multi-option \${value.includes(opt.value) ? 'selected' : ''}\`} onClick={() => toggle(opt.value)}>
              <div className="multi-check"><span className="multi-checkmark">✓</span></div>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
    },
  },
  {
    name: 'Date Picker',
    slug: 'date-picker',
    category: 'Form',
    description: 'Selettore di data con calendario a griglia.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Data selezionata (YYYY-MM-DD).' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra il campo.' },
      { name: 'placeholder', type: 'string', default: "'Seleziona data...'", description: 'Testo placeholder.' },
    ],
    code: {
      html: `<style>
  .datepicker { position: relative; width: 280px; }
  .datepicker-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; }
  .datepicker-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; font-size: 14px; font-family: inherit; color: #2B3038;
    background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;
  }
  .datepicker-trigger .placeholder { color: #9ca3af; }
  .datepicker-trigger svg { width: 16px; height: 16px; color: #6b7280; }
  .datepicker-calendar {
    display: none; position: absolute; top: 100%; left: 0; margin-top: 4px;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px;
    z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  .datepicker-calendar.open { display: block; }
  .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .cal-title { font-size: 14px; font-weight: 600; color: #2B3038; }
  .cal-nav { background: none; border: none; cursor: pointer; color: #6b7280; font-size: 18px; padding: 4px 8px; border-radius: 6px; }
  .cal-nav:hover { background: #F2F3EF; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
  .cal-weekday { font-size: 11px; font-weight: 500; color: #9ca3af; padding: 4px 0; }
  .cal-day {
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    font-size: 13px; border-radius: 8px; border: none; background: none;
    cursor: pointer; color: #2B3038; transition: all 0.1s;
  }
  .cal-day:hover { background: #F2F3EF; }
  .cal-day.today { font-weight: 600; border: 1px solid #e5e7eb; }
  .cal-day.selected { background: #2B3038; color: #fff; }
  .cal-day.empty { visibility: hidden; }
</style>

<div class="datepicker">
  <label class="datepicker-label">Data</label>
  <button class="datepicker-trigger" onclick="this.nextElementSibling.classList.toggle('open')">
    <span class="placeholder">Seleziona data...</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  </button>
  <div class="datepicker-calendar">
    <div class="cal-header">
      <button class="cal-nav">‹</button>
      <span class="cal-title">Febbraio 2026</span>
      <button class="cal-nav">›</button>
    </div>
    <div class="cal-grid">
      <span class="cal-weekday">Lu</span><span class="cal-weekday">Ma</span><span class="cal-weekday">Me</span>
      <span class="cal-weekday">Gi</span><span class="cal-weekday">Ve</span><span class="cal-weekday">Sa</span><span class="cal-weekday">Do</span>
      <button class="cal-day empty"></button>
      <button class="cal-day empty"></button>
      <button class="cal-day empty"></button>
      <button class="cal-day empty"></button>
      <button class="cal-day empty"></button>
      <button class="cal-day empty"></button>
      <button class="cal-day">1</button>
      <button class="cal-day">2</button><button class="cal-day">3</button><button class="cal-day">4</button>
      <button class="cal-day">5</button><button class="cal-day">6</button><button class="cal-day">7</button>
      <button class="cal-day">8</button>
      <button class="cal-day">9</button><button class="cal-day">10</button><button class="cal-day">11</button>
      <button class="cal-day">12</button><button class="cal-day">13</button><button class="cal-day">14</button>
      <button class="cal-day">15</button>
      <button class="cal-day">16</button><button class="cal-day">17</button><button class="cal-day">18</button>
      <button class="cal-day">19</button><button class="cal-day">20</button><button class="cal-day">21</button>
      <button class="cal-day">22</button>
      <button class="cal-day">23</button><button class="cal-day">24</button><button class="cal-day">25</button>
      <button class="cal-day">26</button><button class="cal-day today selected">27</button><button class="cal-day">28</button>
    </div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { modelValue?: string; label?: string; placeholder?: string }
const props = withDefaults(defineProps<Props>(), { modelValue: '', placeholder: 'Seleziona data...' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const open = ref(false)
const wrapperRef = ref<HTMLElement>()
const viewDate = ref(new Date())
const weekdays = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do']

const calDays = computed(() => {
  const y = viewDate.value.getFullYear(), m = viewDate.value.getMonth()
  const first = new Date(y, m, 1).getDay()
  const offset = first === 0 ? 6 : first - 1
  const total = new Date(y, m + 1, 0).getDate()
  const days: (number | null)[] = Array(offset).fill(null)
  for (let d = 1; d <= total; d++) days.push(d)
  return days
})

const monthLabel = computed(() => viewDate.value.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }))

function select(day: number) {
  const y = viewDate.value.getFullYear(), m = viewDate.value.getMonth()
  const d = new Date(y, m, day)
  emit('update:modelValue', d.toISOString().split('T')[0])
  open.value = false
}

function nav(dir: number) {
  const d = new Date(viewDate.value)
  d.setMonth(d.getMonth() + dir)
  viewDate.value = d
}

function isSelected(day: number) {
  if (!props.modelValue) return false
  const y = viewDate.value.getFullYear(), m = viewDate.value.getMonth()
  return props.modelValue === new Date(y, m, day).toISOString().split('T')[0]
}

function onClickOutside(e: Event) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="wrapperRef" class="datepicker">
    <label v-if="label" class="datepicker-label">{{ label }}</label>
    <button class="datepicker-trigger" @click="open = !open">
      <span :class="{ placeholder: !modelValue }">{{ modelValue || placeholder }}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    </button>
    <div v-if="open" class="datepicker-calendar">
      <div class="cal-header">
        <button class="cal-nav" @click="nav(-1)">‹</button>
        <span class="cal-title" style="text-transform: capitalize;">{{ monthLabel }}</span>
        <button class="cal-nav" @click="nav(1)">›</button>
      </div>
      <div class="cal-grid">
        <span v-for="w in weekdays" :key="w" class="cal-weekday">{{ w }}</span>
        <button v-for="(day, i) in calDays" :key="i" class="cal-day" :class="{ empty: !day, selected: day && isSelected(day) }" @click="day && select(day)">
          {{ day }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.datepicker { position: relative; }
.datepicker-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; }
.datepicker-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-family: inherit; color: #2B3038; background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; }
.datepicker-trigger:focus { border-color: #2B3038; outline: none; }
.datepicker-trigger svg { width: 16px; height: 16px; color: #6b7280; }
.placeholder { color: #9ca3af; }
.datepicker-calendar { position: absolute; top: 100%; left: 0; margin-top: 4px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.cal-title { font-size: 14px; font-weight: 600; color: #2B3038; }
.cal-nav { background: none; border: none; cursor: pointer; color: #6b7280; font-size: 18px; padding: 4px 8px; border-radius: 6px; }
.cal-nav:hover { background: #F2F3EF; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
.cal-weekday { font-size: 11px; font-weight: 500; color: #9ca3af; padding: 4px 0; }
.cal-day { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 13px; border-radius: 8px; border: none; background: none; cursor: pointer; color: #2B3038; transition: all 0.1s; }
.cal-day:hover:not(.empty) { background: #F2F3EF; }
.cal-day.selected { background: #2B3038; color: #fff; }
.cal-day.empty { visibility: hidden; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect, useMemo } from 'react'

interface DatePickerProps { value?: string; label?: string; placeholder?: string; onChange?: (v: string) => void }

export function DatePicker({ value, label, placeholder = 'Seleziona data...', onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(new Date())
  const ref = useRef<HTMLDivElement>(null)
  const weekdays = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do']

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const calDays = useMemo(() => {
    const y = viewDate.getFullYear(), m = viewDate.getMonth()
    const first = new Date(y, m, 1).getDay()
    const offset = first === 0 ? 6 : first - 1
    const total = new Date(y, m + 1, 0).getDate()
    const days: (number | null)[] = Array(offset).fill(null)
    for (let d = 1; d <= total; d++) days.push(d)
    return days
  }, [viewDate])

  function select(day: number) {
    const y = viewDate.getFullYear(), m = viewDate.getMonth()
    onChange?.(new Date(y, m, day).toISOString().split('T')[0])
    setOpen(false)
  }

  function nav(dir: number) {
    const d = new Date(viewDate)
    d.setMonth(d.getMonth() + dir)
    setViewDate(d)
  }

  const monthLabel = viewDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })

  return (
    <div ref={ref} className="datepicker">
      {label && <label className="datepicker-label">{label}</label>}
      <button className="datepicker-trigger" onClick={() => setOpen(!open)}>
        <span className={!value ? 'placeholder' : ''}>{value || placeholder}</span>
      </button>
      {open && (
        <div className="datepicker-calendar">
          <div className="cal-header">
            <button className="cal-nav" onClick={() => nav(-1)}>‹</button>
            <span className="cal-title" style={{ textTransform: 'capitalize' }}>{monthLabel}</span>
            <button className="cal-nav" onClick={() => nav(1)}>›</button>
          </div>
          <div className="cal-grid">
            {weekdays.map(w => <span key={w} className="cal-weekday">{w}</span>)}
            {calDays.map((day, i) => (
              <button key={i} className={\`cal-day \${!day ? 'empty' : ''} \${day && value === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0] ? 'selected' : ''}\`} onClick={() => day && select(day)}>
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}`,
    },
  },
  {
    name: 'Time Picker',
    slug: 'time-picker',
    category: 'Form',
    description: 'Selettore di orario con colonne ore e minuti.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'value', type: 'string', default: "''", description: 'Orario selezionato (HH:MM).' },
      { name: 'label', type: 'string', default: "''", description: 'Etichetta sopra il campo.' },
    ],
    code: {
      html: `<style>
  .timepicker { position: relative; width: 200px; }
  .timepicker-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; }
  .timepicker-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; font-size: 14px; font-family: inherit; color: #2B3038;
    background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;
  }
  .timepicker-trigger .placeholder { color: #9ca3af; }
  .timepicker-trigger svg { width: 16px; height: 16px; color: #6b7280; }
  .timepicker-dropdown {
    display: none; position: absolute; top: 100%; left: 0; margin-top: 4px;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px;
    z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  .timepicker-dropdown.open { display: block; }
  .time-cols { display: flex; gap: 8px; }
  .time-col { display: flex; flex-direction: column; gap: 2px; max-height: 180px; overflow-y: auto; padding-right: 4px; }
  .time-col::-webkit-scrollbar { width: 3px; }
  .time-col::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
  .time-col-label { font-size: 10px; font-weight: 500; color: #9ca3af; text-align: center; margin-bottom: 4px; text-transform: uppercase; }
  .time-cell {
    width: 44px; padding: 6px 0; text-align: center; font-size: 13px; border: none;
    background: none; border-radius: 6px; cursor: pointer; color: #2B3038; transition: all 0.1s;
  }
  .time-cell:hover { background: #F2F3EF; }
  .time-cell.selected { background: #2B3038; color: #fff; }
</style>

<div class="timepicker">
  <label class="timepicker-label">Orario</label>
  <button class="timepicker-trigger" onclick="this.nextElementSibling.classList.toggle('open')">
    <span>14:30</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  </button>
  <div class="timepicker-dropdown">
    <div class="time-cols">
      <div>
        <div class="time-col-label">Ore</div>
        <div class="time-col">
          <button class="time-cell">12</button><button class="time-cell">13</button>
          <button class="time-cell selected">14</button><button class="time-cell">15</button>
          <button class="time-cell">16</button><button class="time-cell">17</button>
          <button class="time-cell">18</button>
        </div>
      </div>
      <div>
        <div class="time-col-label">Min</div>
        <div class="time-col">
          <button class="time-cell">00</button><button class="time-cell">15</button>
          <button class="time-cell selected">30</button><button class="time-cell">45</button>
        </div>
      </div>
    </div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { modelValue?: string; label?: string }
const props = withDefaults(defineProps<Props>(), { modelValue: '' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const open = ref(false)
const wrapperRef = ref<HTMLElement>()
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = ['00', '15', '30', '45']

const selectedHour = computed(() => props.modelValue?.split(':')[0] || '')
const selectedMin = computed(() => props.modelValue?.split(':')[1] || '')

function pick(h: string, m: string) {
  emit('update:modelValue', h + ':' + m)
}

function onClickOutside(e: Event) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="wrapperRef" class="timepicker">
    <label v-if="label" class="timepicker-label">{{ label }}</label>
    <button class="timepicker-trigger" @click="open = !open">
      <span :class="{ placeholder: !modelValue }">{{ modelValue || 'Seleziona orario...' }}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    </button>
    <div v-if="open" class="timepicker-dropdown">
      <div class="time-cols">
        <div>
          <div class="time-col-label">Ore</div>
          <div class="time-col">
            <button v-for="h in hours" :key="h" class="time-cell" :class="{ selected: h === selectedHour }" @click="pick(h, selectedMin || '00')">{{ h }}</button>
          </div>
        </div>
        <div>
          <div class="time-col-label">Min</div>
          <div class="time-col">
            <button v-for="m in minutes" :key="m" class="time-cell" :class="{ selected: m === selectedMin }" @click="pick(selectedHour || '00', m)">{{ m }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timepicker { position: relative; }
.timepicker-label { font-size: 11px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px; }
.timepicker-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-family: inherit; color: #2B3038; background: #F2F3EF; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; }
.timepicker-trigger:focus { border-color: #2B3038; outline: none; }
.timepicker-trigger svg { width: 16px; height: 16px; color: #6b7280; }
.placeholder { color: #9ca3af; }
.timepicker-dropdown { position: absolute; top: 100%; left: 0; margin-top: 4px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.time-cols { display: flex; gap: 8px; }
.time-col { display: flex; flex-direction: column; gap: 2px; max-height: 180px; overflow-y: auto; }
.time-col-label { font-size: 10px; font-weight: 500; color: #9ca3af; text-align: center; margin-bottom: 4px; text-transform: uppercase; }
.time-cell { width: 44px; padding: 6px 0; text-align: center; font-size: 13px; border: none; background: none; border-radius: 6px; cursor: pointer; color: #2B3038; transition: all 0.1s; }
.time-cell:hover { background: #F2F3EF; }
.time-cell.selected { background: #2B3038; color: #fff; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect } from 'react'

interface TimePickerProps { value?: string; label?: string; onChange?: (v: string) => void }

export function TimePicker({ value = '', label, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = ['00', '15', '30', '45']
  const [selH, selM] = value ? value.split(':') : ['', '']

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div ref={ref} className="timepicker">
      {label && <label className="timepicker-label">{label}</label>}
      <button className="timepicker-trigger" onClick={() => setOpen(!open)}>
        <span className={!value ? 'placeholder' : ''}>{value || 'Seleziona orario...'}</span>
      </button>
      {open && (
        <div className="timepicker-dropdown">
          <div className="time-cols">
            <div>
              <div className="time-col-label">Ore</div>
              <div className="time-col">
                {hours.map(h => <button key={h} className={\`time-cell \${h === selH ? 'selected' : ''}\`} onClick={() => onChange?.(h + ':' + (selM || '00'))}>{h}</button>)}
              </div>
            </div>
            <div>
              <div className="time-col-label">Min</div>
              <div className="time-col">
                {minutes.map(m => <button key={m} className={\`time-cell \${m === selM ? 'selected' : ''}\`} onClick={() => onChange?.((selH || '00') + ':' + m)}>{m}</button>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}`,
    },
  },

  // ─── OVERLAY (nuovi) ──────────────────────────────

  {
    name: 'Drawer',
    slug: 'drawer',
    category: 'Overlay',
    description: 'Pannello laterale scorrevole con overlay.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Visibilità del drawer.' },
      { name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Lato di apertura.' },
      { name: 'title', type: 'string', default: "''", description: 'Titolo del drawer.' },
    ],
    code: {
      html: `<style>
  .drawer-overlay {
    display: none; position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.4);
  }
  .drawer-overlay.open { display: block; }
  .drawer-panel {
    position: fixed; top: 0; right: 0; bottom: 0; width: 380px; max-width: 90vw;
    background: #fff; z-index: 101; transform: translateX(100%);
    transition: transform 0.3s ease; display: flex; flex-direction: column;
  }
  .drawer-overlay.open .drawer-panel { transform: translateX(0); }
  .drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px; border-bottom: 1px solid #e5e7eb;
  }
  .drawer-title { font-size: 16px; font-weight: 600; color: #2B3038; margin: 0; }
  .drawer-close { background: none; border: none; font-size: 18px; color: #6b7280; cursor: pointer; }
  .drawer-body { flex: 1; padding: 24px; overflow-y: auto; font-size: 14px; color: #6b7280; line-height: 1.6; }
  .btn-open {
    padding: 8px 16px; font-size: 14px; font-weight: 500; font-family: inherit;
    background: #2B3038; color: #fff; border: none; border-radius: 8px; cursor: pointer;
  }
</style>

<button class="btn-open" onclick="document.getElementById('drawer1').classList.add('open')">Apri drawer</button>

<div id="drawer1" class="drawer-overlay" onclick="if(event.target===this)this.classList.remove('open')">
  <div class="drawer-panel">
    <div class="drawer-header">
      <h3 class="drawer-title">Dettagli</h3>
      <button class="drawer-close" onclick="document.getElementById('drawer1').classList.remove('open')">✕</button>
    </div>
    <div class="drawer-body">
      <p>Contenuto del drawer laterale. Può contenere form, liste o qualsiasi altro elemento.</p>
    </div>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { open: boolean; title?: string; side?: 'left' | 'right' }
withDefaults(defineProps<Props>(), { side: 'right' })
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="drawer-overlay" @click.self="emit('close')">
        <div class="drawer-panel" :class="side">
          <div class="drawer-header">
            <h3 class="drawer-title">{{ title }}</h3>
            <button class="drawer-close" @click="emit('close')">✕</button>
          </div>
          <div class="drawer-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.4); }
.drawer-panel { position: fixed; top: 0; bottom: 0; width: 380px; max-width: 90vw; background: #fff; z-index: 101; display: flex; flex-direction: column; }
.drawer-panel.right { right: 0; }
.drawer-panel.left { left: 0; }
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #e5e7eb; }
.drawer-title { font-size: 16px; font-weight: 600; color: #2B3038; margin: 0; }
.drawer-close { background: none; border: none; font-size: 18px; color: #6b7280; cursor: pointer; }
.drawer-body { flex: 1; padding: 24px; overflow-y: auto; font-size: 14px; color: #6b7280; line-height: 1.6; }
</style>`,

      react: `'use client'
import { useEffect } from 'react'

interface DrawerProps { open: boolean; title?: string; side?: 'left' | 'right'; onClose: () => void; children: React.ReactNode }

export function Drawer({ open, title, side = 'right', onClose, children }: DrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className={\`drawer-panel \${side}\`} onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h3 className="drawer-title">{title}</h3>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </div>
  )
}`,
    },
  },
  {
    name: 'Popover',
    slug: 'popover',
    category: 'Overlay',
    description: 'Contenuto flottante attivato al click su un trigger.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Visibilità del popover.' },
    ],
    code: {
      html: `<style>
  .popover-wrapper { position: relative; display: inline-flex; }
  .popover-trigger {
    padding: 8px 16px; font-size: 14px; font-weight: 500; font-family: inherit;
    background: transparent; border: 1px solid #d1d5db; border-radius: 8px;
    cursor: pointer; color: #2B3038;
  }
  .popover-content {
    display: none; position: absolute; bottom: calc(100% + 8px); left: 50%;
    transform: translateX(-50%); width: 240px; padding: 16px;
    background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08); z-index: 50;
  }
  .popover-content.open { display: block; }
  .popover-arrow {
    position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg);
    width: 10px; height: 10px; background: #fff; border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
  }
  .popover-title { font-size: 14px; font-weight: 600; color: #2B3038; margin: 0 0 4px; }
  .popover-text { font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5; }
</style>

<div class="popover-wrapper">
  <button class="popover-trigger" onclick="this.nextElementSibling.classList.toggle('open')">Mostra info</button>
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <p class="popover-title">Informazioni</p>
    <p class="popover-text">Questo è un popover con contenuto personalizzabile.</p>
  </div>
</div>

<script>
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.popover-wrapper')) {
      document.querySelectorAll('.popover-content.open').forEach(p => p.classList.remove('open'));
    }
  });
<\/script>`,

      vue: `<script setup lang="ts">
const open = ref(false)
const wrapperRef = ref<HTMLElement>()

function onClickOutside(e: Event) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="wrapperRef" class="popover-wrapper">
    <div @click="open = !open">
      <slot />
    </div>
    <div v-if="open" class="popover-content">
      <div class="popover-arrow" />
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.popover-wrapper { position: relative; display: inline-flex; }
.popover-content { position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); width: 240px; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); z-index: 50; }
.popover-arrow { position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background: #fff; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
</style>`,

      react: `'use client'
import { useState, useRef, useEffect } from 'react'

interface PopoverProps { trigger: React.ReactNode; children: React.ReactNode }

export function Popover({ trigger, children }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div ref={ref} className="popover-wrapper">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="popover-content">
          <div className="popover-arrow" />
          {children}
        </div>
      )}
    </div>
  )
}`,
    },
  },

  // ─── FEEDBACK (nuovi) ─────────────────────────────

  {
    name: 'Alert',
    slug: 'alert',
    category: 'Feedback',
    description: 'Messaggio di avviso con varianti successo, errore, warning e info.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Variante visiva.' },
      { name: 'title', type: 'string', default: "''", description: 'Titolo del messaggio.' },
      { name: 'message', type: 'string', default: "''", description: 'Testo del messaggio.' },
    ],
    code: {
      html: `<style>
  .alert {
    display: flex; gap: 12px; padding: 14px 16px; border-radius: 12px;
    border: 1px solid; font-size: 14px;
  }
  .alert--info { background: #eff6ff; border-color: #bfdbfe; }
  .alert--success { background: #f0fdf4; border-color: #bbf7d0; }
  .alert--warning { background: #fffbeb; border-color: #fde68a; }
  .alert--error { background: #fef2f2; border-color: #fecaca; }
  .alert-icon { font-size: 18px; flex-shrink: 0; line-height: 1; }
  .alert--info .alert-icon { color: #2563eb; }
  .alert--success .alert-icon { color: #16a34a; }
  .alert--warning .alert-icon { color: #d97706; }
  .alert--error .alert-icon { color: #dc2626; }
  .alert-title { font-weight: 600; color: #2B3038; margin: 0 0 2px; }
  .alert-message { color: #6b7280; margin: 0; line-height: 1.5; }
</style>

<div class="alert alert--info" style="margin-bottom: 8px;">
  <span class="alert-icon">ℹ</span>
  <div>
    <p class="alert-title">Nota</p>
    <p class="alert-message">Questa è un'informazione utile per l'utente.</p>
  </div>
</div>

<div class="alert alert--warning">
  <span class="alert-icon">⚠</span>
  <div>
    <p class="alert-title">Attenzione</p>
    <p class="alert-message">Questa azione potrebbe avere conseguenze.</p>
  </div>
</div>`,

      vue: `<script setup lang="ts">
interface Props { variant?: 'success' | 'error' | 'warning' | 'info'; title?: string; message?: string }
withDefaults(defineProps<Props>(), { variant: 'info' })
const icons: Record<string, string> = { info: 'ℹ', success: '✓', warning: '⚠', error: '✕' }
</script>

<template>
  <div class="alert" :class="\`alert--\${variant}\`">
    <span class="alert-icon">{{ icons[variant!] }}</span>
    <div>
      <p v-if="title" class="alert-title">{{ title }}</p>
      <p class="alert-message"><slot>{{ message }}</slot></p>
    </div>
  </div>
</template>

<style scoped>
.alert { display: flex; gap: 12px; padding: 14px 16px; border-radius: 12px; border: 1px solid; font-size: 14px; }
.alert--info { background: #eff6ff; border-color: #bfdbfe; }
.alert--success { background: #f0fdf4; border-color: #bbf7d0; }
.alert--warning { background: #fffbeb; border-color: #fde68a; }
.alert--error { background: #fef2f2; border-color: #fecaca; }
.alert-icon { font-size: 18px; flex-shrink: 0; line-height: 1; }
.alert--info .alert-icon { color: #2563eb; }
.alert--success .alert-icon { color: #16a34a; }
.alert--warning .alert-icon { color: #d97706; }
.alert--error .alert-icon { color: #dc2626; }
.alert-title { font-weight: 600; color: #2B3038; margin: 0 0 2px; }
.alert-message { color: #6b7280; margin: 0; line-height: 1.5; }
</style>`,

      react: `interface AlertProps { variant?: 'success' | 'error' | 'warning' | 'info'; title?: string; message?: string; children?: React.ReactNode }

const icons: Record<string, string> = { info: 'ℹ', success: '✓', warning: '⚠', error: '✕' }

export function Alert({ variant = 'info', title, message, children }: AlertProps) {
  return (
    <div className={\`alert alert--\${variant}\`}>
      <span className="alert-icon">{icons[variant]}</span>
      <div>
        {title && <p className="alert-title">{title}</p>}
        <p className="alert-message">{children || message}</p>
      </div>
    </div>
  )
}`,
    },
  },

  // ─── NAVIGAZIONE (nuovi) ──────────────────────────

  {
    name: 'Pagination',
    slug: 'pagination',
    category: 'Navigazione',
    description: 'Controlli di navigazione pagine con numeri e frecce.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'total', type: 'number', default: '1', description: 'Numero totale di pagine.' },
      { name: 'current', type: 'number', default: '1', description: 'Pagina corrente.' },
    ],
    code: {
      html: `<style>
  .pagination { display: flex; align-items: center; gap: 4px; }
  .page-btn {
    min-width: 36px; height: 36px; display: inline-flex; align-items: center;
    justify-content: center; font-size: 14px; font-family: inherit; font-weight: 500;
    background: none; border: 1px solid #e5e7eb; border-radius: 8px;
    cursor: pointer; color: #2B3038; transition: all 0.15s;
  }
  .page-btn:hover:not(:disabled):not(.active) { background: #F2F3EF; }
  .page-btn.active { background: #2B3038; color: #fff; border-color: #2B3038; }
  .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .page-btn svg { width: 16px; height: 16px; }
</style>

<nav class="pagination">
  <button class="page-btn" disabled>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <button class="page-btn active">1</button>
  <button class="page-btn">2</button>
  <button class="page-btn">3</button>
  <button class="page-btn">4</button>
  <button class="page-btn">5</button>
  <button class="page-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
  </button>
</nav>`,

      vue: `<script setup lang="ts">
interface Props { total: number; modelValue?: number }
const props = withDefaults(defineProps<Props>(), { modelValue: 1 })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const pages = computed(() => Array.from({ length: props.total }, (_, i) => i + 1))
</script>

<template>
  <nav class="pagination">
    <button class="page-btn" :disabled="modelValue <= 1" @click="emit('update:modelValue', modelValue! - 1)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button v-for="p in pages" :key="p" class="page-btn" :class="{ active: p === modelValue }" @click="emit('update:modelValue', p)">
      {{ p }}
    </button>
    <button class="page-btn" :disabled="modelValue >= total" @click="emit('update:modelValue', modelValue! + 1)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </nav>
</template>

<style scoped>
.pagination { display: flex; align-items: center; gap: 4px; }
.page-btn { min-width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; font-family: inherit; font-weight: 500; background: none; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; color: #2B3038; transition: all 0.15s; }
.page-btn:hover:not(:disabled):not(.active) { background: #F2F3EF; }
.page-btn.active { background: #2B3038; color: #fff; border-color: #2B3038; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-btn svg { width: 16px; height: 16px; }
</style>`,

      react: `'use client'

interface PaginationProps { total: number; current?: number; onChange?: (page: number) => void }

export function Pagination({ total, current = 1, onChange }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <nav className="pagination">
      <button className="page-btn" disabled={current <= 1} onClick={() => onChange?.(current - 1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      {pages.map(p => (
        <button key={p} className={\`page-btn \${p === current ? 'active' : ''}\`} onClick={() => onChange?.(p)}>
          {p}
        </button>
      ))}
      <button className="page-btn" disabled={current >= total} onClick={() => onChange?.(current + 1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </nav>
  )
}`,
    },
  },

  // ─── RATING ────────────────────────────────────────
  {
    name: 'Rating',
    slug: 'rating',
    category: 'Form',
    description: 'Valutazione a stelle interattiva con hover e selezione.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'max', type: 'number', default: '5', description: 'Numero massimo di stelle' },
      { name: 'value', type: 'number', default: '0', description: 'Valore attuale selezionato' },
    ],
    code: {
      html: `<div class="rating" id="rating">
  <button class="star active" data-value="1">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
  <button class="star active" data-value="2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
  <button class="star active" data-value="3">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
  <button class="star" data-value="4">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
  <button class="star" data-value="5">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
</div>

<style>
  .rating { display: flex; gap: 4px; }
  .star { background: none; border: none; cursor: pointer; padding: 2px; color: #d1d5db; transition: color 0.15s, transform 0.15s; }
  .star:hover { transform: scale(1.15); }
  .star.active { color: #2B3038; }
  .star.hovered { color: #2B3038; opacity: 0.7; }
</style>

<script>
  const rating = document.getElementById('rating');
  let current = 3;

  function render() {
    rating.querySelectorAll('.star').forEach(s => {
      const v = parseInt(s.dataset.value);
      s.classList.toggle('active', v <= current);
    });
  }

  rating.querySelectorAll('.star').forEach(star => {
    star.addEventListener('mouseenter', () => {
      const v = parseInt(star.dataset.value);
      rating.querySelectorAll('.star').forEach(s => {
        const sv = parseInt(s.dataset.value);
        s.classList.toggle('hovered', sv <= v && sv > current);
      });
    });
    star.addEventListener('mouseleave', () => {
      rating.querySelectorAll('.star').forEach(s => s.classList.remove('hovered'));
    });
    star.addEventListener('click', () => {
      current = parseInt(star.dataset.value);
      render();
    });
  });
<\/script>`,
      vue: `<template>
  <div class="rating">
    <button
      v-for="i in max"
      :key="i"
      class="star"
      :class="{ active: i <= modelValue, hovered: i <= hoverVal && i > modelValue }"
      @mouseenter="hoverVal = i"
      @mouseleave="hoverVal = 0"
      @click="$emit('update:modelValue', i)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: number; max?: number }>()
defineEmits<{ 'update:modelValue': [value: number] }>()
const hoverVal = ref(0)
<\/script>

<style scoped>
.rating { display: flex; gap: 4px; }
.star { background: none; border: none; cursor: pointer; padding: 2px; color: #d1d5db; transition: color 0.15s, transform 0.15s; }
.star:hover { transform: scale(1.15); }
.star.active { color: #2B3038; }
.star.hovered { color: #2B3038; opacity: 0.7; }
</style>`,
      react: `import { useState } from 'react'
import './Rating.css'

interface RatingProps { value: number; max?: number; onChange?: (v: number) => void }

export function Rating({ value, max = 5, onChange }: RatingProps) {
  const [hover, setHover] = useState(0)
  return (
    <div className="rating">
      {Array.from({ length: max }, (_, i) => i + 1).map(i => (
        <button
          key={i}
          className={\`star \${i <= value ? 'active' : ''} \${i <= hover && i > value ? 'hovered' : ''}\`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange?.(i)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </button>
      ))}
    </div>
  )
}`,
    },
  },
  // ─── NUMBER INPUT ───────────────────────────────────
  {
    name: 'Number Input',
    slug: 'number-input',
    category: 'Form',
    description: 'Campo numerico con pulsanti incremento e decremento.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Valore corrente' },
      { name: 'min', type: 'number', default: '0', description: 'Valore minimo' },
      { name: 'max', type: 'number', default: '100', description: 'Valore massimo' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento per click' },
    ],
    code: {
      html: `<div class="number-input" id="numInput">
  <button class="num-btn minus" type="button">−</button>
  <input type="text" class="num-field" value="1" readonly />
  <button class="num-btn plus" type="button">+</button>
</div>

<style>
  .number-input { display: inline-flex; align-items: center; border: 1px solid #e2e4e8; border-radius: 12px; overflow: hidden; }
  .num-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #F2F3EF; border: none; font-size: 16px; color: #2B3038; cursor: pointer; transition: background 0.15s; }
  .num-btn:hover { background: #e5e6e2; }
  .num-btn:disabled { opacity: 0.3; cursor: default; }
  .num-field { width: 56px; height: 40px; text-align: center; border: none; font-size: 15px; font-weight: 600; color: #2B3038; background: white; outline: none; }
</style>

<script>
  const wrap = document.getElementById('numInput');
  const input = wrap.querySelector('.num-field');
  const minus = wrap.querySelector('.minus');
  const plus = wrap.querySelector('.plus');
  let val = 1, min = 0, max = 99;

  function update() {
    input.value = val;
    minus.disabled = val <= min;
    plus.disabled = val >= max;
  }
  minus.addEventListener('click', () => { if (val > min) { val--; update(); } });
  plus.addEventListener('click', () => { if (val < max) { val++; update(); } });
  update();
<\/script>`,
      vue: `<template>
  <div class="number-input">
    <button class="num-btn" :disabled="modelValue <= min" @click="$emit('update:modelValue', modelValue - step)">−</button>
    <input type="text" class="num-field" :value="modelValue" readonly />
    <button class="num-btn" :disabled="modelValue >= max" @click="$emit('update:modelValue', modelValue + step)">+</button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ modelValue: number; min?: number; max?: number; step?: number }>(), { min: 0, max: 99, step: 1 })
defineEmits<{ 'update:modelValue': [value: number] }>()
<\/script>

<style scoped>
.number-input { display: inline-flex; align-items: center; border: 1px solid #e2e4e8; border-radius: 12px; overflow: hidden; }
.num-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #F2F3EF; border: none; font-size: 16px; color: #2B3038; cursor: pointer; transition: background 0.15s; }
.num-btn:hover:not(:disabled) { background: #e5e6e2; }
.num-btn:disabled { opacity: 0.3; cursor: default; }
.num-field { width: 56px; height: 40px; text-align: center; border: none; font-size: 15px; font-weight: 600; color: #2B3038; background: white; outline: none; }
</style>`,
      react: `import { useState } from 'react'
import './NumberInput.css'

interface NumberInputProps { value: number; min?: number; max?: number; step?: number; onChange?: (v: number) => void }

export function NumberInput({ value, min = 0, max = 99, step = 1, onChange }: NumberInputProps) {
  return (
    <div className="number-input">
      <button className="num-btn" disabled={value <= min} onClick={() => onChange?.(value - step)}>−</button>
      <input type="text" className="num-field" value={value} readOnly />
      <button className="num-btn" disabled={value >= max} onClick={() => onChange?.(value + step)}>+</button>
    </div>
  )
}`,
    },
  },
  // ─── TAG INPUT ──────────────────────────────────────
  {
    name: 'Tag Input',
    slug: 'tag-input',
    category: 'Form',
    description: 'Campo di input che crea tag premendo Invio. Rimuovi tag con backspace o click.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'tags', type: 'string[]', default: '[]', description: 'Array dei tag' },
      { name: 'placeholder', type: 'string', default: '"Aggiungi..."', description: 'Placeholder dell\'input' },
    ],
    code: {
      html: `<div class="tag-input" id="tagInput">
  <div class="tags"></div>
  <input type="text" class="tag-field" placeholder="Aggiungi tag..." />
</div>

<style>
  .tag-input { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; min-height: 42px; border: 1px solid #e2e4e8; border-radius: 12px; background: white; align-items: center; cursor: text; transition: border-color 0.2s, box-shadow 0.2s; }
  .tag-input.focused { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
  .tags { display: contents; }
  .tag { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; background: #F2F3EF; border: 1px solid #e2e4e8; border-radius: 6px; font-size: 13px; color: #2B3038; }
  .tag .remove { background: none; border: none; cursor: pointer; font-size: 14px; color: #999; padding: 0 2px; }
  .tag .remove:hover { color: #2B3038; }
  .tag-field { border: none; outline: none; font-size: 14px; flex: 1; min-width: 80px; background: transparent; color: #2B3038; }
</style>

<script>
  const wrap = document.getElementById('tagInput');
  const input = wrap.querySelector('.tag-field');
  const tagsEl = wrap.querySelector('.tags');
  let tags = ['Design', 'UI'];

  function render() {
    tagsEl.innerHTML = tags.map((t, i) =>
      \`<span class="tag">\${t}<button class="remove" data-idx="\${i}">&times;</button></span>\`
    ).join('');
    tagsEl.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => { tags.splice(parseInt(btn.dataset.idx), 1); render(); });
    });
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      e.preventDefault();
      tags.push(input.value.trim());
      input.value = '';
      render();
    }
    if (e.key === 'Backspace' && !input.value && tags.length) {
      tags.pop();
      render();
    }
  });
  input.addEventListener('focus', () => wrap.classList.add('focused'));
  input.addEventListener('blur', () => wrap.classList.remove('focused'));
  wrap.addEventListener('click', () => input.focus());
  render();
<\/script>`,
      vue: `<template>
  <div class="tag-input" :class="{ focused }" @click="$refs.input.focus()">
    <span v-for="(tag, i) in modelValue" :key="i" class="tag">
      {{ tag }}
      <button class="remove" @click.stop="remove(i)">&times;</button>
    </span>
    <input ref="input" type="text" class="tag-field" :placeholder="placeholder" v-model="text" @keydown="onKey" @focus="focused = true" @blur="focused = false" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string[]; placeholder?: string }>(), { placeholder: 'Aggiungi tag...' })
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()
const text = ref('')
const focused = ref(false)
function remove(i: number) { const t = [...props.modelValue]; t.splice(i, 1); emit('update:modelValue', t) }
function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && text.value.trim()) { e.preventDefault(); emit('update:modelValue', [...props.modelValue, text.value.trim()]); text.value = '' }
  if (e.key === 'Backspace' && !text.value && props.modelValue.length) { remove(props.modelValue.length - 1) }
}
<\/script>

<style scoped>
.tag-input { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; min-height: 42px; border: 1px solid #e2e4e8; border-radius: 12px; background: white; align-items: center; cursor: text; transition: border-color 0.2s, box-shadow 0.2s; }
.tag-input.focused { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
.tag { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; background: #F2F3EF; border: 1px solid #e2e4e8; border-radius: 6px; font-size: 13px; color: #2B3038; }
.tag .remove { background: none; border: none; cursor: pointer; font-size: 14px; color: #999; padding: 0 2px; }
.tag .remove:hover { color: #2B3038; }
.tag-field { border: none; outline: none; font-size: 14px; flex: 1; min-width: 80px; background: transparent; color: #2B3038; }
</style>`,
      react: `import { useState, useRef } from 'react'
import './TagInput.css'

interface TagInputProps { value: string[]; onChange?: (tags: string[]) => void; placeholder?: string }

export function TagInput({ value, onChange, placeholder = 'Aggiungi tag...' }: TagInputProps) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && text.trim()) { e.preventDefault(); onChange?.([...value, text.trim()]); setText('') }
    if (e.key === 'Backspace' && !text && value.length) { onChange?.(value.slice(0, -1)) }
  }

  return (
    <div className={\`tag-input \${focused ? 'focused' : ''}\`} onClick={() => inputRef.current?.focus()}>
      {value.map((tag, i) => (
        <span key={i} className="tag">{tag}<button className="remove" onClick={(e) => { e.stopPropagation(); onChange?.(value.filter((_, j) => j !== i)) }}>&times;</button></span>
      ))}
      <input ref={inputRef} type="text" className="tag-field" placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} onKeyDown={onKey} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  )
}`,
    },
  },
  // ─── COMBOBOX ──────────────────────────────────────
  {
    name: 'Combobox',
    slug: 'combobox',
    category: 'Form',
    description: 'Select con campo di ricerca integrato per filtrare le opzioni.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'options', type: 'string[]', default: '[]', description: 'Array di opzioni disponibili' },
      { name: 'value', type: 'string', default: "''", description: 'Valore selezionato' },
      { name: 'placeholder', type: 'string', default: '"Cerca..."', description: 'Placeholder del campo di ricerca' },
    ],
    code: {
      html: `<div class="combobox" id="combobox">
  <div class="combo-trigger">
    <input type="text" class="combo-input" placeholder="Cerca un framework..." />
    <svg class="combo-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
  </div>
  <div class="combo-list" style="display:none">
    <div class="combo-option" data-value="react">React</div>
    <div class="combo-option" data-value="vue">Vue</div>
    <div class="combo-option" data-value="angular">Angular</div>
    <div class="combo-option" data-value="svelte">Svelte</div>
    <div class="combo-option" data-value="solid">Solid</div>
    <div class="combo-option" data-value="next">Next.js</div>
    <div class="combo-option" data-value="nuxt">Nuxt</div>
  </div>
</div>

<style>
  .combobox { position: relative; width: 240px; }
  .combo-trigger { position: relative; }
  .combo-input { width: 100%; padding: 10px 36px 10px 14px; font-size: 14px; border: 1px solid #e2e4e8; border-radius: 12px; outline: none; background: white; color: #2B3038; transition: border-color 0.2s, box-shadow 0.2s; }
  .combo-input:focus { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
  .combo-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; pointer-events: none; }
  .combo-list { position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; background: white; border: 1px solid #e2e4e8; border-radius: 12px; padding: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-height: 200px; overflow-y: auto; z-index: 10; }
  .combo-option { padding: 8px 12px; font-size: 14px; color: #2B3038; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
  .combo-option:hover, .combo-option.highlighted { background: #F2F3EF; }
  .combo-option.selected { font-weight: 600; }
  .combo-empty { padding: 12px; text-align: center; font-size: 13px; color: #999; }
</style>

<script>
  const combo = document.getElementById('combobox');
  const input = combo.querySelector('.combo-input');
  const list = combo.querySelector('.combo-list');
  const options = [...combo.querySelectorAll('.combo-option')];
  let selected = '';

  input.addEventListener('focus', () => { list.style.display = 'block'; filter(); });
  input.addEventListener('input', filter);
  document.addEventListener('click', (e) => { if (!combo.contains(e.target)) list.style.display = 'none'; });

  function filter() {
    const q = input.value.toLowerCase();
    let visible = 0;
    options.forEach(o => {
      const match = o.textContent.toLowerCase().includes(q);
      o.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    const empty = list.querySelector('.combo-empty');
    if (empty) empty.remove();
    if (!visible) list.insertAdjacentHTML('beforeend', '<div class="combo-empty">Nessun risultato</div>');
  }

  options.forEach(o => {
    o.addEventListener('click', () => {
      selected = o.dataset.value;
      input.value = o.textContent;
      options.forEach(opt => opt.classList.toggle('selected', opt === o));
      list.style.display = 'none';
    });
  });
<\/script>`,
      vue: `<template>
  <div class="combobox" ref="root">
    <div class="combo-trigger">
      <input type="text" class="combo-input" :placeholder="placeholder" v-model="search" @focus="open = true" />
      <svg class="combo-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
    </div>
    <div v-if="open" class="combo-list">
      <div v-for="opt in filtered" :key="opt" class="combo-option" :class="{ selected: opt === modelValue }" @click="select(opt)">{{ opt }}</div>
      <div v-if="!filtered.length" class="combo-empty">Nessun risultato</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string; options: string[]; placeholder?: string }>(), { placeholder: 'Cerca...' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const search = ref('')
const open = ref(false)
const root = ref<HTMLElement>()
const filtered = computed(() => props.options.filter(o => o.toLowerCase().includes(search.value.toLowerCase())))
function select(opt: string) { emit('update:modelValue', opt); search.value = opt; open.value = false }
onMounted(() => { document.addEventListener('click', (e) => { if (!root.value?.contains(e.target as Node)) open.value = false }) })
<\/script>

<style scoped>
.combobox { position: relative; width: 240px; }
.combo-trigger { position: relative; }
.combo-input { width: 100%; padding: 10px 36px 10px 14px; font-size: 14px; border: 1px solid #e2e4e8; border-radius: 12px; outline: none; background: white; color: #2B3038; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
.combo-input:focus { border-color: #2B3038; box-shadow: 0 0 0 2px rgba(43,48,56,0.08); }
.combo-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; pointer-events: none; }
.combo-list { position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; background: white; border: 1px solid #e2e4e8; border-radius: 12px; padding: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-height: 200px; overflow-y: auto; z-index: 10; }
.combo-option { padding: 8px 12px; font-size: 14px; color: #2B3038; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
.combo-option:hover { background: #F2F3EF; }
.combo-option.selected { font-weight: 600; }
.combo-empty { padding: 12px; text-align: center; font-size: 13px; color: #999; }
</style>`,
      react: `import { useState, useRef, useEffect } from 'react'
import './Combobox.css'

interface ComboboxProps { value: string; options: string[]; onChange?: (v: string) => void; placeholder?: string }

export function Combobox({ value, options, onChange, placeholder = 'Cerca...' }: ComboboxProps) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="combobox" ref={ref}>
      <div className="combo-trigger">
        <input type="text" className="combo-input" placeholder={placeholder} value={search} onChange={e => { setSearch(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)} />
        <svg className="combo-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
      </div>
      {open && (
        <div className="combo-list">
          {filtered.map(opt => (
            <div key={opt} className={\`combo-option \${opt === value ? 'selected' : ''}\`} onClick={() => { onChange?.(opt); setSearch(opt); setOpen(false) }}>{opt}</div>
          ))}
          {!filtered.length && <div className="combo-empty">Nessun risultato</div>}
        </div>
      )}
    </div>
  )
}`,
    },
  },
  // ─── STEPPER ───────────────────────────────────────
  {
    name: 'Stepper',
    slug: 'stepper',
    category: 'Navigazione',
    description: 'Indicatore di progresso a step con stato completato, attivo e in attesa.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'steps', type: 'string[]', default: '[]', description: 'Array di label per ogni step' },
      { name: 'current', type: 'number', default: '0', description: 'Indice dello step attivo' },
    ],
    code: {
      html: `<div class="stepper" id="stepper">
  <div class="step completed">
    <div class="step-circle">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
    </div>
    <div class="step-line done"></div>
    <span class="step-label">Account</span>
  </div>
  <div class="step active">
    <div class="step-circle">2</div>
    <div class="step-line"></div>
    <span class="step-label">Profilo</span>
  </div>
  <div class="step">
    <div class="step-circle">3</div>
    <div class="step-line"></div>
    <span class="step-label">Revisione</span>
  </div>
  <div class="step">
    <div class="step-circle">4</div>
    <span class="step-label">Conferma</span>
  </div>
</div>

<style>
  .stepper { display: flex; align-items: flex-start; }
  .step { display: flex; flex-direction: column; align-items: center; position: relative; flex: 1; }
  .step-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; background: #F2F3EF; color: #999; border: 2px solid #e2e4e8; transition: all 0.2s; position: relative; z-index: 1; }
  .step.active .step-circle { background: #2B3038; color: white; border-color: #2B3038; }
  .step.completed .step-circle { background: #2B3038; color: white; border-color: #2B3038; }
  .step-label { font-size: 12px; margin-top: 8px; color: #999; font-weight: 500; }
  .step.active .step-label, .step.completed .step-label { color: #2B3038; }
  .step-line { position: absolute; top: 16px; left: calc(50% + 16px); right: calc(-50% + 16px); height: 2px; background: #e2e4e8; }
  .step-line.done { background: #2B3038; }
  .step:last-child .step-line { display: none; }
</style>`,
      vue: `<template>
  <div class="stepper">
    <div v-for="(step, i) in steps" :key="i" class="step" :class="{ active: i === current, completed: i < current }">
      <div class="step-circle">
        <svg v-if="i < current" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
        <template v-else>{{ i + 1 }}</template>
      </div>
      <div v-if="i < steps.length - 1" class="step-line" :class="{ done: i < current }" />
      <span class="step-label">{{ step }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ steps: string[]; current: number }>()
<\/script>

<style scoped>
.stepper { display: flex; align-items: flex-start; }
.step { display: flex; flex-direction: column; align-items: center; position: relative; flex: 1; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; background: #F2F3EF; color: #999; border: 2px solid #e2e4e8; transition: all 0.2s; position: relative; z-index: 1; }
.step.active .step-circle, .step.completed .step-circle { background: #2B3038; color: white; border-color: #2B3038; }
.step-label { font-size: 12px; margin-top: 8px; color: #999; font-weight: 500; }
.step.active .step-label, .step.completed .step-label { color: #2B3038; }
.step-line { position: absolute; top: 16px; left: calc(50% + 16px); right: calc(-50% + 16px); height: 2px; background: #e2e4e8; }
.step-line.done { background: #2B3038; }
</style>`,
      react: `import './Stepper.css'

interface StepperProps { steps: string[]; current: number }

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="stepper">
      {steps.map((step, i) => (
        <div key={i} className={\`step \${i === current ? 'active' : ''} \${i < current ? 'completed' : ''}\`}>
          <div className="step-circle">
            {i < current ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
            ) : i + 1}
          </div>
          {i < steps.length - 1 && <div className={\`step-line \${i < current ? 'done' : ''}\`} />}
          <span className="step-label">{step}</span>
        </div>
      ))}
    </div>
  )
}`,
    },
  },
  // ─── AVATAR GROUP ──────────────────────────────────
  {
    name: 'Avatar Group',
    slug: 'avatar-group',
    category: 'Primitivi',
    description: 'Gruppo di avatar sovrapposti con indicatore per utenti aggiuntivi.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'avatars', type: 'Array', default: '[]', description: 'Array di avatar (initials, src)' },
      { name: 'max', type: 'number', default: '4', description: 'Numero massimo di avatar visibili' },
    ],
    code: {
      html: `<div class="avatar-group">
  <div class="ag-avatar" style="background:#2B3038;color:white">AB</div>
  <div class="ag-avatar" style="background:#5b6370;color:white">CD</div>
  <div class="ag-avatar" style="background:#8891a0;color:white">EF</div>
  <div class="ag-avatar" style="background:#b0b7c3;color:white">GH</div>
  <div class="ag-avatar ag-more">+3</div>
</div>

<style>
  .avatar-group { display: flex; }
  .ag-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; border: 2px solid white; margin-left: -10px; }
  .ag-avatar:first-child { margin-left: 0; }
  .ag-more { background: #F2F3EF; color: #2B3038; font-size: 11px; }
</style>`,
      vue: `<template>
  <div class="avatar-group">
    <div v-for="(a, i) in visible" :key="i" class="ag-avatar" :style="{ background: a.color, color: 'white' }">{{ a.initials }}</div>
    <div v-if="remaining > 0" class="ag-avatar ag-more">+{{ remaining }}</div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ avatars: { initials: string; color: string }[]; max?: number }>(), { max: 4 })
const visible = computed(() => props.avatars.slice(0, props.max))
const remaining = computed(() => Math.max(0, props.avatars.length - props.max))
<\/script>

<style scoped>
.avatar-group { display: flex; }
.ag-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; border: 2px solid white; margin-left: -10px; }
.ag-avatar:first-child { margin-left: 0; }
.ag-more { background: #F2F3EF; color: #2B3038; font-size: 11px; }
</style>`,
      react: `import './AvatarGroup.css'

interface AvatarGroupProps { avatars: { initials: string; color: string }[]; max?: number }

export function AvatarGroup({ avatars, max = 4 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const remaining = Math.max(0, avatars.length - max)
  return (
    <div className="avatar-group">
      {visible.map((a, i) => (
        <div key={i} className="ag-avatar" style={{ background: a.color, color: 'white' }}>{a.initials}</div>
      ))}
      {remaining > 0 && <div className="ag-avatar ag-more">+{remaining}</div>}
    </div>
  )
}`,
    },
  },
  // ─── KBD ───────────────────────────────────────────
  {
    name: 'Kbd',
    slug: 'kbd',
    category: 'Primitivi',
    description: 'Elemento per visualizzare shortcut e combinazioni tastiera.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'keys', type: 'string[]', default: '[]', description: 'Array di tasti da visualizzare' },
    ],
    code: {
      html: `<div class="kbd-group">
  <kbd class="kbd">⌘</kbd>
  <kbd class="kbd">K</kbd>
</div>

<style>
  .kbd-group { display: inline-flex; align-items: center; gap: 4px; }
  .kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px; font-family: system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #2B3038; background: #F2F3EF; border: 1px solid #e2e4e8; border-radius: 6px; box-shadow: 0 1px 0 #d1d3d7; }
</style>`,
      vue: `<template>
  <span class="kbd-group">
    <kbd v-for="(key, i) in keys" :key="i" class="kbd">{{ key }}</kbd>
  </span>
</template>

<script setup lang="ts">
defineProps<{ keys: string[] }>()
<\/script>

<style scoped>
.kbd-group { display: inline-flex; align-items: center; gap: 4px; }
.kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 6px; font-family: system-ui, sans-serif; font-size: 12px; font-weight: 500; color: #2B3038; background: #F2F3EF; border: 1px solid #e2e4e8; border-radius: 6px; box-shadow: 0 1px 0 #d1d3d7; }
</style>`,
      react: `import './Kbd.css'

interface KbdProps { keys: string[] }

export function Kbd({ keys }: KbdProps) {
  return (
    <span className="kbd-group">
      {keys.map((key, i) => <kbd key={i} className="kbd">{key}</kbd>)}
    </span>
  )
}`,
    },
  },
  // ─── TIMELINE ──────────────────────────────────────
  {
    name: 'Timeline',
    slug: 'timeline',
    category: 'Dati',
    description: 'Timeline verticale per visualizzare eventi in ordine cronologico.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: 'Array', default: '[]', description: 'Array di eventi con titolo, descrizione e data' },
    ],
    code: {
      html: `<div class="timeline">
  <div class="tl-item">
    <div class="tl-dot active"></div>
    <div class="tl-content">
      <span class="tl-date">Oggi</span>
      <h4 class="tl-title">Progetto pubblicato</h4>
      <p class="tl-desc">Il sito è ora live e disponibile al pubblico.</p>
    </div>
  </div>
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-content">
      <span class="tl-date">2 giorni fa</span>
      <h4 class="tl-title">Review completata</h4>
      <p class="tl-desc">Tutti i feedback sono stati integrati.</p>
    </div>
  </div>
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-content">
      <span class="tl-date">1 settimana fa</span>
      <h4 class="tl-title">Design approvato</h4>
      <p class="tl-desc">Il cliente ha approvato il design finale.</p>
    </div>
  </div>
</div>

<style>
  .timeline { display: flex; flex-direction: column; gap: 0; padding-left: 16px; }
  .tl-item { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-item::before { content: ''; position: absolute; left: 5px; top: 12px; bottom: 0; width: 1px; background: #e2e4e8; }
  .tl-item:last-child::before { display: none; }
  .tl-dot { width: 11px; height: 11px; border-radius: 50%; background: #e2e4e8; margin-top: 4px; flex-shrink: 0; position: relative; z-index: 1; }
  .tl-dot.active { background: #2B3038; }
  .tl-content { flex: 1; }
  .tl-date { font-size: 11px; color: #999; font-weight: 500; }
  .tl-title { font-size: 14px; font-weight: 600; color: #2B3038; margin: 2px 0; }
  .tl-desc { font-size: 13px; color: #666; line-height: 1.5; }
</style>`,
      vue: `<template>
  <div class="timeline">
    <div v-for="(item, i) in items" :key="i" class="tl-item">
      <div class="tl-dot" :class="{ active: i === 0 }" />
      <div class="tl-content">
        <span class="tl-date">{{ item.date }}</span>
        <h4 class="tl-title">{{ item.title }}</h4>
        <p class="tl-desc">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: { date: string; title: string; description: string }[] }>()
<\/script>

<style scoped>
.timeline { display: flex; flex-direction: column; padding-left: 16px; }
.tl-item { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
.tl-item:last-child { padding-bottom: 0; }
.tl-item::before { content: ''; position: absolute; left: 5px; top: 12px; bottom: 0; width: 1px; background: #e2e4e8; }
.tl-item:last-child::before { display: none; }
.tl-dot { width: 11px; height: 11px; border-radius: 50%; background: #e2e4e8; margin-top: 4px; flex-shrink: 0; position: relative; z-index: 1; }
.tl-dot.active { background: #2B3038; }
.tl-content { flex: 1; }
.tl-date { font-size: 11px; color: #999; font-weight: 500; }
.tl-title { font-size: 14px; font-weight: 600; color: #2B3038; margin: 2px 0; }
.tl-desc { font-size: 13px; color: #666; line-height: 1.5; }
</style>`,
      react: `import './Timeline.css'

interface TimelineItem { date: string; title: string; description: string }
interface TimelineProps { items: TimelineItem[] }

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="tl-item">
          <div className={\`tl-dot \${i === 0 ? 'active' : ''}\`} />
          <div className="tl-content">
            <span className="tl-date">{item.date}</span>
            <h4 className="tl-title">{item.title}</h4>
            <p className="tl-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}`,
    },
  },
  // ─── FILE UPLOAD ────────────────────────────────────
  {
    name: 'File Upload',
    slug: 'file-upload',
    category: 'Form',
    description: 'Area di upload file con drag & drop e selezione manuale.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'accept', type: 'string', default: '"*"', description: 'Tipi di file accettati' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Consenti upload multiplo' },
    ],
    code: {
      html: `<div class="dropzone" id="dropzone">
  <input type="file" id="fileInput" hidden multiple />
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="dz-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
  </svg>
  <p class="dz-text">Trascina i file qui oppure <span class="dz-link">sfoglia</span></p>
  <p class="dz-hint">PNG, JPG o PDF fino a 10 MB</p>
</div>

<style>
  .dropzone { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; border: 2px dashed #e2e4e8; border-radius: 16px; background: white; cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center; }
  .dropzone:hover, .dropzone.dragging { border-color: #2B3038; background: #F2F3EF; }
  .dz-icon { color: #999; margin-bottom: 12px; }
  .dz-text { font-size: 14px; color: #2B3038; margin: 0; }
  .dz-link { color: #2B3038; font-weight: 600; text-decoration: underline; cursor: pointer; }
  .dz-hint { font-size: 12px; color: #999; margin: 4px 0 0; }
</style>

<script>
  const dz = document.getElementById('dropzone');
  const input = document.getElementById('fileInput');
  dz.addEventListener('click', () => input.click());
  dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('dragging'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('dragging'));
  dz.addEventListener('drop', (e) => { e.preventDefault(); dz.classList.remove('dragging'); console.log('Files:', e.dataTransfer.files); });
  input.addEventListener('change', () => console.log('Selected:', input.files));
<\/script>`,
      vue: `<template>
  <div class="dropzone" :class="{ dragging }" @click="$refs.input.click()" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="onDrop">
    <input ref="input" type="file" hidden :accept="accept" :multiple="multiple" @change="onSelect" />
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="dz-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
    </svg>
    <p class="dz-text">Trascina i file qui oppure <span class="dz-link">sfoglia</span></p>
    <p class="dz-hint">PNG, JPG o PDF fino a 10 MB</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ accept?: string; multiple?: boolean }>(), { accept: '*', multiple: false })
const emit = defineEmits<{ files: [files: FileList] }>()
const dragging = ref(false)
function onDrop(e: DragEvent) { dragging.value = false; if (e.dataTransfer?.files) emit('files', e.dataTransfer.files) }
function onSelect(e: Event) { const f = (e.target as HTMLInputElement).files; if (f) emit('files', f) }
<\/script>

<style scoped>
.dropzone { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; border: 2px dashed #e2e4e8; border-radius: 16px; background: white; cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center; }
.dropzone:hover, .dropzone.dragging { border-color: #2B3038; background: #F2F3EF; }
.dz-icon { color: #999; margin-bottom: 12px; }
.dz-text { font-size: 14px; color: #2B3038; margin: 0; }
.dz-link { color: #2B3038; font-weight: 600; text-decoration: underline; }
.dz-hint { font-size: 12px; color: #999; margin: 4px 0 0; }
</style>`,
      react: `import { useRef, useState } from 'react'
import './FileUpload.css'

interface FileUploadProps { accept?: string; multiple?: boolean; onFiles?: (files: FileList) => void }

export function FileUpload({ accept = '*', multiple = false, onFiles }: FileUploadProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={\`dropzone \${dragging ? 'dragging' : ''}\`}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files) onFiles?.(e.dataTransfer.files) }}
    >
      <input ref={inputRef} type="file" hidden accept={accept} multiple={multiple} onChange={e => { if (e.target.files) onFiles?.(e.target.files) }} />
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="dz-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
      </svg>
      <p className="dz-text">Trascina i file qui oppure <span className="dz-link">sfoglia</span></p>
      <p className="dz-hint">PNG, JPG o PDF fino a 10 MB</p>
    </div>
  )
}`,
    },
  },
  // ─── CONTEXT MENU ──────────────────────────────────
  {
    name: 'Context Menu',
    slug: 'context-menu',
    category: 'Overlay',
    description: 'Menu contestuale che appare al click destro con azioni e shortcut.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: 'Array', default: '[]', description: 'Array di voci del menu' },
    ],
    code: {
      html: `<div class="cm-area" id="cmArea">
  Clicca con il tasto destro qui
</div>
<div class="cm-menu" id="cmMenu" style="display:none">
  <button class="cm-item"><span>Taglia</span><span class="cm-shortcut">⌘X</span></button>
  <button class="cm-item"><span>Copia</span><span class="cm-shortcut">⌘C</span></button>
  <button class="cm-item"><span>Incolla</span><span class="cm-shortcut">⌘V</span></button>
  <div class="cm-sep"></div>
  <button class="cm-item"><span>Seleziona tutto</span><span class="cm-shortcut">⌘A</span></button>
  <div class="cm-sep"></div>
  <button class="cm-item cm-danger"><span>Elimina</span><span class="cm-shortcut">⌫</span></button>
</div>

<style>
  .cm-area { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; background: #F2F3EF; border: 1px dashed #e2e4e8; border-radius: 12px; font-size: 13px; color: #999; user-select: none; }
  .cm-menu { position: fixed; background: white; border: 1px solid #e2e4e8; border-radius: 12px; padding: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); min-width: 200px; z-index: 999; }
  .cm-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 8px 12px; font-size: 13px; color: #2B3038; background: none; border: none; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
  .cm-item:hover { background: #F2F3EF; }
  .cm-danger { color: #dc2626; }
  .cm-shortcut { font-size: 11px; color: #999; font-family: system-ui; }
  .cm-sep { height: 1px; background: #f0f0f0; margin: 4px 0; }
</style>

<script>
  const area = document.getElementById('cmArea');
  const menu = document.getElementById('cmMenu');
  area.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
  });
  document.addEventListener('click', () => menu.style.display = 'none');
<\/script>`,
      vue: `<template>
  <div class="cm-area" @contextmenu.prevent="openMenu">
    <slot>Clicca con il tasto destro qui</slot>
  </div>
  <Teleport to="body">
    <div v-if="visible" class="cm-menu" :style="{ left: x + 'px', top: y + 'px' }">
      <button v-for="item in items" :key="item.label" class="cm-item" :class="{ 'cm-danger': item.danger }" @click="item.action?.(); visible = false">
        <span>{{ item.label }}</span>
        <span v-if="item.shortcut" class="cm-shortcut">{{ item.shortcut }}</span>
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ items: { label: string; shortcut?: string; danger?: boolean; action?: () => void }[] }>()
const visible = ref(false)
const x = ref(0)
const y = ref(0)
function openMenu(e: MouseEvent) { x.value = e.clientX; y.value = e.clientY; visible.value = true }
onMounted(() => document.addEventListener('click', () => visible.value = false))
<\/script>

<style scoped>
.cm-area { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; background: #F2F3EF; border: 1px dashed #e2e4e8; border-radius: 12px; font-size: 13px; color: #999; }
.cm-menu { position: fixed; background: white; border: 1px solid #e2e4e8; border-radius: 12px; padding: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); min-width: 200px; z-index: 999; }
.cm-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 8px 12px; font-size: 13px; color: #2B3038; background: none; border: none; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
.cm-item:hover { background: #F2F3EF; }
.cm-danger { color: #dc2626; }
.cm-shortcut { font-size: 11px; color: #999; }
</style>`,
      react: `import { useState, useEffect } from 'react'
import './ContextMenu.css'

interface MenuItem { label: string; shortcut?: string; danger?: boolean; onClick?: () => void }
interface ContextMenuProps { items: MenuItem[]; children: React.ReactNode }

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const close = () => setPos(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <>
      <div className="cm-area" onContextMenu={e => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }) }}>
        {children}
      </div>
      {pos && (
        <div className="cm-menu" style={{ left: pos.x, top: pos.y }}>
          {items.map(item => (
            <button key={item.label} className={\`cm-item \${item.danger ? 'cm-danger' : ''}\`} onClick={() => { item.onClick?.(); setPos(null) }}>
              <span>{item.label}</span>
              {item.shortcut && <span className="cm-shortcut">{item.shortcut}</span>}
            </button>
          ))}
        </div>
      )}
    </>
  )
}`,
    },
  },
  // ─── CAROUSEL ──────────────────────────────────────
  {
    name: 'Carousel',
    slug: 'carousel',
    category: 'Dati',
    description: 'Carousel di contenuti con navigazione frecce e indicatori dot.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'items', type: 'Array', default: '[]', description: 'Array di elementi del carousel' },
      { name: 'autoplay', type: 'boolean', default: 'false', description: 'Avanzamento automatico' },
    ],
    code: {
      html: `<div class="carousel" id="carousel">
  <div class="car-track">
    <div class="car-slide active" style="background:#2B3038;color:white">Slide 1</div>
    <div class="car-slide" style="background:#5b6370;color:white">Slide 2</div>
    <div class="car-slide" style="background:#8891a0;color:white">Slide 3</div>
  </div>
  <button class="car-btn car-prev">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <button class="car-btn car-next">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  <div class="car-dots">
    <button class="car-dot active"></button>
    <button class="car-dot"></button>
    <button class="car-dot"></button>
  </div>
</div>

<style>
  .carousel { position: relative; width: 100%; border-radius: 16px; overflow: hidden; }
  .car-track { display: flex; transition: transform 0.3s ease; }
  .car-slide { min-width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600; }
  .car-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; border-radius: 50%; background: white; border: 1px solid #e2e4e8; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: background 0.15s; }
  .car-btn:hover { background: #F2F3EF; }
  .car-prev { left: 12px; }
  .car-next { right: 12px; }
  .car-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
  .car-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: background 0.2s; }
  .car-dot.active { background: white; }
</style>

<script>
  const carousel = document.getElementById('carousel');
  const track = carousel.querySelector('.car-track');
  const dots = carousel.querySelectorAll('.car-dot');
  let current = 0, total = 3;

  function go(i) {
    current = (i + total) % total;
    track.style.transform = \`translateX(-\${current * 100}%)\`;
    dots.forEach((d, j) => d.classList.toggle('active', j === current));
  }
  carousel.querySelector('.car-prev').addEventListener('click', () => go(current - 1));
  carousel.querySelector('.car-next').addEventListener('click', () => go(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
<\/script>`,
      vue: `<template>
  <div class="carousel">
    <div class="car-track" :style="{ transform: \`translateX(-\${current * 100}%)\` }">
      <div v-for="(item, i) in items" :key="i" class="car-slide" :style="item.style">
        <slot :item="item" :index="i">{{ item.label }}</slot>
      </div>
    </div>
    <button class="car-btn car-prev" @click="prev"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
    <button class="car-btn car-next" @click="next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
    <div class="car-dots">
      <button v-for="(_, i) in items" :key="i" class="car-dot" :class="{ active: i === current }" @click="current = i" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ items: { label: string; style?: Record<string, string> }[] }>()
const current = ref(0)
function prev() { current.value = (current.value - 1 + props.items.length) % props.items.length }
function next() { current.value = (current.value + 1) % props.items.length }
<\/script>

<style scoped>
.carousel { position: relative; width: 100%; border-radius: 16px; overflow: hidden; }
.car-track { display: flex; transition: transform 0.3s ease; }
.car-slide { min-width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600; }
.car-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; border-radius: 50%; background: white; border: 1px solid #e2e4e8; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.car-btn:hover { background: #F2F3EF; }
.car-prev { left: 12px; }
.car-next { right: 12px; }
.car-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.car-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; }
.car-dot.active { background: white; }
</style>`,
      react: `import { useState } from 'react'
import './Carousel.css'

interface CarouselProps { items: { label: string; style?: React.CSSProperties }[] }

export function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((current - 1 + items.length) % items.length)
  const next = () => setCurrent((current + 1) % items.length)

  return (
    <div className="carousel">
      <div className="car-track" style={{ transform: \`translateX(-\${current * 100}%)\` }}>
        {items.map((item, i) => (
          <div key={i} className="car-slide" style={item.style}>{item.label}</div>
        ))}
      </div>
      <button className="car-btn car-prev" onClick={prev}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <button className="car-btn car-next" onClick={next}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
      <div className="car-dots">
        {items.map((_, i) => (
          <button key={i} className={\`car-dot \${i === current ? 'active' : ''}\`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  )
}`,
    },
  },
  // ─── TREE VIEW ─────────────────────────────────────
  {
    name: 'Tree View',
    slug: 'tree-view',
    category: 'Dati',
    description: 'Albero gerarchico espandibile per visualizzare strutture a livelli.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'data', type: 'TreeNode[]', default: '[]', description: 'Array di nodi con children opzionali' },
    ],
    code: {
      html: `<div class="tree" id="tree">
  <div class="tree-node">
    <button class="tree-toggle open">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <span class="tree-label">📁 src</span>
    <div class="tree-children">
      <div class="tree-node">
        <button class="tree-toggle open">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <span class="tree-label">📁 components</span>
        <div class="tree-children">
          <div class="tree-node leaf"><span class="tree-label">📄 Button.vue</span></div>
          <div class="tree-node leaf"><span class="tree-label">📄 Input.vue</span></div>
        </div>
      </div>
      <div class="tree-node leaf"><span class="tree-label">📄 App.vue</span></div>
      <div class="tree-node leaf"><span class="tree-label">📄 main.ts</span></div>
    </div>
  </div>
</div>

<style>
  .tree { font-size: 14px; color: #2B3038; }
  .tree-node { padding-left: 20px; }
  .tree-node:first-child { padding-left: 0; }
  .tree-toggle { background: none; border: none; cursor: pointer; padding: 2px; color: #999; transition: transform 0.15s; display: inline-flex; vertical-align: middle; }
  .tree-toggle.open svg { transform: rotate(90deg); }
  .tree-label { vertical-align: middle; padding: 3px 0; }
  .tree-children { display: block; }
  .tree-children.collapsed { display: none; }
  .leaf { padding-left: 34px; }
</style>

<script>
  document.querySelectorAll('.tree-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      const children = btn.parentElement.querySelector('.tree-children');
      if (children) children.classList.toggle('collapsed');
    });
  });
<\/script>`,
      vue: `<template>
  <div class="tree">
    <TreeNode v-for="node in data" :key="node.label" :node="node" />
  </div>
</template>

<script setup lang="ts">
interface TreeNodeType { label: string; icon?: string; children?: TreeNodeType[] }
defineProps<{ data: TreeNodeType[] }>()
<\/script>

<style scoped>
.tree { font-size: 14px; color: #2B3038; }
</style>`,
      react: `import { useState } from 'react'
import './TreeView.css'

interface TreeNodeType { label: string; icon?: string; children?: TreeNodeType[] }

function TreeNode({ node }: { node: TreeNodeType }) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="tree-node">
      <div className="tree-row">
        {hasChildren ? (
          <button className={\`tree-toggle \${open ? 'open' : ''}\`} onClick={() => setOpen(!open)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ) : <span className="tree-spacer" />}
        <span className="tree-label">{node.icon} {node.label}</span>
      </div>
      {hasChildren && open && (
        <div className="tree-children">
          {node.children!.map(child => <TreeNode key={child.label} node={child} />)}
        </div>
      )}
    </div>
  )
}

export function TreeView({ data }: { data: TreeNodeType[] }) {
  return (
    <div className="tree">
      {data.map(node => <TreeNode key={node.label} node={node} />)}
    </div>
  )
}`,
    },
  },

  // ─── COLOR PICKER ─────────────────────────────────
  {
    name: 'Color Picker',
    slug: 'color-picker',
    category: 'Form',
    description: 'Selettore colore con palette predefinita e input esadecimale.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'value', type: 'string', default: '"#2B3038"', description: 'Colore selezionato in formato hex' },
      { name: 'presets', type: 'string[]', default: '[]', description: 'Palette di colori predefiniti' },
    ],
    code: {
      html: `<div class="color-picker" id="colorPicker">
  <div class="cp-preview" style="background:#2B3038"></div>
  <div class="cp-palette">
    <button class="cp-swatch active" data-color="#2B3038" style="background:#2B3038"></button>
    <button class="cp-swatch" data-color="#dc2626" style="background:#dc2626"></button>
    <button class="cp-swatch" data-color="#2563eb" style="background:#2563eb"></button>
    <button class="cp-swatch" data-color="#16a34a" style="background:#16a34a"></button>
    <button class="cp-swatch" data-color="#9333ea" style="background:#9333ea"></button>
    <button class="cp-swatch" data-color="#ea580c" style="background:#ea580c"></button>
    <button class="cp-swatch" data-color="#0d9488" style="background:#0d9488"></button>
    <button class="cp-swatch" data-color="#db2777" style="background:#db2777"></button>
  </div>
  <div class="cp-input-wrap">
    <span class="cp-hash">#</span>
    <input type="text" class="cp-input" value="2B3038" maxlength="6" />
  </div>
</div>

<style>
  .color-picker { width: 220px; padding: 16px; background: white; border: 1px solid #e2e4e8; border-radius: 16px; }
  .cp-preview { width: 100%; height: 40px; border-radius: 10px; margin-bottom: 12px; }
  .cp-palette { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
  .cp-swatch { width: 100%; aspect-ratio: 1; border-radius: 10px; border: 2px solid transparent; cursor: pointer; transition: border-color 0.15s, transform 0.1s; }
  .cp-swatch:hover { transform: scale(1.1); }
  .cp-swatch.active { border-color: #2B3038; box-shadow: 0 0 0 2px white, 0 0 0 4px #2B3038; }
  .cp-input-wrap { display: flex; align-items: center; border: 1px solid #e2e4e8; border-radius: 8px; overflow: hidden; }
  .cp-hash { padding: 6px 8px; font-size: 13px; color: #999; background: #F2F3EF; }
  .cp-input { border: none; outline: none; padding: 6px 8px; font-size: 13px; font-family: monospace; color: #2B3038; width: 100%; }
</style>

<script>
  const cp = document.getElementById('colorPicker');
  const preview = cp.querySelector('.cp-preview');
  const swatches = cp.querySelectorAll('.cp-swatch');
  const input = cp.querySelector('.cp-input');

  swatches.forEach(s => {
    s.addEventListener('click', () => {
      const c = s.dataset.color;
      preview.style.background = c;
      input.value = c.replace('#', '');
      swatches.forEach(sw => sw.classList.remove('active'));
      s.classList.add('active');
    });
  });
  input.addEventListener('input', () => {
    const hex = '#' + input.value;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      preview.style.background = hex;
      swatches.forEach(s => s.classList.toggle('active', s.dataset.color.toLowerCase() === hex.toLowerCase()));
    }
  });
<\/script>`,
      vue: `<template>
  <div class="color-picker">
    <div class="cp-preview" :style="{ background: modelValue }" />
    <div class="cp-palette">
      <button v-for="c in presets" :key="c" class="cp-swatch" :class="{ active: c === modelValue }" :style="{ background: c }" @click="$emit('update:modelValue', c)" />
    </div>
    <div class="cp-input-wrap">
      <span class="cp-hash">#</span>
      <input type="text" class="cp-input" :value="modelValue.replace('#', '')" maxlength="6" @input="onInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string; presets?: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
function onInput(e: Event) {
  const hex = '#' + (e.target as HTMLInputElement).value
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) emit('update:modelValue', hex)
}
<\/script>

<style scoped>
.color-picker { width: 220px; padding: 16px; background: white; border: 1px solid #e2e4e8; border-radius: 16px; }
.cp-preview { width: 100%; height: 40px; border-radius: 10px; margin-bottom: 12px; }
.cp-palette { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
.cp-swatch { width: 100%; aspect-ratio: 1; border-radius: 10px; border: 2px solid transparent; cursor: pointer; transition: border-color 0.15s, transform 0.1s; }
.cp-swatch:hover { transform: scale(1.1); }
.cp-swatch.active { border-color: #2B3038; box-shadow: 0 0 0 2px white, 0 0 0 4px #2B3038; }
.cp-input-wrap { display: flex; align-items: center; border: 1px solid #e2e4e8; border-radius: 8px; overflow: hidden; }
.cp-hash { padding: 6px 8px; font-size: 13px; color: #999; background: #F2F3EF; }
.cp-input { border: none; outline: none; padding: 6px 8px; font-size: 13px; font-family: monospace; color: #2B3038; width: 100%; }
</style>`,
      react: `import { useState } from 'react'
import './ColorPicker.css'

interface ColorPickerProps { value: string; presets?: string[]; onChange?: (c: string) => void }

export function ColorPicker({ value, presets = [], onChange }: ColorPickerProps) {
  return (
    <div className="color-picker">
      <div className="cp-preview" style={{ background: value }} />
      <div className="cp-palette">
        {presets.map(c => (
          <button key={c} className={\`cp-swatch \${c === value ? 'active' : ''}\`} style={{ background: c }} onClick={() => onChange?.(c)} />
        ))}
      </div>
      <div className="cp-input-wrap">
        <span className="cp-hash">#</span>
        <input type="text" className="cp-input" value={value.replace('#', '')} maxLength={6} onChange={e => {
          const hex = '#' + e.target.value
          if (/^#[0-9a-fA-F]{6}$/.test(hex)) onChange?.(hex)
        }} />
      </div>
    </div>
  )
}`,
    },
  },

  // ─── COMMAND PALETTE ──────────────────────────────
  {
    name: 'Command Palette',
    slug: 'command-palette',
    category: 'Overlay',
    description: 'Dialog di ricerca rapida stile ⌘K con navigazione da tastiera.',
    platforms: ['HTML', 'Vue', 'React'],
    props: [
      { name: 'commands', type: 'Array', default: '[]', description: 'Array di comandi con label, shortcut e azione' },
      { name: 'open', type: 'boolean', default: 'false', description: 'Stato di apertura' },
    ],
    code: {
      html: `<div class="cmd-overlay" id="cmdOverlay" style="display:none">
  <div class="cmd-dialog">
    <div class="cmd-search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cmd-icon"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
      <input type="text" class="cmd-input" placeholder="Cerca un comando..." />
    </div>
    <div class="cmd-list">
      <div class="cmd-group-label">Azioni</div>
      <button class="cmd-item"><span>Nuovo progetto</span><kbd class="cmd-kbd">⌘N</kbd></button>
      <button class="cmd-item"><span>Apri file</span><kbd class="cmd-kbd">⌘O</kbd></button>
      <button class="cmd-item"><span>Salva</span><kbd class="cmd-kbd">⌘S</kbd></button>
      <div class="cmd-group-label">Navigazione</div>
      <button class="cmd-item"><span>Vai ai componenti</span><kbd class="cmd-kbd">G C</kbd></button>
      <button class="cmd-item"><span>Vai ai blocchi</span><kbd class="cmd-kbd">G B</kbd></button>
    </div>
  </div>
</div>

<style>
  .cmd-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: flex-start; justify-content: center; padding-top: 20vh; z-index: 999; }
  .cmd-dialog { width: 480px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 48px rgba(0,0,0,0.2); }
  .cmd-search { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #e2e4e8; }
  .cmd-icon { color: #999; flex-shrink: 0; }
  .cmd-input { border: none; outline: none; font-size: 15px; color: #2B3038; width: 100%; background: transparent; }
  .cmd-list { padding: 8px; max-height: 300px; overflow-y: auto; }
  .cmd-group-label { padding: 8px 8px 4px; font-size: 11px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
  .cmd-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 12px; font-size: 14px; color: #2B3038; background: none; border: none; border-radius: 10px; cursor: pointer; transition: background 0.1s; }
  .cmd-item:hover { background: #F2F3EF; }
  .cmd-kbd { font-size: 11px; color: #999; background: #F2F3EF; border: 1px solid #e2e4e8; padding: 2px 6px; border-radius: 4px; font-family: system-ui; }
</style>

<script>
  const overlay = document.getElementById('cmdOverlay');
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
      if (overlay.style.display === 'flex') overlay.querySelector('.cmd-input').focus();
    }
    if (e.key === 'Escape') overlay.style.display = 'none';
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
<\/script>`,
      vue: `<template>
  <Teleport to="body">
    <div v-if="modelValue" class="cmd-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="cmd-dialog">
        <div class="cmd-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
          <input type="text" class="cmd-input" placeholder="Cerca un comando..." v-model="search" ref="input" />
        </div>
        <div class="cmd-list">
          <template v-for="group in filteredGroups" :key="group.label">
            <div class="cmd-group-label">{{ group.label }}</div>
            <button v-for="cmd in group.commands" :key="cmd.label" class="cmd-item" @click="cmd.action?.(); $emit('update:modelValue', false)">
              <span>{{ cmd.label }}</span>
              <kbd v-if="cmd.shortcut" class="cmd-kbd">{{ cmd.shortcut }}</kbd>
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Command { label: string; shortcut?: string; action?: () => void }
interface CommandGroup { label: string; commands: Command[] }
const props = defineProps<{ modelValue: boolean; groups: CommandGroup[] }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
const search = ref('')
const filteredGroups = computed(() => {
  if (!search.value) return props.groups
  return props.groups.map(g => ({ ...g, commands: g.commands.filter(c => c.label.toLowerCase().includes(search.value.toLowerCase())) })).filter(g => g.commands.length)
})
<\/script>

<style scoped>
.cmd-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: flex-start; justify-content: center; padding-top: 20vh; z-index: 999; }
.cmd-dialog { width: 480px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 48px rgba(0,0,0,0.2); }
.cmd-search { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #e2e4e8; }
.cmd-input { border: none; outline: none; font-size: 15px; color: #2B3038; width: 100%; background: transparent; }
.cmd-list { padding: 8px; max-height: 300px; overflow-y: auto; }
.cmd-group-label { padding: 8px 8px 4px; font-size: 11px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.5px; }
.cmd-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 12px; font-size: 14px; color: #2B3038; background: none; border: none; border-radius: 10px; cursor: pointer; transition: background 0.1s; }
.cmd-item:hover { background: #F2F3EF; }
.cmd-kbd { font-size: 11px; color: #999; background: #F2F3EF; border: 1px solid #e2e4e8; padding: 2px 6px; border-radius: 4px; font-family: system-ui; }
</style>`,
      react: `import { useState, useEffect, useRef } from 'react'
import './CommandPalette.css'

interface Command { label: string; shortcut?: string; onClick?: () => void }
interface CommandGroup { label: string; commands: Command[] }
interface CommandPaletteProps { open: boolean; onClose: () => void; groups: CommandGroup[] }

export function CommandPalette({ open, onClose, groups }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) { setSearch(''); inputRef.current?.focus() } }, [open])

  const filtered = search
    ? groups.map(g => ({ ...g, commands: g.commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase())) })).filter(g => g.commands.length)
    : groups

  if (!open) return null

  return (
    <div className="cmd-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cmd-dialog">
        <div className="cmd-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
          <input ref={inputRef} type="text" className="cmd-input" placeholder="Cerca un comando..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="cmd-list">
          {filtered.map(group => (
            <div key={group.label}>
              <div className="cmd-group-label">{group.label}</div>
              {group.commands.map(cmd => (
                <button key={cmd.label} className="cmd-item" onClick={() => { cmd.onClick?.(); onClose() }}>
                  <span>{cmd.label}</span>
                  {cmd.shortcut && <kbd className="cmd-kbd">{cmd.shortcut}</kbd>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
    },
  },
]

export function useComponents() {
  const all = components

  const getBySlug = (slug: string) => {
    return components.find(c => c.slug === slug)
  }

  const getByCategory = (category: string) => {
    return components.filter(c => c.category === category)
  }

  const categories = [...new Set(components.map(c => c.category))]

  return { all, getBySlug, getByCategory, categories }
}
