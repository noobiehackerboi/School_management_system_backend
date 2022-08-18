const mongoose = require('mongoose')
const userAdminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: [true, "can't be blank"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    }
})
const userStaffSchema = new mongoose.Schema({
    staff_id: {
        // staff_id will be of format :
        // "SCH/CL/xxxx" (CL represents cleaning staff)
        // "SCH/TH/xxxx" (TH represents teaching staff)
        type: String,
        required: [true, "can't be blank"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true
    }
})
const userStudentSchema = new mongoose.Schema({
    student_id: {
        // student_id will be of format
        // 2022 represents admission year
        // "2022/xxxx"
        type: String,
        required: [true, "can't be blank"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true
    }
})
const noticeSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "can't be blank"],
    },
    body: {
        type: String,
        required: [true, "can't be blank"]
    },
    date: {
        type: Date,
        required: [true, "can't be blank"]
    }
})
const userAdmin = mongoose.model('admin', userAdminSchema, 'admin');
const userStaff = mongoose.model('staff', userStaffSchema, 'staffs');
const userStudent = mongoose.model('student', userStudentSchema, 'students');
const userNotices = mongoose.model('notice', noticeSchema, 'notices')

// Exporting our model objects
module.exports = {
    userAdmin, userStaff, userStudent, userNotices
}