import { configDotenv } from 'dotenv';
import { existsSync } from 'fs';

let env = null, envPath = null;

if (!process.env.NODE_ENV) {
    console.warn('-> "process.env.NODE_ENV" is not defined, it will be set the default value: "development".');
    process.env.NODE_ENV = 'development';
}

// Available Environment Paths
const availableEnvPaths = [
    { env: process.env.NODE_ENV, envPath: `./env/.env.${process.env.NODE_ENV}.local` },
    { env: 'development', envPath: './env/.env' },
    { env: 'development', envPath: './env/.env.local' },
    { env: 'development', envPath: './env/.env.test.local' },
];

for (const item of availableEnvPaths) {
    if (existsSync(item.envPath)) {
        env = item.env;
        envPath = item.envPath;
        break;
    }
}

if (env) {
    console.log(`-> Environment: ${env}`);
    configDotenv({ path: envPath as string });
}
else {
    throw new Error('-> Dotenv environment files are not found !');
}