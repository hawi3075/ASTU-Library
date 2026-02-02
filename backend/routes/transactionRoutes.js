const express = require('express');
const router = express.Router();
const { issueBook, returnBook, getMyLoans } = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/issue', protect, admin, issueBook);
router.put('/return/:id', protect, admin, returnBook);
router.get('/my-history', protect, getMyLoans);

module.exports = router;