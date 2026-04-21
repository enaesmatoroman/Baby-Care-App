// server/server.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const port = 3001;
require('./db/schemes/userScheme');
require('./db/schemes/babyLogScheme');
require('./db/schemes/activityScheme');
const babyLogRoutes = require('./routes/baby-logs');
const activityRoutes = require('./routes/activities');
const authRoutes = require('./routes/auth');


app.use(express.json());
app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/baby-logs', babyLogRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
