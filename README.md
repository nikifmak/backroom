## Run Migration
npx sequelize-cli db:migrate

npx sequelize-cli model:generate --name Supplier --attributes name:string,url:string

npx sequelize-cli model:generate --name Item --attributes name:string,code:string

```
SELECT
	setval('suppliers_id_seq', COALESCE((
			SELECT
				MAX(id) + 1 FROM suppliers), 1), FALSE);
```
