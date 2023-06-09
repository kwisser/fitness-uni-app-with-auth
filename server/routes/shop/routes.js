const Article = require('../../models/shop/article');
const Category = require('../../models/shop/category');
const Order = require('../../models/shop/order');
const Comment = require('../../models/shop/comment');
const Subcategory = require('../../models/shop/subcategory');
const Rate = require('../../models/shop/rate');

const verifyToken = require('../session/verifyToken');


module.exports = function(app){
    app.get('/shop/articles', async function (req,res){
        try{
            let articles = await Article.find();
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    });

    app.get('/shop/articles/:categoryId', async function (req,res){
        try{
            let articles = await Article.find({categoryId:req.params.categoryId});
            res.status(200).send(articles);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/shop/article/:articleId', async function (req,res){
        try{
            let article = await Article.findById(req.params.articleId);
            res.status(200).send(article);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/shop/categories/', async function (req,res){
        try{     
            let categories = await Category.find();
            res.status(200).send(categories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.get('/shop/comments/:articleId',async function (req,res){
        try{
            let comments = await Comment.find({articleId: req.params.articleId});
            res.status(200).send(comments);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

    app.get('/shop/subcategories/', async function (req,res){
        try{
            let subcategories = await Subcategory.find();
            res.status(200).send(subcategories);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
    
    });



     app.get('/shop/orders/', verifyToken,async function (req,res){
        try{
            let orders = await Order.find({userId: req.user.id}).sort({orderNr:'desc'});
            res.status(200).send(orders);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



     app.post('/shop/order/', verifyToken,function (req,res){
        try{

            let date = new Date();
            let orderData = {
                userId: req.user.id,
                articles:req.body,
                orderDate:date.getDate() + "." + (date.getMonth()+1) + "."+date.getFullYear()
            }
            let order = new Order(orderData);
            order.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Order was successful!");
                }
            });


        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });



     app.post('/shop/comment/', verifyToken,async function (req,res){
        try{
            let orders = await Order.find({userId: req.user.id}).sort({orderNr:'desc'});
            let boughtArticle = false;

            loop:
            for(let i=0; i < orders.length; i++){
                for(let j =0; j < orders[i].articles.length;j++){
                    if(req.body.articleId == orders[i].articles[j].articleId){
                        boughtArticle = true;
                        break loop;
                    }
                }
            }


            if(boughtArticle){
                let commentData = req.body;
                let comment = new Comment(commentData);
                comment.save(function (err){
                    if(err){
                        res.status(422).send("Data are not correct!");
                    }else{
                        res.status(201).send("Comment was successful!");
                    }
                });
            }else{
                res.status(422).send("Article was not bought!");
            }
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }

     });


     app.post('/shop/rate/', verifyToken,async function (req,res){
        try{
            let orders = await Order.find({userId: req.user.id}).sort({orderNr:'desc'});

            let boughtArticle = false;
            loop:
            for(let i=0; i < orders.length; i++){
                for(let j =0; j < orders[i].articles.length;j++){
                    if(req.body.articleId == orders[i].articles[j].articleId){
                        boughtArticle = true;
                        break loop;
                    }
                }
            }


            if(boughtArticle){

                let ratings = await Rate.find({articleId: req.body.articleId});

                let newRating =0;
                let rated =false;
                for(let i=0; i < ratings.length;i++){

                    if(ratings[i].userId == req.user.id){
                        rated = true;
                        break;
                    }
                    newRating =  newRating + rating[i];
                }


                if(!rated){

                    newRating = newRating + req.body.rate;
                    newRating = newRating / (ratings.length+1);

                    await Article.findByIdAndUpdate({_id:req.body.articleId},{"rating":newRating});

                    let rateData = req.body;
                    let rate = new Rate(rateData);
                    rate.save(function (err){
                        if(err){
                            res.status(422).send("Data are not correct!");
                        }else{
                            res.status(201).send("Rating was successful!");
                        }
                    });
                }else{
                    res.status(422).send("Article was already rated!");
                }
            }else{
                res.status(422).send("Article was not bought, can not be rated!");
            }

        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/shop/category', verifyToken,function(req,res){
        try{
            let categoryData = req.body;

            let category = new Category(categoryData);
            category.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Category was successfully added!");
                }
            });

        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });

     app.post('/shop/subcategory', verifyToken,function(req,res){
        try{
            let categoryData = req.body;

            let category = new Subcategory(categoryData);
            category.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Category was successfully added!");
                }
            });

        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });


     app.post('/shop/article', verifyToken,function(req,res){
        try{
            let articleData = req.body;

            let article = new Article(articleData);
            article.save(function (err){
                if(err){
                    res.status(422).send("Data are not correct!");
                }else{
                    res.status(201).send("Article was successfully added!");
                }
            });
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);   
        }
     });
}