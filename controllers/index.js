const router = require('express').Router();
const homeRoutes = require('../controllers/homeRoutes');
const userRoutes= require('../controllers/api/userRoutes')

router.use('/', homeRoutes);
router.use('/api',userRoutes);

module.exports = router;
