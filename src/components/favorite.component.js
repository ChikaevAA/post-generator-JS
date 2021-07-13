import {Component} from "../core/Component";
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template";

export class FavoriteComponent extends Component{
	constructor(id, loader) {
		super(id);
		this.loader = loader
	}
	init() {
		this.$el.addEventListener('click', linkHandler.bind(this))
	}

	onShow() {
		const favorites = JSON.parse(localStorage.getItem('favorites'))
		const HTML = (favorites && favorites.length > 0) ? favorites.map(item => renderFavorite(item)): ['<p class="center">Вы еще ничего не добавили</p>']
		this.$el.insertAdjacentHTML('afterbegin', `<ul>${HTML.join(' ')}</ul>`)
	}
	onHide() {
		this.$el.innerHTML = ''
	}
}

function renderFavorite ({id, title, date}) {
	return `<li><a href="#" data-id="${id}"><b data-id="${id}">${title}</b> : ${date}</a></li>`
}

async function linkHandler(event){
	event.preventDefault()
	if(event.target.dataset.id){
		this.loader.show()
		this.$el.innerHTML = ''
		const data = await apiService.fetchPostById(event.target.dataset.id)
		const HTML = renderPost(data, {buttonIncluded: false})
		this.loader.hide()
		this.$el.insertAdjacentHTML('afterbegin', HTML)

	}

}

