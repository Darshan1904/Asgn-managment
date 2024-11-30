import app from './app';
import config from './config/default';
import { connectToDatabase } from './utils/database';

// Start the server
const startServer = async () => {
    await connectToDatabase();
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });
};

startServer();