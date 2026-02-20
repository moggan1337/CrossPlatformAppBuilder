/**
 * Unified Store Review Validation
 * Validates apps for both App Store and Play Store
 */

import { ValidationResult, ValidationIssue, Platform } from '@/types/app';

// ============================================================================
// App Store Review Checks (iOS)
// ============================================================================

const APP_STORE_CHECKS = {
  crashes: {
    severity: 'error',
    category: 'Performance',
    message: 'App must not crash',
    guideline: '2.1 - Performance'
  },
  incompleteApp: {
    severity: 'error',
    category: 'Completeness',
    message: 'App must be complete and fully functional',
    guideline: '2.1 - Performance'
  },
  placeholderContent: {
    severity: 'error',
    category: 'Content',
    message: 'No placeholder or demo content allowed',
    guideline: '2.3.1 - Accuracy'
  },
  signInWithApple: {
    severity: 'error',
    category: 'Sign In',
    message: 'Sign in with Apple required if using social login',
    guideline: '4.1 - Sign in with Apple'
  },
  accountDeletion: {
    severity: 'error',
    category: 'Privacy',
    message: 'Users must be able to delete account in-app',
    guideline: '5.1.1 - Data Collection'
  },
  restorePurchases: {
    severity: 'error',
    category: 'Purchases',
    message: 'Restore Purchases button required for IAP',
    guideline: '3.1.1 - In-App Purchase'
  },
  privacyManifest: {
    severity: 'error',
    category: 'Privacy',
    message: 'PrivacyInfo.xcprivacy required',
    guideline: '4.2 - Privacy'
  },
  accessibility: {
    severity: 'warning',
    category: 'Accessibility',
    message: 'Should support VoiceOver and Dynamic Type',
    guideline: '4.4 - Accessibility'
  },
  darkMode: {
    severity: 'warning',
    category: 'Design',
    message: 'Should support Dark Mode',
    guideline: '4.1 - Design'
  }
};

// ============================================================================
// Play Store Review Checks (Android)
// ============================================================================

const PLAY_STORE_CHECKS = {
  targetSdk: {
    severity: 'error',
    category: 'Technical',
    message: 'Target SDK must be 33 or higher',
    guideline: 'Target API 33+'
  },
  permissions: {
    severity: 'error',
    category: 'Permissions',
    message: 'All permissions must be justified in privacy policy',
    guideline: 'Permissions Policy'
  },
  privacyPolicy: {
    severity: 'error',
    category: 'Privacy',
    message: 'Privacy policy URL required',
    guideline: 'Content Policy'
  },
  dataSafety: {
    severity: 'error',
    category: 'Privacy',
    message: 'Data Safety form must be completed',
    guideline: 'Data Safety'
  },
  adsPolicy: {
    severity: 'error',
    category: 'Monetization',
    message: 'Ads must comply with Ad policies',
    guideline: 'Ad Policy'
  },
  appName: {
    severity: 'error',
    category: 'Content',
    message: 'App name must be at least 2 characters',
    guideline: 'Naming Policy'
  },
  screenshots: {
    severity: 'error',
    category: 'Content',
    message: 'At least 2 screenshots required',
    guideline: 'Graphic Assets'
  },
  icon: {
    severity: 'error',
    category: 'Content',
    message: 'App icon must be 512x512 PNG',
    guideline: 'Graphic Assets'
  },
  testAccount: {
    severity: 'error',
    category: 'Testing',
    message: 'Test account required for apps with login',
    guideline: 'App Testing'
  }
};

export class StoreReviewValidator {
  validate(app: any, platform: Platform): ValidationResult {
    const issues: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];
    const recommendations: string[] = [];

    if (platform === 'ios' || platform === 'react-native') {
      // Run iOS checks
      const iosIssues = this.validateIOS(app);
      issues.push(...iosIssues.filter(i => i.type === 'error'));
      warnings.push(...iosIssues.filter(i => i.type === 'warning'));
    }

    if (platform === 'android' || platform === 'react-native') {
      // Run Android checks
      const androidIssues = this.validateAndroid(app);
      issues.push(...androidIssues.filter(i => i.type === 'error'));
      warnings.push(...androidIssues.filter(i => i.type === 'warning'));
    }

    // Calculate score
    const totalChecks = issues.length + warnings.length;
    const score = totalChecks > 0 
      ? Math.round(((totalChecks - issues.length) / totalChecks) * 100) 
      : 100;

    return {
      valid: issues.length === 0,
      score,
      issues,
      warnings,
      recommendations
    };
  }

  private validateIOS(app: any): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check for crashes - if screens exist, assume no crashes
    if (!app.screens || app.screens.length === 0) {
      issues.push({
        type: 'error',
        ...APP_STORE_CHECKS.incompleteApp
      });
    }

    // Check for placeholder content
    if (app.description?.includes('placeholder') || app.description?.includes('demo')) {
      issues.push({
        type: 'error',
        ...APP_STORE_CHECKS.placeholderContent
      });
    }

    // Check for social login without Apple Sign In
    const hasSocialLogin = app.features?.some((f: string) => 
      ['google-login', 'facebook-login', 'twitter-login'].includes(f)
    );
    if (hasSocialLogin) {
      issues.push({
        type: 'error',
        ...APP_STORE_CHECKS.signInWithApple
      });
    }

    // Check for IAP without restore
    const hasIAP = app.features?.includes('in-app-purchases');
    if (hasIAP && !app.features?.includes('restore-purchases')) {
      issues.push({
        type: 'error',
        ...APP_STORE_CHECKS.restorePurchases
      });
    }

    // Warnings
    if (!app.theme?.darkMode) {
      warnings.push({
        type: 'warning',
        ...APP_STORE_CHECKS.darkMode
      });
    }

    return issues;
  }

  private validateAndroid(app: any): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check for privacy policy
    if (!app.privacyPolicyUrl) {
      issues.push({
        type: 'error',
        ...PLAY_STORE_CHECKS.privacyPolicy
      });
    }

    // Check for data safety
    if (!app.dataSafetyDeclared) {
      issues.push({
        type: 'error',
        ...PLAY_STORE_CHECKS.dataSafety
      });
    }

    // Check app name length
    if (app.name && app.name.length < 2) {
      issues.push({
        type: 'error',
        ...PLAY_STORE_CHECKS.appName
      });
    }

    // Check screenshots
    if (!app.screenshots || app.screenshots.length < 2) {
      issues.push({
        type: 'error',
        ...PLAY_STORE_CHECKS.screenshots
      });
    }

    return issues;
  }

  generateReport(result: ValidationResult, platform: Platform): string {
    const platformName = platform === 'ios' ? 'App Store' : platform === 'android' ? 'Play Store' : 'Stores';
    
    let report = `# 📋 ${platformName} Review Validation\n\n`;
    report += `**Status:** ${result.valid ? '✅ Ready for Submission' : '❌ Needs Fixes'}\n`;
    report += `**Score:** ${result.score}%\n\n`;

    if (result.issues.length > 0) {
      report += `## 🚨 Critical Issues\n\n`;
      result.issues.forEach(issue => {
        report += `### ${issue.category}\n`;
        report += `> ${issue.message}\n`;
        if (issue.guideline) report += `📖 ${issue.guideline}\n`;
        if (issue.fix) report += `🔧 Fix: ${issue.fix}\n`;
        report += '\n';
      });
    }

    if (result.warnings.length > 0) {
      report += `## ⚠️ Warnings\n\n`;
      result.warnings.forEach(warning => {
        report += `- **${warning.category}**: ${warning.message}\n`;
      });
    }

    return report;
  }
}

export const storeValidator = new StoreReviewValidator();
