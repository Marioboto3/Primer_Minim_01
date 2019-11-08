'use strict';
export {};

require('../models/Subject');
require('../models/Student');
let mongoose = require('mongoose');
let Subject = mongoose.model('Subject');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

exports.addSubject = async function (req, res){
    let subject = req.body;
    console.log("sub: ", subject);
    let newSubject = new Subject(subject);
    let result = await newSubject.save();
    res.status(200).send(result);
};

exports.addStudentToSubject = async function (req, res){

    let subjectId = req.body.subjectId;
    let studentId = req.body.studentId;
    console.log('Subject Id: '+subjectId);
    console.log('Student Id: '+ studentId);

    let student = await Student.findOne({_id: studentId});
    if (!student) {
        return res.status(404).send({message: 'Student not found'})
    } else {
        let subjectUpdated = await Subject.findOne({_id: subjectId});
        if(!subjectUpdated)
            return res.status(404).send({message: 'Subject not found'});
        else {
            await Subject.updateOne({_id: subjectId}, {$addToSet: {students: studentId}})
        }
    }
    return res.status(200).send({message: 'Student added successfully'});


};

exports.getSubjectById = async function (req, res){
    let s = req.params.id;
    console.log("s:",s);
    let subject = await Subject.findOne({_id:s});
    console.log("es: ", subject)
    if(subject) {
        res.status(200).json(subject);
    } else {
        res.status(424).send({message: 'Subject not found'});
    }
};

exports.getAllSubjects = async function (req, res){
    let subjects =await Subject.find()
    .populate('students');
    if(subjects) {
        res.status(200).json(subjects);
    } else {
        res.status(424).send({message: 'Subjects not found'});
    }
};


