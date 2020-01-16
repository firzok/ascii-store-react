const PROTOCOL = 'http';

const SERVER_IP = 'localhost';
const PORT = '3000';

export const SERVER_PATH = `${PROTOCOL}://${SERVER_IP}:${PORT}`;

export const ROOT_URL = `${SERVER_PATH}/api`;

export const PRODUCTS_URL = `${ROOT_URL}/products`;
