import view from "./view";
import icons from 'url:../../img/icons.svg'

class paginationView extends view{
_parentElement = document.querySelector('.pagination');

addHandlerClick(handler){
  this._parentElement.addEventListener('click', function(e){
    const btn = e.target.closest('.btn--inline')
    console.log(btn)
  const goToPage= +btn.dataset.goto;
  console.log(goToPage)
    handler(goToPage);
  })
}

_generateMarkup(){
    console.log(this._data.page)
    const curPage = this._data.page
    const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage)

    //Page One, there are other pages
        if(curPage===1 &&numPages>1)
        return this._generateNextMarkup(curPage)

    //last page
    if(curPage === numPages&& numPages>1)
    return this._generatePreviousMarkup(curPage)
    //other page
    if(curPage>1 && curPage<numPages)
    return this._generatePrevAndNextMarkup(curPage)

    //page One, no other page
    return ''

}

_generatePreviousMarkup(curPage){
  return ` <button data-goto="${curPage-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>`
}

_generateNextMarkup(curPage){
return `<button data-goto= "${curPage+1}"class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}g#icon-arrow-right"></use>
            </svg>
          </button>`
}

_generatePrevAndNextMarkup(curPage){
    return`
    <button data-goto= "${curPage-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>
          <button data-goto= "${curPage+1}"class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}g#icon-arrow-right"></use>
            </svg>
          </button>
          `
}
}

export default new paginationView();