import { app } from "./app.js";
import './database/db.js'
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running successfully on PORT: ${PORT}`);
})