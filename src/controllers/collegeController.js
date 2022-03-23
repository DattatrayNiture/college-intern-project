const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const createCollege_Doc = async function (req, res) {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).send({ status: false, msg: "Bad Request please enter information about college" })
    }

    const { name, fullName, logoLink } = req.body
    if (!name) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid name" })
    }

    let nameRules = /^[a-z]*$/;

    if (!nameRules.test(name)) {

      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid name which do not contain any special chatecters and capital letters" })

    }



    if (!fullName) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid fullName" })
    }
    if (!logoLink) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid logoLink" })
    }

    const college = await collegeModel.create(req.body)
    const collegeResponce = await collegeModel.find({_id:college._id}).select({_id:0,name:1,fullName:1,logoLink:1,isDeleted:1})
    return res.status(201).send({ status: true, data: collegeResponce })

  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


const collegeDetails = async function (req, res) {
  try {
    if (Object.keys(req.query).length <= 0) {
      return res.status(400).send({ status: false, msg: "Bad Request please give input as college name" })
    }

    const collegeName = req.query.collegeName


    if (!collegeName) { return res.status(400).send({ status: false, msg: "BAD REQUEST please provied valid collegeName" }) }


    const college = await collegeModel.find({ name: collegeName, isDeleted: false })

    //console.log(college.length)
    if (!college || college.length <= 0) {
      return res.status(404).send({ status: false, msg: "BAD REQUEST  college not found" })
    }
    const multiplecollege = [];
    for (let j = 0; j < college.length; j++) {

      // console.log(college)
      const collegeId = college[j]._id
      //   delete req.body["collegeName"]

      const interName = await internModel.find({ collegeId: collegeId, isDeleted: false})
      if (interName.length <= 0) { return res.status(404).send({ msg: `No intern apply for this college: ${collegeName} \n ${college} ` }) }
      const interns = []

      for (let i = 0; i < interName.length; i++) {
        let Object = {}
        Object._id = interName[i]._id
        Object.name = interName[i].name
        Object.email = interName[i].email
        Object.mobile = interName[i].mobile
        interns.push(Object)
      }

      const ObjectData = {
        interns_count: interns.length,
        name: college[j].name,
        fullName: college[j].fullName,
        logoLink: college[j].logoLink,
        interns: interns
      }
      multiplecollege.push(ObjectData)
    }

    return res.status(200).send({ status: true, total_college_count: multiplecollege.length, data: multiplecollege })


  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }

}












module.exports.collegeDetails = collegeDetails
module.exports.createCollege_Doc = createCollege_Doc



// isDeletedAt, isDeleted ,move college controller , modified 2 api output