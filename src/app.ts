import { env } from './config/env.adapter';
import { Server } from './presentation/server'

main();

async function main() {

    const server = new Server({
        port: env.PORT
    });

    server.start();
}