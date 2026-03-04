# `data-table` CHANGELOG

This is the changelog for [`data-table`](https://github.com/remix-run/remix/tree/main/packages/data-table). It follows [semantic versioning](https://semver.org/).

## v0.2.0

### Minor Changes

- BREAKING CHANGE: Rename adapter operation contract names/fields (`AdapterStatement` -> `DataManipulationOperation`, `statement` -> `operation`).

  Add separate adapter execution methods for DML and migration/DDL operations: `execute` (DML operations) and `migrate` (migration/DDL operations).

  Add adapter introspection methods with optional transaction context: `hasTable(table, transaction?)` and `hasColumn(table, column, transaction?)`.

- BREAKING CHANGE: Rename the top-level table-definition helper from `createTable(...)` to `table(...)`, move table definitions to column-builder inputs, add table-level `validate({ operation, tableName, value })`, remove `~standard` table-schema compatibility and `getTableValidationSchemas(...)`, and stop runtime predicate-value validation/coercion.

- Add a first-class migration system under `remix/data-table/migrations` with `createMigration`, chainable `column` builders, schema/table migration planners, migration registry/runner APIs, and optional Node file discovery from `remix/data-table/migrations/node`.

  Migration callbacks now use split handles: `{ db, schema }`.

  - `db` is the immediate data runtime (`query/create/update/delete/exec/transaction`)
  - `schema` owns migration/schema operations (`createTable/alterTable/createIndex/...`, `plan`, `hasTable`, `hasColumn`)

  Migration-time DDL, DML, and introspection now share the same transaction token when migration transactions are enabled. In `dryRun`, schema introspection (`schema.hasTable` / `schema.hasColumn`) reads live adapter/database state and does not simulate pending dry-run operations.

  Keep SQL compilation adapter-owned and expose shared SQL compiler helpers from `remix/data-table/sql-helpers`.

- Add optional table lifecycle callbacks for write/delete/read flows: `beforeWrite`, `afterWrite`, `beforeDelete`, `afterDelete`, and `afterRead`.

## v0.1.0

### Minor Changes

- Add support for cross-schema column resolution

- Initial release of `@remix-run/data-table`.

- Make `createTable()` results Standard Schema-compatible so tables can be used directly with `parse()`/`parseSafe()` from `remix/data-schema`.

  Table parsing now mirrors write validation semantics used by `create()`/`update()`: partial objects are accepted, provided values are parsed via column schemas, and unknown columns are rejected.

### Patch Changes

- Bumped `@remix-run/*` dependencies:
  - [`data-schema@0.1.0`](https://github.com/remix-run/remix/releases/tag/data-schema@0.1.0)

## v0.1.0

### Minor Changes

- Initial release.
