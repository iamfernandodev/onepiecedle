import app from './app';
import sendLog from './utils/sendLog';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => sendLog({
    color: 'green',
    message: `Server running.`
}));