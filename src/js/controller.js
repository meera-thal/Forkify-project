import * as model from './model.js'
import icons from 'url:../img/icons.svg'
import'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView.js'
import { async } from 'regenerator-runtime'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_TIMEOUT_SEC } from './config.js'

// if(module.hot){
//   module.hot.accept()
// }
const recipeContainer = document.querySelector('.recipe');




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function(){
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    //0) updating resultsview to mark selected search result

    resultsView.update(model.searchResultsPage())

    //1.Loading recipe
    await model.loadRecipe(id);

    //2.Rendering recipe
    recipeView.render(model.state.recipe)
  
  }catch(err){
    console.log(err);
    recipeView.renderError(err)
  }
    }

  const controlBookmarks = function(){
    bookmarksView.render(model.state.bookmarks)
  }

const controlAddBookmark = function(){
  //Adding/deleting bookmark
if(!model.state.recipe.bookmarked)
model.addBookmark(model.state.recipe)
else model.deleteBookmark(model.state.recipe.id)

//updating recipe
recipeView.update(model.state.recipe)

//updating bookmarks
bookmarksView.render(model.state.bookmarks)
    }

const init= function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}


const controlSearchResult = async function(){
  try{

    // 1)Get search query
    const query = searchView.getQuery()
    if(!query)return;

    // 2)Load search results
    await model.loadSearchResult(query)

    // 3) Rendering results
    resultsView.render(model.searchResultsPage(1))

    //4)Rendering Pagination
    paginationView.render(model.state.search)
  }catch(err){
    console.error(err)
  }
}

const controlPagination= function (goToPage){
// 1) Rendering New results
resultsView.render(model.searchResultsPage(goToPage))

// 2)Rendering New Pagination
paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  //Update recipe servings (in state)
model.updateServings(newServings)
  //update recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddRecipe = async function(newRecipe){
try{

  //spinner
addRecipeView.renderSpinner()


 await model.uploadRecipe(newRecipe)
 console.log(model.state.recipe)

 //Render recipe
 recipeView.render(model.state.recipe)

 // render message
 addRecipeView.renderSuccess();

 //render bookmark view
 bookmarksView.render(model.state.bookmarks)

 //change url
 window.history.pushState(null, '', `${model.state.recipe.id}`)

 //close form window
 setTimeout(function(){
  addRecipeView.toggleWindow()
 },MODAL_TIMEOUT_SEC*1000)
}catch(error){
  console.error(error)
  addRecipeView.renderError(error.message)
}
}
init();

             
