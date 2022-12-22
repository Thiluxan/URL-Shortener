const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/health",require("./routes/health"))

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => console.log("Application Started on ",PORT))