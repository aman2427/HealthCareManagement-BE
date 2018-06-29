var express = require('express');
var router = express.Router();

const Doctor = require('../models/doctorsModel');

router.get('/getDoctor',(req,res) => {
	Doctor.getAllDoctors((err, doctors) => {
		if(err) {
			res.json({success: false, message: `Failed to load Doctor. Error: ${err}`});
		}
		else {
			res.json({success: true, doctors:doctors});
            res.end();
		}
	});
});

//ajax call to get doctor names
router.get('/getDoctorNames/:pattern',(req,res) => {
	var matchingPattern = req.params.pattern;
	Doctor.getDoctorNamesByAjax(matchingPattern, (err, doctors) => {
		if(err) {
			res.json({success: false, message: `Failed to load Doctor. Error: ${err}`});
		}
		else {
			res.json({success: true, doctors:doctors});
		}
	});
});

router.post('/addDoctor', (req,res,next) => {
	let newDoctor = new Doctor({
        firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		contactNumber: req.body.contactNumber,
		email: req.body.email,
        address: req.body.address,
        specialization:req.body.specialization,
        department:req.body.department,
        gender:req.body.gender,
        dob:req.body.dob,
		//img: req.body.img,
    });
    Doctor.addDoctor(newDoctor,(err, doctor) => {
        if(err) {
            res.json({success: false, message: `Failed to add new Doctor. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Doctor added successfully."});

    });
});

router.get('/doctorDetails/:email',(req,res) => {
	var email = req.params.email;
	Doctor.getDoctorByEmail(email, (err, doctor) => {
		if(err) {
			res.json({success: false, message: `Failed to load Patient. Error: ${err}`});
		}
		else {
			res.json({success: true, doctor:doctor});
		}
	});
});

router.delete('/deleteDoctor/:id', (req,res,next)=> {
    let id = req.params.id;
    Doctor.deleteDoctorById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the Doctor. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Doctor deleted successfully"});
        }
        else
            res.json({success:false});
    });
});

router.put('/editDoctor/:id', function(req, res, next) {
	var query = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		/*password: req.body.password,
		retypepassword: req.body.retypepassword,*/
		contactNumber: req.body.contactNumber,
		email: req.body.email,
		address: req.body.address,
		specialization:form.value.specialization,
        department:form.value.department,
        gender:form.value.gender,
        dob:form.value.dob
	};
	Doctor.findOneAndUpdate({_id:req.params.id}, query, function(err,doctor){
		if(err){
			res.json(err);
		}else{
			res.json(doctor);
		}
	});
});

module.exports = router;