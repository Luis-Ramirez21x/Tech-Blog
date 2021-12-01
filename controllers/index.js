const router = require('express').Router();
const homeRoutes = require('../controllers/homeRoutes');

router.use('/', homeRoutes);

module.exports = router;
