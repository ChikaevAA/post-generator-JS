import {Component} from "../core/Component";

export class NavigationComponent extends Component {
	constructor(id) {
		super(id);
		this.tabs = []
	}
	init () {
		this.$el.addEventListener('click', tabHandleClick.bind(this))
	}
	registerTabs(args){
		this.tabs = Array.from(args)
	}

}

function tabHandleClick(event){
	event.preventDefault()
	if(event.target.classList.contains('tab')){
		Array.from(this.$el.querySelectorAll('.tab')).forEach(item => item.classList.remove('active'))
		event.target.classList.add('active')

		const activeTab = this.tabs.find(item => item.name === event.target.dataset.name)
		this.tabs.forEach(item => item.component.hide())
		activeTab.component.show()
	}
}