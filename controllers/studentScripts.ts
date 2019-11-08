'use strict';
export {};

require('../models/Student');
require('../models/Subject');
let mongoose = require('mongoose');
let Student = mongoose.model('Student');
let Subject = mongoose.model('Subject');
let ObjectId = require('mongodb').ObjectID;

exports.addStudent = async function (req, res){
    console.log("Req: ",req.body);
    let student = req.body;
    let newStudent = new Student(student);
    let result = await newStudent.save();
    if(result){
        res.status(200).send(result);
    }
    else{
        res.status(400).send(result);
    }
}
exports.getStudentById = async function (req, res){
    let s = req.params.id;
    console.log("s:",s);
    let student = await Student.findOne({_id:s});
    console.log("es: ",student)
    if(student) {
        res.status(200).json(student);
    } else {
        res.status(424).send({message: 'Student not found'});
    }
};

exports.getAllStudents = async function (req, res) {
    let students = await Student.find();
    res.status(200).json(students);
};
