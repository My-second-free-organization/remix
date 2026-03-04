# `data-table-postgres` CHANGELOG

This is the changelog for [`data-table-postgres`](https://github.com/remix-run/remix/tree/main/packages/data-table-postgres). It follows [semantic versioning](https://semver.org/).

## v0.2.0

### Minor Changes

- Add support for executing both data manipulation operations and data migration operations in the postgres adapter (`execute` for `DataManipulationOperation`, `migrate` for `DataMigrationOperation`), including adapter-level migration locking support.

  SQL compilation remains adapter-owned while sharing common helpers from `remix/data-table/sql-helpers`.

- Add support for migration transaction tokens in adapter introspection hooks.
  `hasTable(table, transaction?)` and `hasColumn(table, column, transaction?)` now use the provided migration transaction client when present.

### Patch Changes

- Bumped `@remix-run/*` dependencies:
  - [`data-table@0.2.0`](https://github.com/remix-run/remix/releases/tag/data-table@0.2.0)

## v0.1.0

### Minor Changes

- Initial release of `@remix-run/data-table-postgres`.

### Patch Changes

- Bumped `@remix-run/*` dependencies:
  - [`data-table@0.1.0`](https://github.com/remix-run/remix/releases/tag/data-table@0.1.0)

## v0.1.0

### Minor Changes

- Initial release.
