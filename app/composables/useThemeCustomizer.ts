function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  )
}

function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount))
}

const DEFAULTS = {
  primaryColor: '#1A1F27',
  surfaceColor: '#F2F3EF',
  borderRadius: 8,
  fontSize: 1,
  shadow: 'default' as ShadowLevel,
  borderWidth: 1,
}

export type ShadowLevel = 'none' | 'subtle' | 'default' | 'medium' | 'strong'

export interface ThemePreset {
  id: string
  name: string
  primaryColor: string
  surfaceColor: string
  borderRadius: number
  fontSize: number
  shadow: ShadowLevel
  borderWidth: number
}

export const colorPresets = [
  { label: 'Default', value: '#1A1F27' },
  { label: 'Blu', value: '#2563eb' },
  { label: 'Rosso', value: '#dc2626' },
  { label: 'Verde', value: '#16a34a' },
  { label: 'Viola', value: '#7c3aed' },
  { label: 'Arancio', value: '#ea580c' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Pink', value: '#db2777' },
]

export const surfacePresets = [
  { label: 'Default', value: '#F2F3EF' },
  { label: 'Bianco', value: '#FFFFFF' },
  { label: 'Caldo', value: '#FAF8F5' },
  { label: 'Freddo', value: '#F0F4F8' },
  { label: 'Grigio', value: '#F3F4F6' },
  { label: 'Scuro', value: '#1E1E2E' },
]

// Base text sizes (rem) matching Tailwind defaults
const textSizes: Record<string, number> = {
  '--text-xs': 0.75,
  '--text-sm': 0.875,
  '--text-base': 1,
  '--text-lg': 1.125,
  '--text-xl': 1.25,
  '--text-2xl': 1.5,
}

// Shadow definitions per level
const shadowMap: Record<ShadowLevel, { xs: string; sm: string; default: string; md: string; lg: string; xl: string }> = {
  none: {
    xs: 'none',
    sm: 'none',
    default: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
  },
  subtle: {
    xs: '0 1px 1px 0 rgb(0 0 0 / 0.02)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
    default: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
    lg: '0 4px 6px -2px rgb(0 0 0 / 0.05)',
    xl: '0 8px 12px -4px rgb(0 0 0 / 0.05)',
  },
  default: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  medium: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 2px 4px 0 rgb(0 0 0 / 0.08)',
    default: '0 4px 6px -1px rgb(0 0 0 / 0.12), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
    md: '0 6px 10px -2px rgb(0 0 0 / 0.12), 0 3px 6px -3px rgb(0 0 0 / 0.08)',
    lg: '0 14px 20px -4px rgb(0 0 0 / 0.12), 0 6px 8px -4px rgb(0 0 0 / 0.08)',
    xl: '0 24px 32px -6px rgb(0 0 0 / 0.14), 0 10px 14px -6px rgb(0 0 0 / 0.08)',
  },
  strong: {
    xs: '0 2px 4px 0 rgb(0 0 0 / 0.08)',
    sm: '0 3px 6px 0 rgb(0 0 0 / 0.12)',
    default: '0 6px 12px -2px rgb(0 0 0 / 0.16), 0 3px 6px -3px rgb(0 0 0 / 0.1)',
    md: '0 10px 16px -3px rgb(0 0 0 / 0.16), 0 4px 8px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 28px -5px rgb(0 0 0 / 0.16), 0 8px 12px -6px rgb(0 0 0 / 0.1)',
    xl: '0 32px 40px -8px rgb(0 0 0 / 0.2), 0 14px 18px -8px rgb(0 0 0 / 0.1)',
  },
}

export function useThemeCustomizer() {
  const isOpen = ref(false)
  const primaryColor = ref(DEFAULTS.primaryColor)
  const surfaceColor = ref(DEFAULTS.surfaceColor)
  const borderRadius = ref(DEFAULTS.borderRadius)
  const fontSize = ref(DEFAULTS.fontSize)
  const shadow = ref<ShadowLevel>(DEFAULTS.shadow)
  const borderWidth = ref(DEFAULTS.borderWidth)

  // Saved user presets (persisted in localStorage)
  const savedPresets = ref<ThemePreset[]>([])

  // Load saved presets from localStorage
  if (import.meta.client) {
    const stored = localStorage.getItem('hydra-theme-presets')
    if (stored) {
      try { savedPresets.value = JSON.parse(stored) } catch {}
    }
  }

  function persistPresets() {
    if (import.meta.client) {
      localStorage.setItem('hydra-theme-presets', JSON.stringify(savedPresets.value))
    }
  }

  const isCustomized = computed(() =>
    primaryColor.value !== DEFAULTS.primaryColor
    || surfaceColor.value !== DEFAULTS.surfaceColor
    || borderRadius.value !== DEFAULTS.borderRadius
    || fontSize.value !== DEFAULTS.fontSize
    || shadow.value !== DEFAULTS.shadow
    || borderWidth.value !== DEFAULTS.borderWidth,
  )

  // Detect dark surface to auto-adjust text colors
  const isDarkSurface = computed(() => {
    const { r, g, b } = hexToRgb(surfaceColor.value)
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128
  })

  const cssOverrides = computed<Record<string, string>>(() => {
    const vars: Record<string, string> = {}

    // Primary color
    if (primaryColor.value !== DEFAULTS.primaryColor) {
      vars['--color-ink'] = primaryColor.value
      vars['--color-accent'] = primaryColor.value
      vars['--color-accent-hover'] = darken(primaryColor.value, 0.15)
      vars['--color-ink-muted'] = lighten(primaryColor.value, 0.45)
      vars['--color-ink-faint'] = lighten(primaryColor.value, 0.65)
    }

    // Surface color
    if (surfaceColor.value !== DEFAULTS.surfaceColor) {
      vars['--color-surface'] = surfaceColor.value
      vars['--color-surface-raised'] = isDarkSurface.value ? lighten(surfaceColor.value, 0.08) : '#FFFFFF'
      vars['--color-surface-muted'] = isDarkSurface.value ? lighten(surfaceColor.value, 0.05) : darken(surfaceColor.value, 0.04)

      // Auto-adjust text if dark surface and primary is still default dark
      if (isDarkSurface.value && primaryColor.value === DEFAULTS.primaryColor) {
        vars['--color-ink'] = '#F2F3EF'
        vars['--color-ink-muted'] = '#A0A7B2'
        vars['--color-ink-faint'] = '#6B7280'
        vars['--color-accent'] = '#F2F3EF'
        vars['--color-accent-hover'] = '#D4D5D1'
      }

      // Auto-adjust borders for dark mode
      if (isDarkSurface.value) {
        vars['--color-border-subtle'] = lighten(surfaceColor.value, 0.15)
        vars['--color-border'] = lighten(surfaceColor.value, 0.25)
      }
    }

    // Border radius — overrides --radius-* CSS vars declared in @theme
    if (borderRadius.value !== DEFAULTS.borderRadius) {
      const base = borderRadius.value
      vars['--radius-xs'] = `${Math.max(0, base * 0.25)}px`
      vars['--radius-sm'] = `${Math.max(0, base * 0.5)}px`
      vars['--radius-md'] = `${Math.max(0, base * 0.75)}px`
      vars['--radius-lg'] = `${base}px`
      vars['--radius-xl'] = `${base * 1.5}px`
      vars['--radius-2xl'] = `${base * 2}px`
      vars['--radius-3xl'] = `${base * 3}px`
    }

    // Font size scale — overrides --text-* CSS vars declared in @theme
    if (fontSize.value !== DEFAULTS.fontSize) {
      const scale = fontSize.value
      for (const [varName, baseSize] of Object.entries(textSizes)) {
        vars[varName] = `${(baseSize * scale).toFixed(4)}rem`
      }
    }

    // Shadows — overrides --shadow-* CSS vars declared in @theme
    if (shadow.value !== DEFAULTS.shadow) {
      const s = shadowMap[shadow.value]
      vars['--shadow-xs'] = s.xs
      vars['--shadow-sm'] = s.sm
      vars['--shadow'] = s.default
      vars['--shadow-md'] = s.md
      vars['--shadow-lg'] = s.lg
      vars['--shadow-xl'] = s.xl
    }

    // Border width — custom CSS var applied via :deep() in the page
    if (borderWidth.value !== DEFAULTS.borderWidth) {
      vars['--border-width'] = `${borderWidth.value}px`
    }

    return vars
  })

  function reset() {
    primaryColor.value = DEFAULTS.primaryColor
    surfaceColor.value = DEFAULTS.surfaceColor
    borderRadius.value = DEFAULTS.borderRadius
    fontSize.value = DEFAULTS.fontSize
    shadow.value = DEFAULTS.shadow
    borderWidth.value = DEFAULTS.borderWidth
  }

  function savePreset(name: string) {
    const preset: ThemePreset = {
      id: Date.now().toString(36),
      name,
      primaryColor: primaryColor.value,
      surfaceColor: surfaceColor.value,
      borderRadius: borderRadius.value,
      fontSize: fontSize.value,
      shadow: shadow.value,
      borderWidth: borderWidth.value,
    }
    savedPresets.value.push(preset)
    persistPresets()
    return preset
  }

  function loadPreset(preset: ThemePreset) {
    primaryColor.value = preset.primaryColor
    surfaceColor.value = preset.surfaceColor
    borderRadius.value = preset.borderRadius
    fontSize.value = preset.fontSize
    shadow.value = preset.shadow
    borderWidth.value = preset.borderWidth
  }

  function deletePreset(id: string) {
    savedPresets.value = savedPresets.value.filter(p => p.id !== id)
    persistPresets()
  }

  return {
    isOpen,
    primaryColor,
    surfaceColor,
    borderRadius,
    fontSize,
    shadow,
    borderWidth,
    isCustomized,
    isDarkSurface,
    cssOverrides,
    savedPresets,
    reset,
    savePreset,
    loadPreset,
    deletePreset,
  }
}
