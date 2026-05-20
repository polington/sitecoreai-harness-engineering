# Source

This directory contains the Sitecore XM Cloud project source code.

## Structure

```
src/
├── headapps/
│   └── rob-harness-engineering/   # Next.js App Router rendering host
├── authoring/
│   ├── items/                     # Serialized Sitecore content items
│   ├── platform/                  # Sitecore platform project (.NET)
│   └── spe-scripts/               # Sitecore PowerShell Extensions scripts
├── sitecore.json                  # Sitecore CLI configuration
└── nuget.config                   # NuGet package source configuration
```

## Head Application

The primary application code lives in `headapps/rob-harness-engineering/`. See its own [README](headapps/rob-harness-engineering/README.md) and [AGENTS.md](headapps/rob-harness-engineering/AGENTS.md) for detailed guidance.

## Sitecore Items

Serialized content items in `authoring/items/` are managed via Sitecore Content Serialization (SCS). These define templates, renderings, placeholder settings, and page structures used by the head application.
