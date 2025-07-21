---
trigger: always_on
---

Always use this general rules:

# General Code Style & Formatting
- Use English for all code and documentation.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Avoid using any.
- Don't leave blank lines within a function or component.

# Naming Conventions
- Use PascalCase for React component file names (e.g., UserCard.tsx, not user-card.tsx).
- Favor named exports for components.
- Use snake_case for variables, functions, and methods (e.g., is_user).
- Use UPPERCASE for environment variables.
- Avoid magic numbers and define constants.
- Use CONSTANT_CASE for constants.

# Project Structure & Architecture
- Follow Next.js patterns and use the App Router.
- Correctly determine when to use server vs. client components in Next.js.

# TypeScript Best Practices
- Use TypeScript for all code; prefer interfaces over types.
- Avoid any and enums; use explicit types and maps instead.
- Use functional components with TypeScript interfaces.
- Enable strict mode in TypeScript for better type safety.
- Use top level src directory.
- Use path aliases for imports.
- Avoid relative imports
- Use 2 spaces for identing.
- Remove all console.log sentences.

# Syntax & Formatting
- Use the function keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use semicolons at EOL.
- Use Eslint and stylistic from .eslintrc.js

# Functions & Logic
- Avoid deeply nested blocks by:
  - Using early returns.
  - Extracting logic into utility functions.
- Use higher-order functions (map, filter, reduce) to simplify logic.
- Use arrow functions for simple cases (<3 instructions), named functions otherwise.
- Use default parameter values instead of null/undefined checks.
- Use RO-RO (Receive Object, Return Object) for passing and returning multiple parameters.

# Security
- Sanitize user inputs to prevent XSS attacks.
- Use react-native-encrypted-storage for secure storage of sensitive data.
- Ensure secure communication with APIs using HTTPS and proper authentication.
- Use Expo's Security guidelines to protect your app: https://docs.expo.dev/guides/security/

# Key Conventions
1. Prioritize Mobile Web Vitals (Load Time, Jank, and Responsiveness).
2. The deployment to the web will be done using Railway for Next.js, and supabase.
3. Use pnpm to install dependencies
