import {Component} from "../core/Component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component{
	constructor(id, loader) {
		super(id);
		this.loader = loader
	}
	init() {
		this.$el.addEventListener('click', buttonHandler)
	}
	async onShow(){
		this.loader.show()
		const DBObject = await apiService.fetchPosts()

		const postsArray = TransformService.transformDBObjectToArray(await DBObject)
		const HTML = postsArray.map(post => renderPost(post, {buttonIncluded: true}))
		this.loader.hide()
		this.$el.insertAdjacentHTML('afterbegin', HTML.join(' '))
	}

	onHide() {
		this.$el.innerHTML = ''
		this.loader.hide()
	}

}

function buttonHandler (event){
	event.preventDefault()
	if(event.target.dataset.id){
		let favorites = JSON.parse(localStorage.getItem('favorites')) || []
		if(favorites.some(item => item.id === event.target.dataset.id)) {
			event.target.textContent = 'Сохранить'
			event.target.classList.remove('button-danger')
			event.target.classList.add('button-primary')
			favorites = favorites.filter(item => item.id !== event.target.dataset.id)
		} else {
			event.target.textContent = 'Удалить'
			event.target.classList.add('button-danger')
			event.target.classList.remove('button-primary')
			favorites = [
				...favorites,
				{
					id: event.target.dataset.id,
					title: event.target.dataset.title,
					date: event.target.dataset.date
				}
			]

		}
		localStorage.setItem('favorites', JSON.stringify(favorites) )
	}


}
