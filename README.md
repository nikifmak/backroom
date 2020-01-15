# Migrations Sequelize

## Create Migration

`sequelize migration:create --name addcolumn-updatedAt-event-table`

## Run Migration

npx sequelize-cli db:migrate

npx sequelize-cli model:generate --name Supplier --attributes name:string,url:string

npx sequelize-cli model:generate --name Item --attributes name:string,code:string

npx sequelize-cli model:generate --name Event --attributes origin:string,data:string,type:string

```
SELECT
	setval('suppliers_id_seq', COALESCE((
			SELECT
				MAX(id) + 1 FROM suppliers), 1), FALSE);
```

# Elastic bean stalk commands

## `eb console`

opens on browser the instance console

## `eb deploy -m "added michalis+dimos"`

Deploys the new code from the current folder to the available instances

## `eb logs`

Tails the latest logs

## `eb scale`

Adds a new instance
