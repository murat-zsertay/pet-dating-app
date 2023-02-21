module.exports = {
  apps: [
    {
      script: "./bin/launcher.js",
      watch: ".",
      "env.test.local": {
        NODE_ENV: "test",
      },
      "env.production.local": {
        NODE_ENV: "production",
      },
      "env.development.local": {
        NODE_ENV: "development",
      },
    },
  ],
};
