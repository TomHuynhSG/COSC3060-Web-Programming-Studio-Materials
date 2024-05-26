require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet());

// IP restriction middleware
app.use((req, res, next) => {
  const clientIp = req.ip;
  const allowedIp = process.env.ALLOWED_IP;
  
  if (clientIp === allowedIp) {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});