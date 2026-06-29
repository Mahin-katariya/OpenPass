import { app } from "./app.js";
import './database/db.js';
import 'dotenv/config';
import { ensureKeys } from "./services/key.service.js";

ensureKeys();

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running successfully on PORT: ${PORT}`);
})