# Environment Variables Management

This directory contains version-controlled environment variable configurations for AWS Amplify.

## Files

- `amplify-staging.json` - Staging environment variables
- `amplify-production.json` - Production environment variables (when needed)
- `backup/` - Automatic backups of environment variables
- `scripts/` - Helper scripts for managing environment variables

## Usage

### Before Making Changes
1. Always backup current state: `./scripts/backup-env-vars.sh`
2. Validate new configuration: `./scripts/validate-env-vars.sh`
3. Apply changes: `./scripts/deploy-env-vars.sh staging`

### Safety Features
- Automatic backups with timestamps
- Validation to prevent variable loss
- Change tracking and diffs
- Rollback capabilities

## Important Notes
- Never commit sensitive tokens to git (use .env.example patterns)
- Always test changes on staging first
- Review diffs before applying to production