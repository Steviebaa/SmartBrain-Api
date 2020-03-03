const Clarifai = require('clarifai')

const clarifaiApp = new Clarifai.App({
	apiKey: '1612f275008045e4b2ec17fba33f6211'
});


const handleApiCall = (req, res) => {
	clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
	.then(data => {
		console.log(data)
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Could not add entry'))
};

module.exports = {
	handleImage,
	handleApiCall
}
