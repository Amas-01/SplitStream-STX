# Contributing to SplitStream

Thank you for contributing to SplitStream! To ensure consistency and safety, we follow a strict atomic commit workflow.

## Guidelines

- All changes must be made on a separate feature branch.
- Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Pull Requests must be merged into `main` after review. Direct commits to `main` are restricted.
- Every commit must pass linting and tests (Husky pre-commit checks).

## Atomic Workflows

We use a monorepo structure managed by Turborepo. Every PR should aim to be "atomic" — delivering a complete feature or infrastructure layer that compiles and passes CI/CD tests.
