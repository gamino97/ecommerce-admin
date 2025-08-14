---
trigger: glob
globs: **/*.jsx,**/*.tsx
---

Apply this rules when editing a React Native File

# React rules
- Use functional components with hooks.
- Follow a consistent folder structure (components, screens, navigation, services, hooks, utils).
- Use custom hooks for reusable logic, inside hooks folder.
- Implement proper error boundaries and loading states
- Use declarative JSX.
- Avoid anonymous functions in render and prop handlers.
- Do not write "import React from 'react'"

# Naming Conventions
- Use CamelCase for React Components

# Syntax & Formatting
- Use max-len of 80.

# Styling & UI
- Use Tailwind CSS for styling.
- Use Shadcn UI for components.
- Ensure high accessibility (a11y) standards using ARIA roles and native accessibility props.
- Extract shared UI into reusable components in components/.


# Data Fetching & Forms
- Use TanStack Query (react-query) for frontend data fetching.
- Use React Hook Form for form handling.
- Use Zod for validation.
- Create custom data hooks (e.g., useProjects, useUser) to encapsulate data logic.
- Use useEffect for side effects and unsubscribe in cleanup.

# State Management & Logic
- Use React Context for state management.

# Backend & Database
- Use Supabase for database access.

# Internationalization (i18n)
- Use react-i18next or expo-localization for internationalization and localization.
- Support english and spanish languages and RTL layouts.
- Ensure text scaling and font adjustments for accessibility.
