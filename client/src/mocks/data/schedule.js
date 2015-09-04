module.exports = {

"games": [
	{
		"opponent": {
			"name": "Chicago Bulls",
			"icon": "imgur.com/34242fwffw23"
			},
		"startTime": 9349309, // epoch
		"isHome": true,
		"localBroadcaster": "Fox Sports Florida",
		"nationalBroadCaster": "Fox", // can be null (could be JSON issues)
		"results": {  // this will be empty for games that have not happened
			"score": "100 - 0", // this need some work
			"overtime":  0, // can be greater than 0
			"winner": {
				"name": "Chicago Bulls",
				"icon": "imgur.com/34242fwffw23"
				}
		}
	},
	{
		"opponent": {
			"name": "Golden State Warriors",
			"icon": "imgur.com/34242fwffw23"
			},
		"startTime": 9349309, // epoch
		"isHome": true,
		"localBroadcaster": "Fox Sports Florida",
		"nationalBroadCaster": "Fox", // can be null (could be JSON issues)
		"results": {  // this will be empty for games that have not happened
			"score": "100 - 0", // this need some work
			"overtime":  0, // can be greater than 0
			"winner": {
				"name": "Orlando Magic",
				"icon": "imgur.com/34242fwffw23"
				}
		}
	}
]	
}