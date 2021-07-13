export class Form {
	constructor(form, controls) {
		this.form = form
		this.controls = controls
	}
	clear(){
		Object.keys(this.controls).forEach(control => {
			control !== 'type' ? this.form[control].value = '' : null
		})
	}
	value() {
		const value = {}
		Object.keys(this.controls).forEach(control => {
			value[control] = this.form[control].value
		})
		return value
	}
	isValid(){
		let isFormValid = true

		Object.keys(this.controls).forEach(control => {
			let isValid = true
			const validators = this.controls[control]
			validators.forEach(validator => {
				isValid = validator(this.form[control].value) && isValid


			})
			isValid? clearError(this.form[control]) : setError(this.form[control])
			isFormValid = isFormValid && isValid
		})
		return isFormValid
	}

}

function setError($control){
	clearError($control)
	const errorElement = '<p class="validation-error">Введите корректное значение</p>'
	$control.classList.add('invalid')
	$control.insertAdjacentHTML('afterend',errorElement)
}

function clearError($control){

	$control.classList.remove('invalid')
	if($control.nextSibling){
		$control.parentElement.removeChild($control.nextSibling)
	}


}