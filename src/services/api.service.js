class ApiService {
	constructor(url) {
		this.url = url

	}
	async createPost(postData) {
		try {
			const request = new Request(`${this.url}/posts.json`,{
				method: 'post',
				body: JSON.stringify(postData)
			})
			return await useRequest(request)
		}catch (err){
			console.error(err)
		}
	}

	async fetchPosts() {
		try {
			const request = new Request(`${this.url}/posts.json`,{
				method: 'get'
			})
			return await useRequest(request)

		} catch (err){
			console.error(err)
		}
	}

	async fetchPostById(id){
		try {
			const request = new Request(`${this.url}/posts/${id}.json`,{
				method: 'get'
			})
			return await useRequest(request)

		} catch (err){
			console.error(err)
		}
	}

}

async function useRequest (req) {
	const response = await fetch(req)
	return await response.json()

}

export const apiService = new ApiService('https://dictionary-db-717c4-default-rtdb.europe-west1.firebasedatabase.app')