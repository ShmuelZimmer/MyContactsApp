const router = require("express").Router();
const controller = require("../controllers/contactController");

router.post('/:email', controller.getAllContacts); 
router.post('/add/:email', controller.addContact);
router.post('/delete/:email', controller.deleteContact)

module.exports = router