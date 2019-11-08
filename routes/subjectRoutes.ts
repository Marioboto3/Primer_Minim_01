import express = require('express');
let router: express.Router = express.Router();

let subjectScripts = require('../controllers/subjectScripts');

router.get('/get', subjectScripts.getAllSubjects);
router.get('/get/:id', subjectScripts.getSubjectById);
router.post('/add', subjectScripts.addSubject);
router.post('/addNew', subjectScripts.addStudentToSubject);

module.exports = router;
