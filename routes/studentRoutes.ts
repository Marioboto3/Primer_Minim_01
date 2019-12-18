import express = require('express');
let router: express.Router = express.Router();

let studentScripts = require('../controllers/studentScripts');
let subjectScript = require('../controllers/subjectScripts');

router.get('/get/:id', studentScripts.getStudentById);
router.get('/get', studentScripts.getAllStudents);
router.post('/add', studentScripts.addStudent);
router.get('/get/studies/telecos', studentScripts.getStudentById);


module.exports = router;
