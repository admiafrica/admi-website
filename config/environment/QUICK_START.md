# Environment Variables Quick Start Guide

## Initial Setup

1. **Create your configuration file** (copy from example):

   ```bash
   cp amplify-staging.json.example amplify-staging.json
   # Edit amplify-staging.json with actual values
   ```

2. **Create initial backup**:
   ```bash
   ./scripts/backup-env-vars.sh staging
   ```

## Daily Workflow

### Adding New Variables

```bash
# 1. Backup current state
./scripts/backup-env-vars.sh staging

# 2. Edit the configuration file
vim amplify-staging.json

# 3. Validate changes
./scripts/validate-env-vars.sh staging

# 4. Deploy changes
./scripts/deploy-env-vars.sh staging
```

### Checking Differences

```bash
# Compare config file to current Amplify settings
./scripts/diff-env-vars.sh staging config current

# Compare two backup files
./scripts/diff-env-vars.sh staging backup1.json backup2.json
```

### Emergency Rollback

```bash
# Rollback to latest backup
./scripts/rollback-env-vars.sh staging latest

# Rollback to specific backup
./scripts/rollback-env-vars.sh staging amplify-staging-20250807_113830.json
```

## Safety Features

✅ **Automatic Backups**: Every deployment creates a timestamped backup
✅ **Validation**: Prevents accidental variable loss  
✅ **Rollback**: Quick recovery from problems
✅ **Version Control**: Track changes over time
✅ **Diff Tools**: See exactly what changed

## File Structure

```
config/environment/
├── README.md                 # Full documentation
├── QUICK_START.md           # This file
├── amplify-staging.json     # Current staging config (gitignored)
├── amplify-staging.json.example  # Template file
├── backup/                  # Automatic backups
│   ├── amplify-staging-20250807_113830.json
│   └── amplify-staging-latest.json -> amplify-staging-20250807_113830.json
└── scripts/                 # Management scripts
    ├── backup-env-vars.sh
    ├── deploy-env-vars.sh
    ├── validate-env-vars.sh
    ├── rollback-env-vars.sh
    └── diff-env-vars.sh
```
