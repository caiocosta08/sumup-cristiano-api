import { server } from './app';
require('dotenv').config();

const PORT = 3005;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - ${new Date()}`);
});