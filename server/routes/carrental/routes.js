const Rental = require('../../models/carrental/rental');
const Category = require('../../models/carrental/category');
const Rented = require('../../models/carrental/rented');


const verifyToken = require('../session/verifyToken');


module.exports = function(app){
    app.get('/carrental/cars', async function (req,res){
        try{
            let cars = await Rental.find({active:true},{"rented":0});
            res.status(200).send(cars);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });



     app.get('/carrental/car/:rentalId', async function (req,res){
        try{
            let rental = await Rental.findById(req.params.rentalId,{"rented":0});
            res.status(200).send(rental);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/carrental/cartypes/', async function (req,res){
        try{     
            let categories = await Category.find();
            res.status(200).send(categories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


/*
    app.get('/carrental/cars/:categoryId', async function (req,res){
        try{
            let rentals = await Rental.find({cartype:req.params.categoryId, active:true},{"rented":0});
            res.status(200).send(rentals);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });*/

    /*
     app.get('/carrental/free', async function (req,res){
        try{
            const date = parseInt(req.query.date);
            const end = parseInt(req.query.end);
            let rentals = await Rental.find({$or:[
                                                    
                                                    {'rented.date':{$not:{$eq:date}},'active':true},
                                                    {"rentedLength":{$lte:0},'active':true}
                                                ]});
            res.status(200).send(rentals);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });*/

    /*
    app.get('/carrental/tagsearch',verifyToken, async function (req,res){
        try{     
            const filters = req.query;
            let searchTags = []
            for(key in filters){
                searchTags.push(filters[key].toLowerCase());
            }
            const filteredRentals = await Rental.find({tags:{$in:searchTags},'active':true})
            res.status(200).send(filteredRentals);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });*/

     app.get('/carrental/search',verifyToken, async function (req,res){
        try{     
            const filters = req.query.tags;
            const date = req.query.date;
            const category = req.query.category;


            let rentals = null;
            let searchTags = null; 
            let dateInt =null;
            if(filters){
                searchTags = filters.toLowerCase().split(',')
            }

            if(date){
                dateInt = parseInt(date);
            }

            if(filters && !date && !category){
                rentals = await Rental.find({tags:{$in:searchTags},'active':true},{"rented":0})
            }else if (!filters && date && !category){
                rentals = await Rental.find({$or:[
                                                {'rented.date':{$not:{$eq:dateInt}},'active':true},
                                                {"rentedLength":{$lte:0},'active':true}
                                            ]},{"rented":0});
            }else if(!filters && !date && category){
                rentals = await Rental.find({cartype:category, active:true});
            }else if (filters && date && !category){
                rentals = await Rental.find({$and:[
                                                {$or:[
                                                    {'rented.date':{$not:{$eq:dateInt}},'active':true},
                                                    {"rentedLength":{$lte:0},'active':true}
                                                ]},
                                                {'tags':{$in:searchTags}}
                                                ]
                                            },{"rented":0});
            }else if (filters && !date && category){
                rentals = await Rental.find({cartype:category, active:true,tags:{$in:searchTags}});
            }else if (!filters && date && category){
                rentals = await Rental.find({$and:[
                                                {$or:[
                                                    {'rented.date':{$not:{$eq:dateInt}},'active':true},
                                                    {"rentedLength":{$lte:0},'active':true}
                                                ]},
                                                {cartype:category}
                                                ]
                                            },{"rented":0});
            }else if (filters && date && category){
                rentals = await Rental.find({$and:[
                                                {$or:[
                                                    {'rented.date':{$not:{$eq:dateInt}},'active':true},
                                                    {"rentedLength":{$lte:0},'active':true}
                                                ]},
                                                {cartype:category},
                                                {'tags':{$in:searchTags}}
                                                ]
                                            },{"rented":0});
            }
            res.status(200).send(rentals);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

//gemietet
     app.get('/carrental/rented/',verifyToken, async function (req,res){
        try{
            /*let rented = await Rental.aggregate([
                {$match:{"rented.userId":{$eq:req.user.id}}},
                {$project: {_id: 1, name: 1}}

            ])*/
            let rented = await Rental.find({"rented.userId":req.user.id},{_id:1,'rented.$':1});
            res.status(200).send(rented);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

//verliehen
     app.get('/carrental/lent/',verifyToken, async function (req,res){
        try{     
            let lent = await Rental.find({owner:req.user.id, rentedLength:{$gt:0}});
            res.status(200).send(lent);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });







     app.post('/carrental/rental/', verifyToken,function (req,res){
        try{

            let rentalData = req.body
            rentalData.rentedLength = 0;
            let rental = new Rental(rentalData);
            rental.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully added!");
                }
            });


        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     
     app.post('/carrental/rent/', verifyToken, async function (req,res){
        try{
            let rentData = req.body;
            let rentalId = rentData.rentalId;
            delete rentData.rentalId;
            //let rent = new Rented(rentData);
            let rental = await Rental.findById(rentalId);
            rental.rented.push(rentData)
            rental.rentedLength = rental.rentedLength+1;
            rental.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully added!");
                }
            });


        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



} 