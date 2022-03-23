const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")



const internsEntry = async function (req, res) {
  try {
    const { name, email, mobile, collegeName } = req.body

    

    if (!name) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid name" })
    }

    var nameRules = /^[A-Za-z .]{3,25}$/;
     
      if (nameRules.test(name) == false) {
         
          return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid name which contain minimum 3 charecters and maximum 25 and not contain any special chatecters "})
        
      }


    if (!email) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid email" })
    }

    var emailRules = /^[^A-Z]*$/;
     
      if (emailRules.test(email) == false) {
         
          return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid email which do not contain any Capital letter "})
        
      }



    const emailExist = await internModel.findOne({email:email})
    
    if(emailExist){return res.status(409).send({status: false, msg: `intern with this: ${email} email is alredy exist please provide another email`})}


    if (!mobile) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid mobile" })
    }

    
      var mob = /^[1-9]{1}[0-9]{9}$/;
     
      if (mob.test(mobile) == false) {
          console.log("Please enter valid mobile number.");
          return res.status(400).send({status:false, msg:"BAD REQUEST please provied valid mobile which contain only numbers"})
        
      }
 

    if (mobile.length > 10 || mobile.length < 10) {
      return res.status(422).send({ status: false, msg: `Mobile No : ${mobile} is not valid number` })
    }

    const mobileExist = await internModel.findOne({mobile:mobile})
    if(mobileExist){return res.status(409).send({status: false, msg: `intern with this: ${mobile} mobile number is alredy exist please provide another mobile number`})}

    if (!collegeName) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid collegeName" })
    }

    const college = await collegeModel.find({ fullName: collegeName , isDeleted: false })
    console.log(college)
    if (!college || college.length <= 0) {
      return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
    }

    req.body.collegeId = college[0]._id
    delete req.body["collegeName"]

    const interName = await internModel.create(req.body)
    const internFields = await internModel.findOne({_id:interName._id}).select({_id:1,name:1, email:1, mobile:1, collegeId:1})

    return res.status(201).send({ status: true, msg: internFields })

  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}



module.exports.internsEntry = internsEntry
