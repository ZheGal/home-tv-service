import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'admin',
    password: 'password',
    database: 'hometv',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    }
};

export default config;