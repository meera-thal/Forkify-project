import view from "./view";
import icons from 'url:../../img/icons.svg'

class resultsView extends view{
    _parentElement = document.querySelector('.results')
    _errorMessage = "No recipes found for your query. Please try again!"
_successMessage ='';

    _generateMarkup(){
        console.log(this._data)
        return this._data.map(this.generateMarkupPreview).join('')
       
    }

    generateMarkupPreview(result){return `
    <li class="preview">
         <a class="preview__link preview__link--active" href="#${result.id}">
           <figure class="preview__fig">
             <img src="${result.image}" alt="Test" />
           </figure>
           <div class="preview__data">
             <h4 class="preview__title">${result.title}.</h4>
             <p class="preview__publisher">${result.publisher}</p>
             <div class="preview__user-generated">
               <svg>
                 <use href="src/img/icons.svg#icon-user"></use>
               </svg>
             </div>
           </div>
         </a>
       </li>
    ` 

    }
}

export default new resultsView()