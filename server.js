const express = require('express');
const templateEngin = require('nunjucks');
const path = require('path');
const {getAllRecipes,getRecipeDetail,getComments, addComment} = require("./models/recipe_mode");
const app = express();
const port = 3000;

// app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.json())

templateEngin.configure('views', {
    express: app
});

app.route("/").get(async (req,res) => {
    res.render('index.html', {recipes: await getAllRecipes()});
})


app.route('/recipes/:recipe_id').get(async (req, res) => {
    let id = Number(req.params.recipe_id);
    let recipeDetails = (await getRecipeDetail(id));
    res.render('recipe.html', {details: recipeDetails.details,
        ingredients: recipeDetails.ingredients,
        method: recipeDetails.method});
})


app.route('/recipes/:recipe_id/comments').get(async (req,res) =>{
    res.send(JSON.stringify(await getComments(req.params.recipe_id)));
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))