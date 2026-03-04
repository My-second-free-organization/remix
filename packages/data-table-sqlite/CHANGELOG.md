# `data-table-sqlite` CHANGELOG

This is the changelog for [`data-table-sqlite`](https://github.com/remix-run/remix/tree/main/packages/data-table-sqlite). It follows [semantic versioning](https://semver.org/).

## v0.2.0

### Minor Changes

- Add support for executing both data manipulation operations and data migration operations in the sqlite adapter (`execute` for `DataManipulationOperation`, `migrate` for `DataMigrationOperation`), including adapter-level DDL execution support for migrations.

  SQL compilation remains adapter-owned while sharing common helpers from `remix/data-table/sql-helpers`.

- Add support for migration transaction tokens in adapter introspection hooks.
  `hasTable(table, transaction?)` and `hasColumn(table, column, transaction?)` now accept a transaction token, validate it, and execute against the migration transaction when provided.

### Patch Changes

- Bumped `@remix-run/*` dependencies:
  - [`data-table@0.2.0`](https://github.com/remix-run/remix/releases/tag/data-table@0.2.0)

## v0.1.0

### Minor Changes

- Initial release of `@remix-run/data-table-sqlite`.

### Patch Changes

- Bumped `@remix-run/*` dependencies:
  - [`data-table@0.1.0`](https://github.com/remix-run/remix/releases/tag/data-table@0.1.0)

## v0.1.0

### Minor Changes

- Initial release.
