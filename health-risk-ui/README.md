# HealthRiskUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further info


src/app/
├── core/
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── assessment.service.ts
│   │   └── patient.service.ts
│   └── interceptors/
│       └── auth.interceptor.ts
├── features/
│   ├── assessment/
│   │   ├── assessment-form/
│   │   └── assessment-results/
│   └── patient/
│       └── patient-profile/
├── shared/
│   ├── components/
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

# Generate Services
ng g s core/services/api --skip-tests
ng g s core/services/assessment --skip-tests
ng g s core/services/patient --skip-tests

# Generate models
 Create model files manually in shared/models/
 assessment.model.ts
 patient.model.ts
 risk-result.model.ts