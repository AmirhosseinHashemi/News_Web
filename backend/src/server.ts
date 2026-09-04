import "dotenv/config";

import app from "./app.js";

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on port ${PORT}`);
});
