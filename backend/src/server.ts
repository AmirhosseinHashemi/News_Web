import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on port ${PORT}`);
});
