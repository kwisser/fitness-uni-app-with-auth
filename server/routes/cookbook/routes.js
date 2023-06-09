var mongoose = require("mongoose");

const Categories = require('../../models/cookbook/categories');
const Recipe = require('../../models/cookbook/recipe');
const User = require('../../models/user');


const verifyToken = require('../session/verifyToken');


module.exports = function(app){
    app.get('/cookbook/recipes', async function (req,res){
        try{
            let recipes = await Recipe.find();
            res.status(200).send(recipes);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

     app.get('/cookbook/recipe/:recipeId', async function (req,res){
        try{
            let recipe = await Recipe.findById(req.params.recipeId);
            res.status(200).send(recipe);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/cookbook/user/recipe/',verifyToken, async function (req,res){
        try{
            let recipes = await Recipe.find({user:req.user.id});
            res.status(200).send(recipes);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/cookbook/categories/', async function (req,res){
        try{     
            let categories = await Categories.find();
            res.status(200).send(categories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.get('/cookbook/search',verifyToken, async function (req,res){
        try{     
            const filters = req.query.tags;
            const category = req.query.category;


            let recipes = null;
            let searchTags = null; 
            let searchCategories = null;
            if(filters){
                searchTags = filters.toLowerCase().split(',')
            }

            if(category){
                searchCategories = category.toLowerCase().split(',')
            }


            if(filters && !category){
                recipes = await Recipe.find({tags:{$in:searchTags}})
            }else if(!filters  && category){
                recipes = await Recipe.find({categories:{$in:searchCategories}});
            }else if (filters && category){
                recipes = await Recipe.find({categories:{$in:searchCategories}, tags:{$in:searchTags}});
            }
            res.status(200).send(recipes);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/cookbook/saved/', verifyToken, async function (req,res){
        try{     
            let recipes = await User.findOne({_id:req.user.id}).populate('savedRecipes');
            res.status(200).send(recipes);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });




     app.post('/cookbook/recipe/', verifyToken,function (req,res){
        try{

            let recipeData = req.body
            recipeData.user = req.user.id;
            recipeData.tags = recipeData.tags.map(v => v.toLowerCase());
            let recipe = new Recipe(recipeData);
            recipe.save(function (err){
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


     app.post('/cookbook/category/', function (req,res){
        try{

            let categoryName = req.body
            let category = new Categories(categoryName);
            category.save(function (err){
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


     app.put('/cookbook/save/recipe', verifyToken,async function (req,res){
        try{
            let recipeId = req.body.recipe
            let user = await User.findOne({_id:req.user.id});
            user.savedRecipes.push(recipeId);
            user.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully updated!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });
     
     app.put('/cookbook/save/delete/recipe', verifyToken,async function (req,res){
        try{
            let recipeId = req.body.recipe
            await User.updateOne({_id:req.user.id},{$pull:{savedRecipes:recipeId}});
            res.status(201).send("successfully updated!");
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.put('/cookbook/rate/recipe', verifyToken,async function (req,res){
        try{
            let rating = req.body.rating;
            let recipeId = req.body.recipe
            let recipe = await Recipe.findById(recipeId);
            recipe.rating.push(rating);
            recipe.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully updated!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.put('/cookbook/comment/recipe', verifyToken,async function (req,res){
        try{
            let comment = req.body.comment;
            let recipeId = req.body.recipe
            let recipe = await Recipe.findById(recipeId);

            const c = {user:req.user.id,comment}

            recipe.comments.push(c);
            recipe.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully updated!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.put('/cookbook/commentrate/recipe', verifyToken,async function (req,res){
        try{
            let comment = req.body.comment;
            let rating = req.body.rating;
            let recipeId = req.body.recipe
            let recipe = await Recipe.findById(recipeId);

            const c = {user:req.user.id,comment}

            recipe.rating.push(rating);
            recipe.comments.push(c);
            recipe.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("successfully updated!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.delete('/cookbook/delete/:recipe', verifyToken,async function (req,res){
        try{
            let recipeId = req.params.recipe
            let userId = req.user.id
            const returnValue = await Recipe.deleteOne({_id:recipeId,user:userId})
            if(returnValue.deletedCount == 1){
                res.status(201).send("successfully deleted!");
            }else{
                res.status(422).send("something did go wrong while deleting");
            }
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



} 