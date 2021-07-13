export function renderPost(post, options){
	const tag = post.type === 'news'
		? `<li class="tag tag-blue tag-rounded">Новость</li>`
		: `<li class="tag tag tag-rounded">Заметка</li>`
	const button = ((JSON.parse(localStorage. getItem('favorites')) || []).some(item => item.id === post.id))
		? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" data-date="${post.data}">Удалить</button>`
		: `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" data-date="${post.data}">Сохранить</button>`

	return `
		<div class="panel">
	      <div class="panel-head">
	        <p class="panel-title">${post.title}</p>
	        <ul class="tags">
	          ${tag}
	        </ul>
	      </div>
	      <div class="panel-body">
	        <p class="multi-line">${post.fulltext}</p>
	      </div>
	      <div class="panel-footer w-panel-footer">
	        <small>${post.data}</small>
	        ${options.buttonIncluded ? button: ''}
	      </div>
	    </div>
	`
}