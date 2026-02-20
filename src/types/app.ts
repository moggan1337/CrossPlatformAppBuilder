/**
 * Cross-Platform App Builder - Type Definitions
 * Unified types for iOS, Android, and React Native
 */

// ============================================================================
// Platform Types
// ============================================================================

export type Platform = 'ios' | 'android' | 'react-native' | 'web';
export type PlatformOutput = Platform[];

export interface PlatformConfig {
  platform: Platform;
  enabled: boolean;
  settings?: PlatformSettings;
}

export interface PlatformSettings {
  // iOS settings
  deploymentTarget?: string;
  bundleId?: string;
  teamId?: string;
  
  // Android settings
  packageName?: string;
  minSdk?: number;
  targetSdk?: number;
  
  // React Native settings
  expo?: boolean;
  bareWorkflow?: boolean;
}

// ============================================================================
// App Definition
// ============================================================================

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  platforms: PlatformOutput;
  screens: Screen[];
  navigation: NavigationConfig;
  theme: ThemeConfig;
  dataModels: DataModel[];
  globalState: StateVariable[];
  features: Feature[];
  permissions: Permission[];
}

export interface Screen {
  id: string;
  name: string;
  components: Component[];
  navigation?: NavigationAction;
  localState?: StateVariable[];
}

export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  bindings?: Record<string, Binding>;
}

export interface Binding {
  type: 'state' | 'constant' | 'computed';
  source: string;
  transform?: string;
}

export interface NavigationConfig {
  type: 'stack' | 'tab' | 'split' | 'drawer';
  structure: NavigationItem[];
  initialRoute?: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  path?: string;
  screenId?: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface NavigationAction {
  type: 'push' | 'pop' | 'popToRoot' | 'switchTab' | 'present' | 'dismiss';
  target?: string;
  params?: Record<string, any>;
}

export interface ThemeConfig {
  colors: ColorPalette;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  cornerRadius?: number;
  shadows?: boolean;
  darkMode?: boolean;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary?: string;
  error?: string;
  success?: string;
  warning?: string;
  [key: string]: string;
}

export interface TypographyConfig {
  fontFamily?: string;
  sizes: {
    h1?: number;
    h2?: number;
    h3?: number;
    body?: number;
    caption?: number;
    [key: string]: number | undefined;
  };
}

export interface SpacingConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  [key: string]: number | undefined;
}

export interface DataModel {
  id: string;
  name: string;
  fields: DataField[];
  relationships?: Relationship[];
}

export interface DataField {
  name: string;
  type: DataFieldType;
  required?: boolean;
  defaultValue?: any;
  validation?: string;
}

export type DataFieldType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'date' 
  | 'datetime' 
  | 'array' 
  | 'object'
  | 'image'
  | 'file'
  | 'reference';

export interface Relationship {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  target: string;
  field: string;
}

export interface StateVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  scope: 'global' | 'screen' | 'component';
  defaultValue?: any;
}

export interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  required: boolean;
  platform?: Platform;
}

// ============================================================================
// Generation Request/Response
// ============================================================================

export interface GenerationRequest {
  prompt: string;
  platforms: PlatformOutput;
  template?: string;
  provider?: AIProvider;
  settings?: Partial<PlatformSettings>;
}

export interface GenerationResponse {
  app: AppDefinition;
  code: PlatformCodeMap;
  metadata: GenerationMetadata;
}

export interface PlatformCodeMap {
  ios?: string;
  android?: string;
  'react-native'?: string;
  web?: string;
}

export interface GenerationMetadata {
  provider: AIProvider;
  model: string;
  tokensUsed: number;
  generationTime: number;
  platforms: PlatformOutput;
}

// ============================================================================
// AI Types
// ============================================================================

export type AIProvider = 
  | 'claude' 
  | 'openai' 
  | 'gemini' 
  | 'minimax' 
  | 'zhipu';

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

// ============================================================================
// Template Types
// ============================================================================

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  platforms: PlatformOutput;
  features: string[];
  screens: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type TemplateCategory =
  | 'social'
  | 'productivity'
  | 'health'
  | 'ecommerce'
  | 'entertainment'
  | 'education'
  | 'finance'
  | 'lifestyle'
  | 'utilities'
  | 'travel';

// ============================================================================
// Export Types
// ============================================================================

export interface ExportOptions {
  format: 'zip' | 'tar.gz';
  include?: string[];
  exclude?: string[];
}

export interface ExportResult {
  platform: Platform;
  filename: string;
  content: Buffer | string;
  size: number;
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  score: number;
  issues: ValidationIssue[];
  warnings: ValidationWarning[];
  recommendations: string[];
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  guideline?: string;
  fix?: string;
  platform?: Platform;
}

export interface ValidationWarning extends ValidationIssue {}

// ============================================================================
// Automation Types
// ============================================================================

export interface BuildConfig {
  platform: Platform;
  type: 'debug' | 'release';
  credentials: BuildCredentials;
}

export interface BuildCredentials {
  platform: Platform;
  // iOS
  teamId?: string;
  bundleId?: string;
  certPath?: string;
  profilePath?: string;
  keyPath?: string;
  // Android
  keystorePath?: string;
  keystorePassword?: string;
  keyAlias?: string;
  keyPassword?: string;
}

export interface BuildResult {
  success: boolean;
  platform: Platform;
  artifactPath?: string;
  buildNumber?: string;
  errors?: string[];
}

export interface StoreSubmission {
  platform: Platform;
  appId: string;
  buildPath: string;
  metadata: StoreMetadata;
}

export interface StoreMetadata {
  title: string;
  description: string;
  keywords: string[];
  screenshots: string[];
  privacyUrl: string;
  supportUrl: string;
  version: string;
  releaseNotes?: string;
}
