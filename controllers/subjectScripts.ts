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
exports.getStudentsOfSubject = async function (req, res){
    let s = req.params.id;
    let subject = await Subject.findOne({_id:s});
    let st = await Student.find({}, {name:1});
    let students = await Subject.findOne({ _id:s },{ _id:0, students:1 }).populate('students', '', null, { sort: { 'modificationDate': -1 } });
    let decimal: number = 0;
    if(subject) {
        students.students.forEach(x => {
            st.forEach(a => {
                console.log('a', a._id);
                if (x.name == a.name) {
                    st.splice(decimal, 1);
                    console.log('st2:', st);
                    decimal++;
                } else {
                    console.log('porque no entras');
                    decimal++;
                }
            });
            decimal = 0;
        });
        res.status(200).send({subject: subject, st});
    }else {
        res.status(424).send({message: 'Subject not found'});
    }
}
exports.getSubjectById = async function (req, res){
    let s = req.params.id;
    let subject = await Subject.findOne({_id:s});
    let students = await Subject.findOne({ _id:s },{ _id:0, students:1 }).populate('students', '', null, { sort: { 'modificationDate': -1 } });
    if(subject) {
           res.status(200).send({subject: subject, students});
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


