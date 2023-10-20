import 'regenerator-runtime/runtime'
import {API_URL, RES_PER_PAGE} from './config.js'
import { getJSON } from './helper.js'

export const state ={
    recipe:{},
    search:{
        query:'',
        results:[],
        resultsPerPage : RES_PER_PAGE,
        page: 1,
        

    }
}

export const loadRecipe = async function(id){
    try{
       const data = await  getJSON(`${API_URL}/${id}`);
        let {recipe} = data.data;
        state.recipe={
            cookingTime:recipe.cooking_time,
            id: recipe.id,
            image:recipe.image_url,
            ingredients: recipe.ingredients,
            publisher:recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title:recipe.title,
            
        }
       
    } catch(error){
        console.error(`${error}***`)
        throw error
    }

}

export const loadSearchResult = async function(query){
    try{ 
        state.search.query=query
        const data = await getJSON(`${API_URL}?search=${query}`)
        console.log(data)

        state.search.results=data.data.recipes.map(rec=>{return {
            id: rec.id,
            image:rec.image_url,
            publisher:rec.publisher,
            title:rec.title,
        }
        } )
        
    }
catch(error){
    console.error(`${error}***`)
    throw error
}
}

export const searchResultsPage = function(page=state.search.page){
    state.search.page = page;
    const start = (page - 1)*state.search.resultsPerPage;
    const end = page *state.search.resultsPerPage;
   
    return state.search.results.slice(start, end)
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing=>{
        ing.quantity= (ing.quantity/state.recipe.servings)*newServings
     
    }
        )
        state.recipe.servings=newServings;
        

}