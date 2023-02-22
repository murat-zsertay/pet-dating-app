import {app} from "../app.js";
import debug from "debug";

debug("pet:server")
export const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
export const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof process.env.PORT === "string" ? "Pipe " + process.env.PORT : "Port " + process.env.PORT;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
export const onListening = () => {
    let server = app.listen()
    const {address, port} = server.address();
    const hostname = address === "::" ? 'localhost' : address
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server listening on http://${hostname}:${process.env.PORT}`);
    const bind = typeof hostname === "string" ? "pipe " + hostname : "port " + hostname.port;
    console.log("Now listening on " + bind);
    debug("Listening on " + bind);
}