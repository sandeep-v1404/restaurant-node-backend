import { Sequelize } from "sequelize";

const { PG_USER, PG_PASSWORD, PG_DB, PG_HOST, PG_PORT } = process.env;

const url = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`;

export const sequelize = new Sequelize(url, {
  logging: false,
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log(`PostgreSQL connected`);
  } catch (err) {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  }
};
