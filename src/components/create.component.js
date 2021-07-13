import {Component} from "../core/Component";
import {Form} from '../core/Form'
import {Validators} from "../core/Validators";
import {apiService} from "../services/api.service";

export class CreateComponent extends Component{
	constructor(id) {
		super(id);
	}

	init() {
		this.form = new Form(this.$el, {
			title: [Validators.required],
			fulltext: [Validators.required, Validators.minLength(4)],
			type:[]
		})
		this.$el.addEventListener('submit', submitHandler.bind(this))

	}
}

async function submitHandler(e) {
	e.preventDefault()
	let formData = {}

	if(this.form.isValid()) {
		formData = {
			...this.form.value(),
			data: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString('en-US')
		}
		await apiService.createPost(formData)

		this.form.clear()

	}
}