# Might: Sorcery API Documentation

Might provides an API to power the Sorcery project. Some data sources, like twitter data, are not supplied by Might.

## Endpoints

#### Schedule Resources

- **[<code>GET</code>] schedule](#getSchedule)

## Definitions

### GET: Schedule

    GET schedule

#### Description
Returns the entire schedule for the current season

#### Request

    GET /schedule

#### Response
``` json

{
    "games": [
        {
            "opponent": {
                "name": "Chicago Bulls",
                "icon": "imgur.com/34242fwffw23"
            },
            "startTime": 9349309,
            "isHome": true,
            "localBroadcaster": "Fox 35",
            "nationalBroadCaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "name": "Chicago Bulls",
                    "icon": "imgur.com/34242fwffw23"
                }
            }
        },
        {
            "opponent": {
                "name": "Miami Bees",
                "icon": "imgur.com/34242fwffw23"
            },
            "startTime": 14143243,
            "isHome": false,
            "localBroadcaster": "TNT 23",
            "nationalBroadCaster": "TNT",
            "results": {
                "score": "34 - 43",
                "overtime":  3,
                "winner": {
                    "name": "Orlando Magic",
                    "icon": "imgur.com/34242fwffw23"
                }
            }
        },
        {
            "opponent": {
                "name": "Seattle Seagulls",
                "icon": "imgur.com/34242fwffw23"
            },
            "startTime": 4234324324,
            "isHome": false,
            "localBroadcaster": "Fox 34",
            "nationalBroadCaster": "FPS",
        }
    ]
}
```