const router = require('express').Router()
const userModel = require('../models/user.model')
const ObjectID = require("mongoose").Types.ObjectId; 

// ------------- CRUD :(Create Read Update Delete) --------------------------------

//      -----  get users  -----
router.get('/' ,  (req,res)=> {
    userModel.find( (err,doc)=> {
        if(err) return res.status(500).send(err)

        return res.status(200).send(doc)
    })
})

//      -----  add new user  ----- 
router.post('/' , (req,res)=>{
    const { name, email, age, sex} = req.body
    let user = new userModel({ name, email, age, sex })

    user.save((err, data)=> {
        if (err) 
            return res.status(500).send(err)
        else res.status(201).send(data)
    })
})


//      ----- update user by id   classic Method(find, update, save)  ------
router.put('/:id' , (req,res)=>{
    if(!ObjectID.isValid(req.params.id)) 
        return  res.status(400).send( "ID unknown : " + req.params.id) 

    userModel.findById({_id: req.params.id }, (err, doc)=> {
        if(err) return res.status(400).send({msg: "ID introuvable" , err: err})
        
        // this is¬ : pour eviter que le serveur crashe quand quan l'oID est valide mais introuvable
        if(doc === null) return  res.status(404).send({msg:'this userID does not exist'} ) 

        req.body.name ? doc.name = req.body.name : ""
        req.body.email ? doc.email = req.body.email : ""
        req.body.age ? doc.age = req.body.age : ""
        req.body.sex ? doc.sex = req.body.sex : ""        
        
        doc.save( (err,data)=> {
            // if error validationMongoose return err
            if(err) return res.status(500).send(err)
            // else 
            res.status(200).send( {msg: "updated", user:data})
        })
    })
})


//      -----  delete user by id  ----- 
router.delete('/:id' , (req,res)=>{
    if(!ObjectID.isValid(req.params.id)) 
        return  res.status(400).send( "ID unknown : " + req.params.id) 

        userModel.findByIdAndRemove( { _id: req.params.id } , (err, doc) => {
            const resultRes = doc ? { msg: 'success to delete user', user:doc }: {msg:'this userID does not exist'}
            if(!err) return res.status(200).send( resultRes )
            return res.status(500).send(err)
        })
})

module.exports = router