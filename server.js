import app from './app.js';
import { checkDBConnection } from './src/config/dbCheck.js';
import initialiseDB from './src/database/initialiseDB.js';

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        
        await checkDBConnection();
        // await initialiseDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Server failed to start:', error);
    }
})();
