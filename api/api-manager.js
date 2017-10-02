const RESP_ERROR = { s: false, c: 500 };

function getAction(req) {
	let doc = req.url.substr(1);

	let pos = doc.indexOf('?');
	if (pos > -1) {
		doc = doc.substr(0, pos);
	}

	if (doc == 'lookup') {
		return require('./lookup');
	} else if (doc == 'input') {
		return require('./input');
	} else {
		return null;
	}
}

async function executePOST(req) {
	const Action = getAction(req);
	if (Action) {
		return await Action.execute(req.body);
	}
}

async function executeGET(req) {
	const Action = getAction(req);
	if (Action) {
		return await Action.execute(req.query);
	}
}

async function execute(req, res) {
	if (req.method === 'POST') {
		return await executePOST(req, res);
	} else if (req.method === 'GET') {
		return await executeGET(req, res);
	} else {
		return 'unsupported method ' + req.method;
	}
}

exports.handler = function (req, res) {
	execute(req, res).then((resp) => {
		if (resp) {
			res.send(resp);
		} else {
			console.log(resp);
			console.error('Empty response');
			res.send(RESP_ERROR);
		}
	}).catch((err) => {
		console.error(err);
		res.send(RESP_ERROR);
	});
};