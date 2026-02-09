# Contribution Guidelines

This document outlines how to contribute to the TryOnAR Marketing Website project.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Git
- VS Code (recommended)

### Setup

```bash
# Clone the repository
git clone git@github.com:Linno-io/tryonar-marketing-website.git
cd tryonar-marketing-website

# Install dependencies
pnpm install

if pnpm is not available on your machine, then, 
``
cd apps/studio
npm install
npm run dev

cd apps/web
npm install
npm run dev
``

# Copy environment variables
cp apps/web/.env.example apps/web/.env.local

# Start development servers
pnpm dev
```

## Development Workflow

### Branch Naming

```
feature/    # New features
fix/        # Bug fixes
refactor/   # Code refactoring
docs/       # Documentation
chore/      # Maintenance tasks

# Examples
feature/add-pricing-section
fix/mobile-navigation-overflow
docs/update-deployment-process
```

### Commit Messages

Follow conventional commits:

```
type(scope): description

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no code change)
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance

# Examples
feat(sections): add trust stats section
fix(nav): resolve mobile menu z-index issue
docs: update contribution guidelines
refactor(components): extract shared button styles
```

### Pull Request Process

1. **Create Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**
   - Write code following best practices
   - Add/update tests if needed
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push Branch**
   ```bash
   git push origin feature/my-feature
   ```

5. **Create Pull Request**
   - Use descriptive title
   - Fill out PR template
   - Request reviewers

6. **Address Feedback**
   - Respond to comments
   - Make requested changes
   - Push updates

7. **Merge**
   - Squash and merge preferred
   - Delete branch after merge

## Code Standards

### TypeScript

- Use strict mode
- Define types for all props and data
- Avoid `any` type
- Use interfaces for objects

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

// Avoid
const Button = (props: any) => { ... }
```

### React Components

- Use functional components
- Memoize expensive components
- Follow component structure
- Use proper hooks

```tsx
import { memo } from 'react'
import type { ComponentProps } from '@/lib/types'

interface Props {
  data: ComponentProps
}

function MyComponent({ data }: Props) {
  return <div>{/* ... */}</div>
}

export default memo(MyComponent)
```

### Styling

- Use Tailwind CSS utilities
- Follow mobile-first approach
- Maintain consistent spacing
- Use design tokens

```tsx
// Good
<div className="p-4 md:p-8 lg:p-12">

// Avoid inline styles
<div style={{ padding: '16px' }}>
```

## Adding New Features

### Adding a New Section

1. **Create Schema** (`apps/studio/schemaTypes/`)
   ```typescript
   // newSectionType.ts
   import { defineType, defineField } from 'sanity'

   export const newSectionType = defineType({
     name: 'newSectionType',
     title: 'New Section',
     type: 'object',
     fields: [
       defineField({ name: 'title', type: 'string' }),
       // ... more fields
     ],
   })
   ```

2. **Register Schema**
   ```typescript
   // schemaTypes/index.ts
   export { newSectionType } from './newSectionType'
   ```

3. **Add to Page Schema**
   ```typescript
   // pageType.ts
   sections: [
     // ... existing sections
     { type: 'newSectionType' },
   ]
   ```

4. **Create TypeScript Type** (`apps/web/src/lib/types/`)
   ```typescript
   // section.ts
   export interface NewSection {
     _type: 'newSectionType'
     title: string
   }
   ```

5. **Create Component** (`apps/web/src/components/sections/`)
   ```tsx
   // NewSection.tsx
   import { memo } from 'react'
   import type { NewSection } from '@/lib/types/section'

   function NewSection({ title }: NewSection) {
     return <section>{/* ... */}</section>
   }

   export default memo(NewSection)
   ```

6. **Add to PageRenderer**
   ```tsx
   // PageRenderer.tsx
   case 'newSectionType':
     return <NewSection key={section._key} {...section} />
   ```

7. **Update GROQ Query** (if needed)
   ```groq
   sections[] {
     _type,
     _type == 'newSectionType' => {
       title,
     },
   }
   ```

### Adding a UI Component

1. Create component in `apps/web/src/components/ui/`
2. Export from barrel file if exists
3. Add TypeScript types
4. Document props with JSDoc

```tsx
// components/ui/Card.tsx
interface CardProps {
  /** Card title */
  title: string
  /** Optional description */
  description?: string
  /** Child content */
  children: React.ReactNode
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
      {children}
    </div>
  )
}
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

### Writing Tests

```typescript
// Component test
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders title', () => {
    render(<Card title="Test">Content</Card>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Documentation

### When to Update Docs

- Adding new features
- Changing existing behavior
- Modifying configuration
- Updating dependencies

### Documentation Structure

```
doc/
├── architecture-overview.md
├── schema-overview.md
├── project-overview.md
├── security-guidelines.md
├── ui-ux-guidelines.md
├── best-practices.md
├── performance-optimization.md
├── testing-strategy.md
├── deployment-process.md
└── contribution-guidelines.md
```

## Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Write clear descriptions
- Respond to feedback promptly
- Test your changes thoroughly

### For Reviewers

- Be constructive and respectful
- Focus on code, not people
- Approve once concerns addressed
- Ask questions when unclear

### Review Checklist

- [ ] Code follows project standards
- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] Responsive design works
- [ ] Accessibility maintained
- [ ] Tests pass/added if needed
- [ ] Documentation updated

## Getting Help

### Resources

- Project documentation in `/doc`
- TypeScript types in `/src/lib/types`
- Example components in `/src/components`

### Communication

- Open an issue for bugs
- Use discussions for questions
- Tag maintainers for urgent items

## Release Process

### Version Bump

```bash
# Patch release (bug fixes)
pnpm version patch

# Minor release (new features)
pnpm version minor

# Major release (breaking changes)
pnpm version major
```

### Changelog

Update CHANGELOG.md with:
- New features
- Bug fixes
- Breaking changes
- Migration notes

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Related Documentation

- [Best Practices](./best-practices.md)
- [Testing Strategy](./testing-strategy.md)
- [Deployment Process](./deployment-process.md)
