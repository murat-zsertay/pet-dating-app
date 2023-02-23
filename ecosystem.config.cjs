module.exports = {
  apps : [{
    name:"Express backend",
    script: 'app.js',
    cwd:"./backend",
    watch: '.',
    "env_test": {
      NODE_ENV: "test",
      JWT_SECRET:"SUPER_SECRET",
      PORT:8080,
      MONGODB_URL:"mongodb://0.0.0.0:27017/pet_test"
    },
    "env_production": {
      NODE_ENV: "production",
    },
    "env_development": {
      NODE_ENV: "development",
      JWT_SECRET:"SUPER_SECRET",
      MONGODB_URL:"mongodb://0.0.0.0:27017/pet_development",
      PORT:8080
    }
  },
    {
    name:"React Frontend",
    cwd:"./frontend",
    script: 'npm',
    args: "run start",
    watch: '.',
    "env_development": {
      NODE_ENV: "development",
      JWT_SECRET:"SUPER_SECRET"
    },
    "env_test": {
      NODE_ENV: "test",
      JWT_SECRET:"SUPER_SECRET"
    },
    "env_production": {
      NODE_ENV: "production",
    },
  }],

};
