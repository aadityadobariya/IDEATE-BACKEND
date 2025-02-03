const express = require("express");
const app = express();
const cors = require("cors");
const pageRoutes = require("./routes/page.routes");

const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/pages", pageRoutes);

// dont touch
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
