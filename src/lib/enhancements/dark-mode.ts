/**
 * Dark Mode UI Support
 * Platform UI dark mode theming
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Light mode
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
  borderRadius: number;
  spacing: {
    sm: number;
    md: number;
    lg: number;
  };
}

export const LIGHT_THEME: ThemeColors = {
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  cardForeground: '#09090b',
  primary: '#000000',
  primaryForeground: '#ffffff',
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  accent: '#f4f4f5',
  accentForeground: '#18181b',
  destructive: '#ef4444',
  destructiveForeground: '#fafafa',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#18181b'
};

export const DARK_THEME: ThemeColors = {
  background: '#09090b',
  foreground: '#fafafa',
  card: '#18181b',
  cardForeground: '#fafafa',
  primary: '#ffffff',
  primaryForeground: '#18181b',
  secondary: '#18181b',
  secondaryForeground: '#fafafa',
  muted: '#18181b',
  mutedForeground: '#a1a1aa',
  accent: '#18181b',
  accentForeground: '#fafafa',
  destructive: '#dc2626',
  destructiveForeground: '#fafafa',
  border: '#27272a',
  input: '#27272a',
  ring: '#c4c4c4'
};

export class ThemeManager {
  private mode: ThemeMode = 'system';
  private currentColors: ThemeColors = LIGHT_THEME;

  constructor(mode: ThemeMode = 'system') {
    this.mode = mode;
    this.applyTheme();
  }

  setMode(mode: ThemeMode): void {
    this.mode = mode;
    this.applyTheme();
  }

  getMode(): ThemeMode {
    return this.mode;
  }

  getColors(): ThemeColors {
    return this.currentColors;
  }

  private applyTheme(): void {
    let isDark = false;

    if (this.mode === 'dark') {
      isDark = true;
    } else if (this.mode === 'light') {
      isDark = false;
    } else if (this.mode === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.currentColors = isDark ? DARK_THEME : LIGHT_THEME;
    
    // Apply to document
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }

  toggle(): void {
    this.setMode(this.mode === 'dark' ? 'light' : 'dark');
  }

  getConfig(): ThemeConfig {
    return {
      mode: this.mode,
      colors: this.currentColors,
      borderRadius: 0.5,
      spacing: {
        sm: 0.5,
        md: 1,
        lg: 1.5
      }
    };
  }

  // Generate CSS variables
generateCSSVariables(): string {
    const colors = this.currentColors;
    return `
:root {
  --background: ${colors.background};
  --foreground: ${colors.foreground};
  --card: ${colors.card};
  --card-foreground: ${colors.cardForeground};
  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.secondaryForeground};
  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};
  --accent: ${colors.accent};
  --accent-foreground: ${colors.accentForeground};
  --destructive: ${colors.destructive};
  --destructive-foreground: ${colors.destructiveForeground};
  --border: ${colors.border};
  --input: ${colors.input};
  --ring: ${colors.ring};
}

.dark {
  --background: ${DARK_THEME.background};
  --foreground: ${DARK_THEME.foreground};
  --card: ${DARK_THEME.card};
  --card-foreground: ${DARK_THEME.cardForeground};
  --primary: ${DARK_THEME.primary};
  --primary-foreground: ${DARK_THEME.primaryForeground};
  --secondary: ${DARK_THEME.secondary};
  --secondary-foreground: ${DARK_THEME.secondaryForeground};
  --muted: ${DARK_THEME.muted};
  --muted-foreground: ${DARK_THEME.mutedForeground};
  --accent: ${DARK_THEME.accent};
  --accent-foreground: ${DARK_THEME.accentForeground};
  --destructive: ${DARK_THEME.destructive};
  --destructive-foreground: ${DARK_THEME.destructiveForeground};
  --border: ${DARK_THEME.border};
  --input: ${DARK_THEME.input};
  --ring: ${DARK_THEME.ring};
}
    `.trim();
  }
}

export function createThemeManager(mode?: ThemeMode): ThemeManager {
  return new ThemeManager(mode);
}

export { LIGHT_THEME, DARK_THEME };
