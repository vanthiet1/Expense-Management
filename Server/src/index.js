const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connectDB');
const app = express();


// Middleware
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB();



const authRouter = require('./routers/authRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const subCategoriesRouter = require('./routers/subCategories');
const bubgetRouter = require('./routers/budgetRouter');
const spendingRouter = require('./routers/spendingRouter');




app.use('/api/v1', authRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/subcategories', subCategoriesRouter);
app.use('/api/v1/budget', bubgetRouter);
app.use('/api/v1/spending', spendingRouter);







// Default route
app.get('/', (req, res) => {
    res.send("Welcome To Api");
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
