const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { userAdmin, userStaff, userStudent, userNotices } = require('../models/models')
const mongoose = require('mongoose')

const db = "mongodb+srv://useradmin:userpwadmin@cluster0.bzuiorc.mongodb.net/school_data?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to DataBase')
    }
})

function verify_student_token(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token_student = req.headers.authorization.split(' ')[1]
    if (token_student === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token_student, "Secret_Key")
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }
    req.student_id = payload.subject
    next()
}

function verify_staff_token(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token_staff = req.headers.authorization.split(' ')[1]
    if (token_staff === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token_staff, "Secret_Key")
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }
    req.staff_id = payload.subject
    next()
}

function verify_admin_token(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token_admin = req.headers.authorization.split(' ')[1]
    if (token_admin === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token_admin, "Secret_Key")
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }
    req.admin_id = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('hello from api route')
})

router.post('/admin_register', (req, res) => {
    let userData = req.body
    let admin = new userAdmin(userData)
    admin.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/admin_login', (req, res) => {
    let userData = req.body

    userAdmin.findOne({ email: userData.admin_id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid User')
            } else {
                if (userData.password !== user.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user.admin_id }
                    let token_admin = jwt.sign(payload, "Secret_Key")
                    res.status(200).send({ token_admin })
                }
            }
        }
    })
})

router.get('/dashboard_admin', verify_admin_token, (req, res) => {

})


router.post('/staff_register', (req, res) => {
    let userData = req.body
    let staff = new userStaff(userData)
    staff.save((err, registeredUser) => {
        if (err) {
            console.log(err)
            res.status(401).send('Error')
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/staff_login', (req, res) => {
    let userData = req.body

    userStaff.findOne({ staff_id: userData.staff_id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid User')
            } else {
                if (userData.password !== user.password) {
                    res.status(401).send('Incorrect Password')
                } else {
                    let payload = { subject: user.staff_id }
                    let token_staff = jwt.sign(payload, "Secret_key")
                    res.status(200).send({ token_staff })
                }
            }
        }
    })
})

router.get('/dashboard_staff', verify_staff_token, (req, res) => {

})

router.post('/student_register', (req, res) => {
    let userData = req.body
    let student = new userStudent(userData)
    student.save((err, registeredUser) => {
        if (err) {
            console.log(err)
            res.status(401).send('Error')
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/student_login', (req, res) => {
    let userData = req.body

    userStudent.findOne({ student_id: userData.student_id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid User')
            } else {
                if (userData.password !== user.password) {
                    res.status(401).send('Incorrect Password')
                } else {
                    let payload = { subject: user.student_id }
                    let token_student = jwt.sign(payload, "Secret_key")
                    res.status(200).send({ token_student })
                }
            }
        }
    })
})

router.get('/dashboard_student', verify_student_token, (req, res) => {

})


router.post('/add_notice', (req, res) => {
    let notice = req.body
    let notices = new userNotices(notice)
    notices.save((err, registeredNotice) => {
        if (err) {
            console.log(err)
            res.status(401).send('Error')
        } else {
            res.status(200).send(registeredNotice)
        }
    })
})

router.get('/notices', (req, res) => {
    userNotices.find().sort({ date: -1 })
        .exec((err, Notices) => {
            if (err) {
                console.log(err)
            } else {
                res.json(Notices)
            }
        })
})

router.get('/notices/:id', (req, res) => {
    userNotices.findById(req.params.id)
        .exec((err, Notice) => {
            if (err) {
                console.log(err)
            } else {
                res.json(Notice)
            }
        })
})
module.exports = router