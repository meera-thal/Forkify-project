import * as model from './model.js'
import icons from 'url:../img/icons.svg'
import'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView.js'
import { async } from 'regenerator-runtime'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

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

    //1.Loading recipe
    await model.loadRecipe(id);

    //2.Rendering recipe
    recipeView.render(model.state.recipe)
  
  }catch(err){
    console.log(err);
    recipeView.renderError(err)
  }
    }


const init= function(){
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
}


const controlSearchResult = async function(){
  try{

    // 1)Get search query
    const query = searchView.getQuery()
    if(!query)return;

    // 2)Load search results
    await model.loadSearchResult(query)

    // 3) Rendering results
    console.log(model.state.search.results)
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
  recipeView.render(model.state.recipe)

}
init();

             
