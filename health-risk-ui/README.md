# HealthRiskUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── auth.interceptor.ts
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── assessment.service.ts
│   │   └── patient.service.ts
│   └── layout/
│       ├── header/
│       └── footer/
├── features/
│   ├── assessment/
│   │   ├── assessment-form/
│   │   └── assessment-results/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   └── dashboard/
├── shared/
│   ├── components/
│   │   ├── risk-meter/
│   │   └── loading-spinner/
│   ├── models/
│   └── utils/
└── app.config.ts

# Core components
ng g c core/layout/header --skip-tests --standalone
ng g c core/layout/footer --skip-tests --standalone

# Feature modules
ng g c features/assessment/assessment-form --skip-tests --standalone
ng g c features/assessment/assessment-results --skip-tests --standalone
ng g c features/patient/patient-profile --skip-tests --standalone

# Shared components
ng g c shared/components/risk-meter --skip-tests --standalone
ng g c shared/components/loading-spinner --skip-tests --standalone

# Generate services
ng g s core/services/api --skip-tests
ng g s core/services/assessment --skip-tests
ng g s core/services/patient --skip-tests

# Generate Models

Create model files manually in shared/models/
 assessment.model.ts
 patient.model.ts
 risk-result.model.ts