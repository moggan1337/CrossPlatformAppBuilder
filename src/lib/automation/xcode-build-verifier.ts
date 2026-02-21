// XcodeBuildMCP Integration for Automated Build Verification
// Provides automated build verification for generated iOS projects

export interface BuildVerificationResult {
  success: boolean;
  buildTime: number;
  errors: BuildError[];
  warnings: BuildError[];
  output: string;
}

export interface BuildError {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

/**
 * XcodeBuildMCP Integration for Build Verification
 * 
 * This module provides automated build verification using XcodeBuildMCP.
 * It can be integrated into the iOS project generation pipeline to:
 * 1. Verify generated Xcode projects compile successfully
 * 2. Catch build errors early and provide feedback
 * 3. Create a feedback loop for improving code generation
 * 
 * Installation:
 * - macOS: brew install xcodebuildmcp
 * - Or: npm install -g xcodebuildmcp
 */
export class XcodeBuildVerifier {
  private projectPath: string;
  private scheme: string;

  constructor(projectPath: string, scheme: string) {
    this.projectPath = projectPath;
    this.scheme = scheme;
  }

  /**
   * Check if XcodeBuildMCP is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const { execSync } = await import('child_process');
      execSync('xcodebuildmcp --version', { encoding: 'utf-8' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if running on macOS
   */
  async isMacOS(): Promise<boolean> {
    try {
      const { execSync } = await import('child_process');
      const platform = execSync('uname -s', { encoding: 'utf-8' }).trim();
      return platform === 'Darwin';
    } catch {
      return false;
    }
  }

  /**
   * Verify the build using XcodeBuildMCP
   * Returns build result with errors and warnings
   */
  async verifyBuild(): Promise<BuildVerificationResult> {
    const isAvailable = await this.isAvailable();
    const isMac = await this.isMacOS();

    if (!isMac) {
      return {
        success: false,
        buildTime: 0,
        errors: [{
          file: 'N/A',
          line: 0,
          column: 0,
          message: 'Build verification requires macOS. XcodeBuildMCP only runs on Apple devices.',
          severity: 'error'
        }],
        warnings: [],
        output: 'Skipped: Not running on macOS'
      };
    }

    if (!isAvailable) {
      return {
        success: false,
        buildTime: 0,
        errors: [{
          file: 'N/A',
          line: 0,
          column: 0,
          message: 'XcodeBuildMCP not installed. Run: brew install xcodebuildmcp',
          severity: 'error'
        }],
        warnings: [],
        output: 'Skipped: XcodeBuildMCP not installed'
      };
    }

    return this.runBuild();
  }

  /**
   * Run the actual build using xcodebuildmcp CLI
   */
  private async runBuild(): Promise<BuildVerificationResult> {
    const startTime = Date.now();
    
    try {
      const { execSync } = await import('child_process');
      
      // Build for simulator
      const command = `xcodebuildmcp simulator build \
        --scheme "${this.scheme}" \
        --project-path "${this.projectPath}" \
        --configuration Debug`;

      const output = execSync(command, { 
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        timeout: 300000
      });

      const buildTime = Date.now() - startTime;
      const { errors, warnings } = this.parseBuildOutput(output);

      return {
        success: errors.length === 0,
        buildTime,
        errors,
        warnings,
        output
      };
    } catch (error: any) {
      const buildTime = Date.now() - startTime;
      const errorMessage = error.message || 'Unknown build error';
      
      const { errors, warnings } = this.parseBuildOutput(errorMessage);

      return {
        success: false,
        buildTime,
        errors: errors.length > 0 ? errors : [{
          file: 'N/A',
          line: 0,
          column: 0,
          message: errorMessage,
          severity: 'error'
        }],
        warnings,
        output: errorMessage
      };
    }
  }

  /**
   * Parse xcodebuild output to extract errors and warnings
   */
  private parseBuildOutput(output: string): { errors: BuildError[]; warnings: BuildError[] } {
    const errors: BuildError[] = [];
    const warnings: BuildError[] = [];
    
    const lines = output.split('\n');
    
    const errorPattern = /^(.+?):(\d+):(\d+):\s*error:\s*(.+)$/;
    const warningPattern = /^(.+?):(\d+):(\d+):\s*warning:\s*(.+)$/;
    
    for (const line of lines) {
      const errorMatch = line.match(errorPattern);
      if (errorMatch) {
        errors.push({
          file: errorMatch[1],
          line: parseInt(errorMatch[2]),
          column: parseInt(errorMatch[3]),
          message: errorMatch[4],
          severity: 'error'
        });
        continue;
      }

      const warningMatch = line.match(warningPattern);
      if (warningMatch) {
        warnings.push({
          file: warningMatch[1],
          line: parseInt(warningMatch[2]),
          column: parseInt(warningMatch[3]),
          message: warningMatch[4],
          severity: 'warning'
        });
      }
    }

    return { errors, warnings };
  }
}

/**
 * Helper function to verify a generated iOS project
 */
export async function verifyIOSBuild(
  projectPath: string, 
  scheme: string
): Promise<BuildVerificationResult> {
  const verifier = new XcodeBuildVerifier(projectPath, scheme);
  return verifier.verifyBuild();
}
