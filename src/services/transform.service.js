export class TransformService {
	static transformDBObjectToArray(DBObject){
		return Object.keys(DBObject).map(key => {
			const value = DBObject[key]
			value.id = key
			return value
		})
	}
}