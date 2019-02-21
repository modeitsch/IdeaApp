const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()



require('../moduls/ideas');
const idea = mongoose.model('ideas');


router.get('/add', (req, res) => res.render('ideas/add'))


//edit idea
router.get('/edit/:id', (req,res) =>{
    idea.findOne({
        _id: req.params.id
    }).then(idea =>{
        res.render('ideas/edit',{
            idea:idea
        });
    });
});


//idea index

router.get('/',(req,res)=>{
    idea.find({}).sort({data:'desc'})
    .then(ideas=> {
        res.render('ideas/index',{
            ideas:ideas
        })
    })
})




router.post('/',(req,res) => {
let errors = [];

    if(!req.body.title){
        errors.push({text: 'Please add a title'})
    }

    if(!req.body.details){
        errors.push({text: 'Somthing is missing '})
    }
    if(errors.length >0) {
        res.render('ideas/add',{
            errors: errors,
            title: req.body.title,
            details: req.body.details
    
    })
    }else {
            const newUser = {
                title:req.body.title,
                details:req.body.details,
            } 
            new idea(newUser).save().then(idea=>{
                req.flash('good_msg', 'startup idea added')

                res.redirect('/ideas');
            })
    }
})

//edit form PUT
router.put('/:id',(req,res)=>{
    idea.findOne({
    _id: req.params.id
})
.then(idea =>{
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea =>{
        req.flash('good_msg', 'startup idea updated')
        res.redirect('/ideas')

})
    })
})
//delete

router.delete('/:id',(req,res) =>{
    idea.remove({_id: req.params.id})
    .then(()=>{
        req.flash('good_msg', 'startup idea removed')
        res.redirect('/ideas')
    })
})

module.exports = router;
