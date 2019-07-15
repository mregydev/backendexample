module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
};
