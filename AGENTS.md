# AGENTS.md

## Snapshot
- Stack: Laravel 13 (PHP 8.3) + Inertia.js + React 19 + TypeScript + Vite + Tailwind v4.
- Main app flow is server-driven page rendering (`Inertia::render`) with typed client pages in `resources/js/pages`.
- Auth and security are Fortify-driven; route and form helpers are generated via Wayfinder into `resources/js/routes` and `resources/js/actions`.
- Public portfolio contact submissions are handled by `POST /contact` (`ContactController@store`) and persisted in `contacts` before sending `ContactFormMail`.

## Architecture You Need First
- HTTP entry is configured in `bootstrap/app.php` with web middleware including `HandleAppearance`, `HandleInertiaRequests`, and preloaded asset headers.
- Shared Inertia props come from `app/Http/Middleware/HandleInertiaRequests.php` (`name`, `auth.user`, `sidebarOpen`) and are typed in `resources/js/types/global.d.ts`.
- Routes are split across `routes/web.php` and `routes/settings.php`; settings pages map to controllers under `app/Http/Controllers/Settings` and TSX pages under `resources/js/pages/settings`.
- Fortify views are overridden to Inertia pages in `app/Providers/FortifyServiceProvider.php` (login/register/reset/2FA/verify flows).
- Security behavior (2FA availability + password-confirm gate) is centralized in `SecurityController` and Fortify feature flags (`config/fortify.php`).
- Contact flow is non-Inertia JSON: `resources/js/components/ContactForm.tsx` posts to `/contact`, `app/Http/Controllers/ContactController.php` validates + stores `App\Models\Contact`, then sends `App\Mail\ContactFormMail`.

## Frontend Patterns (Project-Specific)
- Prefer generated route/action helpers in React (example: `ProfileController.update.form()` in `resources/js/pages/settings/profile.tsx`); current exception is `resources/js/components/ContactForm.tsx`, which uses `fetch('/contact')` with the CSRF meta token.
- Layouts are selected by page path in `resources/js/app.tsx` (`auth/*` -> `AuthLayout`, `settings/*` -> `[AppLayout, SettingsLayout]`).
- Settings pages expose breadcrumbs via static `Page.layout` metadata (see `resources/js/pages/settings/profile.tsx`).
- Use the `@/*` alias (configured in `tsconfig.json`) for app imports.
- Theme state persists in both `localStorage` and cookie via `resources/js/hooks/use-appearance.tsx`; SSR reads cookie via `HandleAppearance` and `resources/views/app.blade.php`.

## Generated/Managed Files
- Treat `resources/js/routes/**`, `resources/js/actions/**`, and `resources/js/wayfinder/**` as generated artifacts from Wayfinder tooling.
- Evidence: ESLint ignores these paths in `eslint.config.js`; app code imports them but should not duplicate their logic.
- Prefer editing PHP routes/controllers and consuming generated TS helpers rather than modifying generated files directly.

## Developer Workflows
- Initial setup (installs deps, env, key, migrate, frontend build):
  - `composer setup`
- Full local dev stack (server + queue listener + pail logs + Vite concurrently):
  - `composer dev`
- Frontend production builds:
  - `npm run build`
  - `npm run build:ssr`
- Backend tests with formatting gate:
  - `composer test`
- Frontend quality checks:
  - `npm run lint:check`
  - `npm run format:check`
  - `npm run types:check`
- CI-style combined checks are scripted in `composer ci:check`.

## Testing and Debugging Signals
- Feature tests use `RefreshDatabase` and route-name assertions (examples in `tests/Feature/Settings/SecurityTest.php`, `tests/Feature/Auth/AuthenticationTest.php`).
- Fortify-dependent tests use `skipUnlessFortifyHas(...)` from `tests/TestCase.php`.
- Telescope is enabled by default (`config/telescope.php`) and mounted on `/telescope`; use it for request/query/job introspection.

## Integration Boundaries
- Auth, password reset, verification, and 2FA endpoints come from Fortify and are consumed through generated helpers.
- Inertia page contracts are backend-defined props; changing controller props requires matching TS page prop updates.
- Route names are part of contract across PHP tests, controllers, and generated TS route helpers; keep names stable when possible.
- Contact submissions cross backend and mail boundaries: route name `contact.store` in `routes/web.php`, persistence in `contacts` (`database/migrations/2026_04_20_000000_create_contacts_table.php`), and outbound email via `ContactFormMail`.

