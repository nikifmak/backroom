npx sequelize-cli db:migrate
npx sequelize-cli model:generate --name Supplier --attributes name:string,url:string
npx sequelize-cli model:generate --name Item --attributes name:string,code:string
