const express = require('express');
const router = express.Router();
const { 
    issueBook, 
    returnBook, 
    getMyLoans, 
    getAllTransactions, 
    deleteTransaction 
} = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my-history', protect, getMyLoans);
router.post('/issue', protect, admin, issueBook);
router.put('/return/:id', protect, admin, returnBook);
router.get('/all', protect, admin, getAllTransactions); // Check this line!
router.delete('/:id', protect, admin, deleteTransaction);

module.exports = router;