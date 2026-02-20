/**
 * Visual Preview Generator
 * Generate visual previews of app screens before export
 */

export interface ScreenPreview {
  name: string;
  type: 'list' | 'detail' | 'form' | 'profile' | 'settings';
  components: PreviewComponent[];
  description?: string;
}

export interface PreviewComponent {
  type: 'text' | 'image' | 'button' | 'input' | 'card' | 'list' | 'chart';
  props: Record<string, any>;
  children?: PreviewComponent[];
}

export interface VisualPreviewResult {
  screens: ScreenPreview[];
  theme: {
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, number>;
  };
  navigation: {
    type: string;
    screens: string[];
  };
}

export class VisualPreviewGenerator {
  generatePreview(appDefinition: any): VisualPreviewResult {
    const screens = this.generateScreens(appDefinition.screens || []);
    const theme = appDefinition.theme || {
      colors: { primary: '#007AFF', background: '#FFFFFF' },
      typography: {},
      spacing: {}
    };
    const navigation = appDefinition.navigation || { type: 'stack', screens: [] };

    return { screens, theme, navigation };
  }

  private generateScreens(screens: any[]): ScreenPreview[] {
    return screens.map(screen => ({
      name: screen.name || 'Screen',
      type: this.determineScreenType(screen),
      components: this.generateComponents(screen.components || []),
      description: screen.description
    }));
  }

  private determineScreenType(screen: any): ScreenPreview['type'] {
    const name = screen.name?.toLowerCase() || '';
    if (name.includes('detail') || name.includes('profile')) return 'detail';
    if (name.includes('list') || name.includes('feed')) return 'list';
    if (name.includes('form') || name.includes('create') || name.includes('edit')) return 'form';
    if (name.includes('settings') || name.includes('config')) return 'settings';
    return 'detail';
  }

  private generateComponents(components: any[]): PreviewComponent[] {
    return components.map(comp => ({
      type: this.mapComponentType(comp),
      props: this.generateComponentProps(comp)
    }));
  }

  private mapComponentType(comp: any): PreviewComponent['type'] {
    const type = comp.type?.toLowerCase() || '';
    if (type.includes('button')) return 'button';
    if (type.includes('input') || type.includes('text') || type.includes('field')) return 'input';
    if (type.includes('image') || type.includes('img')) return 'image';
    if (type.includes('card')) return 'card';
    if (type.includes('list') || type.includes('row')) return 'list';
    if (type.includes('chart') || type.includes('graph')) return 'chart';
    return 'text';
  }

  private generateComponentProps(comp: any): Record<string, any> {
    return {
      label: comp.label || comp.name || 'Component',
      placeholder: comp.placeholder || 'Enter text...',
      required: comp.required || false,
      ...comp
    };
  }

  generateMockup(preview: VisualPreviewResult): string {
    let mockup = '# 📱 App Preview\n\n';
    
    preview.screens.forEach((screen, index) => {
      mockup += `## ${index + 1}. ${screen.name}\n`;
      mockup += `*Type: ${screen.type}*\n\n`;
      
      screen.components.forEach(comp => {
        mockup += this.renderComponent(comp, 2);
      });
      
      mockup += '\n---\n';
    });

    return mockup;
  }

  private renderComponent(comp: PreviewComponent, depth: number): string {
    const indent = '  '.repeat(depth);
    switch (comp.type) {
      case 'button':
        return `${indent}[ 🔘 ${comp.props.label || 'Button'} ]\n`;
      case 'input':
        return `${indent}[ 📝 ${comp.props.label || 'Input'}: ${comp.props.placeholder} ]\n`;
      case 'image':
        return `${indent}[ 🖼️ ${comp.props.label || 'Image'} ]\n`;
      case 'card':
        return `${indent}[ 🃏 ${comp.props.label || 'Card'} ]\n`;
      case 'list':
        return `${indent}[ 📋 ${comp.props.label || 'List'} ]\n`;
      case 'chart':
        return `${indent}[ 📊 ${comp.props.label || 'Chart'} ]\n`;
      default:
        return `${indent}[ 📄 ${comp.props.label || 'Text'} ]\n`;
    }
  }
}

export function createVisualPreview(): VisualPreviewGenerator {
  return new VisualPreviewGenerator();
}
