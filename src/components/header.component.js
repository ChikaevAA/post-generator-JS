import {Component} from "../core/Component";

export class HeaderComponent extends Component {
	constructor(id) {
		super(id);
	}
	init() {
		if (localStorage.getItem('visited')){
			this.hide()
		}
		this.$el.querySelector('.js-button-start').addEventListener('click', buttonClickHandler.bind(this))
	}
}

function buttonClickHandler(){
	localStorage.setItem("visited", JSON.stringify(true))
	this.hide()

}