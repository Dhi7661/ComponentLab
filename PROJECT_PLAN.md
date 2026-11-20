# ComponentLab: Project Plan and Roadmap

Version 1.0 · November 2026

## 1. Project overview

ComponentLab is a reusable React and TypeScript UI component library with an interactive documentation site. Developers can browse components, change their props in a live playground, preview them in light and dark mode, and copy the React and TypeScript code for each one.

The project demonstrates how a professional component library is built: clean component architecture, reusable code, strong TypeScript types, accessibility, tests, and a consistent design system. It should work as a real developer tool that another developer could install and use, not just a set of screenshots.

## 2. Goals and success criteria

The MVP is complete when:

- At least 14 components are built, each with typed props, variants, and states.
- Every interactive component works with the keyboard and passes automated accessibility checks.
- The playground updates the live preview as controls change.
- Code snippets can be copied, and light and dark themes work on every page.
- Unit tests cover the key components, and CI passes on every push.
- The showcase site and Storybook are deployed, and the README lets another developer install and use the library.

## 3. Scope

**In scope for the MVP:** the 14 components listed in Section 4, the showcase site, the live playground, code examples, Storybook, unit and accessibility tests, deployment, and the README.

**Out of scope for the MVP (stretch goals):** publishing to npm, automated changelog generation, components beyond the 14, internationalization, right-to-left layouts, an animation library, and user accounts.

## 4. Component list

| Category | Components | Notes |
| --- | --- | --- |
| Buttons | Button | Variants, sizes, icon, loading, disabled |
| Form elements | Input, Checkbox, Radio group, Select | Labels, errors, keyboard support |
| Modals and dialogs | Dialog, Confirm dialog | Focus trap, Escape to close |
| Data display | Badge, Avatar, Card, Table | Sortable table headers |
| Feedback | Alert, Toast, Tooltip | Live-region announcements |

That is 14 components. Adding a component later is easy once the registry and Button pattern exist, so the list can grow in stretch time.

## 5. Tech stack

| Tool | Purpose |
| --- | --- |
| React and TypeScript | Components, props, hooks, and type safety |
| Vite | Development server, production build, and library build |
| Tailwind CSS | Styling, using the design tokens exported from Stitch |
| Radix UI (recommended) | Headless Select, Dialog, and Tooltip with correct keyboard and focus behavior |
| React Router | Routes for the showcase site |
| Vitest, React Testing Library, jest-dom | Unit and component tests |
| vitest-axe | Automated accessibility checks in tests |
| Storybook | Isolated component previews and documentation |
| ESLint and Prettier | Code quality and formatting |
| GitHub and GitHub Actions | Version control and continuous integration |
| Vercel or Netlify | Hosting the showcase site and Storybook |

## 6. Architecture

### Folder structure

```
componentlab/
├── .github/workflows/      # CI and deploy pipelines
├── .storybook/
├── public/
├── src/
│   ├── components/
│   │   ├── buttons/
│   │   ├── forms/
│   │   ├── overlays/
│   │   ├── feedback/
│   │   └── data-display/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── registry/           # component metadata for the playground and docs
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.ts            # public exports for the library
├── tests/
├── CONVENTIONS.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── package.json
```

### Key decisions

- **Component registry.** Each component has one metadata entry that lists its name, category, props, variants, and example code. The playground, props table, code snippet, and Storybook all read from this single source, so information is never duplicated.
- **Consistent component API.** Every component forwards its ref, accepts a `className` prop for overrides, and uses the same names for shared props (`variant`, `size`, `disabled`, `loading`). Each component exports its prop types.
- **Theme.** A `ThemeProvider` adds a `dark` class to the root element, saves the choice in localStorage, and follows the system preference by default.
- **Styling.** Each component maps its variants to Tailwind classes in one place. A `cn()` helper merges class names.
- **Library and site.** The `src/components` folder is the library. The showcase site in `src/pages` and `src/layouts` consumes it, which proves the library works in a real app.

## 7. Git workflow

### Branch model

- `main` always holds working code. Changes reach it only through merged phase branches.
- Each phase gets its own branch, named `phase/NN-name`, such as `phase/03-button`.
- Each completed feature gets its own commit, which includes its tests and registry entry.
- Each phase branch merges into `main` through a pull request titled with the phase name, using a merge commit so the phase history stays visible.
- Tag `main` at the MVP release: `v0.1.0`.

### Commit messages

Use Conventional Commits in the form `type(scope): short description`.

- Types: `feat`, `fix`, `test`, `docs`, `style`, `refactor`, `chore`, `ci`.
- Examples: `feat(button): add variants and sizes`, `test(dialog): verify focus returns to trigger on close`, `ci: add lint and test workflow`.
- Write descriptions in the present tense and keep each commit to one feature.

### Commit rules

- Commit only when lint, type checks, and tests all pass.
- Never commit `node_modules`, `.env` files, or secrets.

### Phase workflow

```bash
git checkout main
git pull
git checkout -b phase/03-button

# build a feature, then commit it
git add .
git commit -m "feat(button): add base component"

# repeat for each feature, then publish the branch
git push -u origin phase/03-button
# open a pull request into main and merge it
```

### Phase completion steps

1. Every feature in the phase is committed and pushed.
2. Lint, type checks, tests, and the build pass on CI.
3. A pull request into `main` is opened and titled `Phase N: name`, and it is checked against the phase's done criteria.
4. The pull request is merged with a merge commit.
5. The phase branch is deleted locally and on GitHub.

## 8. Definition of done

**Feature is done when:** its props are typed, its variants and states work, it can be used with the keyboard, its tests pass, its registry entry exists, lint and type checks are clean, and it is committed.

**Phase is done when:** every feature is committed, the phase's done criteria in Section 10 are met, the pull request is merged into `main`, and the branch is deleted.

**MVP is done when:** all phases are merged, the site and Storybook are deployed, the README is complete, and `v0.1.0` is tagged on `main`.

## 9. Recommended improvements

### Decide before building

1. **Keep the 14-component limit.** The spec already says quality matters more than count. New ideas go to the stretch list.
2. **Build a real library entry point.** Export everything from `src/index.ts` and set up Vite library mode. This is what makes the project usable by other developers.
3. **Use one component registry.** It removes the risk of the playground, props table, code snippet, and Storybook drifting apart.
4. **Use Radix UI for Select, Dialog, and Tooltip.** Focus management, keyboard navigation, and positioning take days to get right. Write `useFocusTrap` yourself, since custom hooks are one of your target skills.
5. **Set a measurable accessibility target.** Aim for WCAG 2.2 AA, and verify it with vitest-axe in tests and keyboard-only tests for interactive components.
6. **Enforce the commit convention automatically.** Add commitlint with Husky so commits that break the format are rejected.
7. **Lock the design tokens before Button.** Stitch output can drift between screens, so finalize the color, type, spacing, and radius values in Phase 2 before any component uses them.
8. **Write CONVENTIONS.md before any code.** It defines naming, ref forwarding, class merging, and file layout. It also gives an AI tool such as Antigravity clear rules to follow.

### Improve during the build

9. **Build one component at a time.** If an AI tool generates everything at once, you can't explain the architecture in interviews, and the commit history stops showing your work. Review each diff before committing.
10. **Use Storybook for states and the showcase for the product.** Keep the playground in the showcase site and use Storybook to document states. Avoid building the same interactive demo twice.
11. **Lazy-load showcase pages** with `React.lazy`, so the site loads quickly.
12. **Add community files:** `CONTRIBUTING.md` and an MIT license. They signal that the project is ready for others to use.

## 10. Full roadmap

Each feature line is one build topic and one commit. Split a large feature into smaller topics if you need more topics for Antigravity.

### Phase 0: Planning and decisions

**Branch:** `main` for the initial commit, then `phase/00-planning`

- chore: create GitHub repository with README and .gitignore (initial commit on `main`)
- docs: add project plan
- docs: add CONVENTIONS.md

**Done when:** the 14-component list is locked, and the plan and conventions are merged.

### Phase 1: Project setup

**Branch:** `phase/01-setup`

- chore: scaffold Vite React TypeScript project
- chore: add Tailwind CSS with the Vite plugin
- chore: configure Vitest, Testing Library, and jsdom
- chore: add ESLint and Prettier
- chore: create the folder structure and `src/index.ts`
- ci: add GitHub Actions workflow for lint, test, and build

**Done when:** `npm run dev`, lint, tests, and build all pass locally and on CI.

### Phase 2: Design foundation

**Branch:** `phase/02-design-foundation`

- feat(theme): add Stitch design tokens to the Tailwind config
- feat(utils): add the `cn()` class-merging helper
- feat(types): add shared `Variant` and `Size` types
- feat(registry): add the component registry schema
- feat(theme): add ThemeProvider with light and dark modes
- test(theme): verify the theme persists across reloads

**Done when:** tokens appear on a test page, and the theme toggles and persists.

### Phase 3: Button (the template)

**Branch:** `phase/03-button`

- feat(button): add base component with ref forwarding
- feat(button): add variants and sizes
- feat(button): add icon slot
- feat(button): add loading and disabled states
- test(button): cover clicks, disabled behavior, and loading announcement
- feat(registry): add Button entry

**Done when:** every state is tested and focus is visible. Every later component follows this pattern.

### Phase 4: Form elements

**Branch:** `phase/04-form-elements`

- feat(input): add label, helper text, and error state
- feat(checkbox): add checked, indeterminate, and disabled states
- feat(radio-group): add arrow-key navigation
- feat(select): build on Radix Select
- test(forms): verify labels, error announcements, and keyboard use
- feat(registry): add form entries

**Done when:** every field has a label, errors are announced, and every control works with the keyboard.

### Phase 5: Data display

**Branch:** `phase/05-data-display`

- feat(badge): add tone variants
- feat(avatar): add image with initials fallback and alt text
- feat(card): add header, body, and footer slots
- feat(table): add sortable headers with `aria-sort`
- test(table): verify sort order and `aria-sort` updates
- feat(registry): add data display entries

**Done when:** the table sorts correctly, and header sort state is announced to assistive technology.

### Phase 6: Overlays

**Branch:** `phase/06-overlays`

- feat(hooks): add `useFocusTrap`
- feat(dialog): build on Radix Dialog
- feat(confirm-dialog): add confirm and cancel actions built on Dialog
- test(dialog): verify Escape closes the dialog and focus returns to the trigger
- feat(registry): add overlay entries

**Done when:** dialogs trap focus, close with Escape, and return focus correctly.

### Phase 7: Feedback

**Branch:** `phase/07-feedback`

- feat(alert): add info, success, warning, and error tones
- feat(toast): add provider, `useToast` hook, queue, and auto-dismiss
- feat(tooltip): build on Radix Tooltip with keyboard focus support
- test(toast): verify `aria-live` announcements
- feat(registry): add feedback entries

**Done when:** toasts announce themselves, and tooltips appear on keyboard focus.

### Phase 8: Showcase shell

**Branch:** `phase/08-showcase-shell`

- feat(router): add routes for the home page, component index, and component pages
- feat(layout): add top bar and sidebar
- feat(home): add landing page with category cards
- feat(components-index): add search and category filters
- feat(layout): add responsive mobile navigation

**Done when:** every route renders and navigation works on mobile and desktop.

### Phase 9: Component page and playground

**Branch:** `phase/09-playground`

- feat(playground): generate controls from the registry
- feat(preview): add light and dark and width toggles
- feat(props-table): render props from the registry
- feat(code-snippet): add copy-to-clipboard
- feat(component-page): combine preview, playground, code, and props
- test(playground): verify that controls update the preview

**Done when:** every component page works end to end.

### Phase 10: Storybook

**Branch:** `phase/10-storybook`

- chore: set up Storybook
- docs: add stories for buttons, form elements, data display, overlays, and feedback
- docs: enable autodocs for props tables

**Done when:** every component has stories for each of its states.

### Phase 11: Quality and accessibility

**Branch:** `phase/11-quality`

- test: add vitest-axe checks to every component
- test: add unit tests for hooks and utilities
- fix: resolve accessibility issues found by axe
- test: add keyboard-only tests for overlays and forms

**Done when:** axe reports no violations, and the key components have tests for their states and keyboard use.

### Phase 12: Polish, documentation, and deployment

**Branch:** `phase/12-release`

- style: fix responsive and dark mode issues
- docs(readme): add install steps, usage examples, screenshots, and live links
- docs: add CONTRIBUTING.md and LICENSE
- ci: add deploy workflow for the showcase site and Storybook
- chore(release): set version to 0.1.0

**Done when:** the live site and Storybook are deployed, the README is complete, and `v0.1.0` is tagged on `main`.

### Stretch: Publishing

**Branch:** `phase/13-publish`

- ci: add npm publish workflow
- docs: add CHANGELOG.md

## 11. Timeline

**Full-time, 3 to 4 days:** Day 1 covers Phases 0 to 3. Day 2 covers Phases 4 and 5. Day 3 covers Phases 6 to 8. Day 4 covers Phases 9 to 12. This only works if the component list stays at 14.

**Part-time, 2 to 3 weeks:** plan roughly one phase every one to two days.

## 12. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Scope grows beyond 14 components | Keep new ideas on the stretch list |
| Radix or Tailwind setup issues | Verify the setup in Phase 1 and Phase 4 before building on it |
| Stitch output is inconsistent | Lock the design tokens in Phase 2 |
| AI tool generates too much code at once | Build one component per commit and review each diff |
| Accessibility regressions | Run vitest-axe in CI on every push |
| Running out of time before Phase 12 | Cut components, not deployment and documentation |

## 13. Final deliverables checklist

- [ ] Live showcase site
- [ ] 14 typed and tested components
- [ ] Live playground
- [ ] Code examples with copy button
- [ ] Storybook deployed
- [ ] Unit and accessibility tests running in CI
- [ ] README with install steps, usage, and screenshots
- [ ] `v0.1.0` tagged on `main`
