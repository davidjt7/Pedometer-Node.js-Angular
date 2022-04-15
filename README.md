# Team Pedometer

## Install requirements if not available
- node 16+
- @angular/cli

## Backend service notes
    cd pedometer-backend
    npm i
    npm start
The server listens to requests at port 8080 by default, specify PORT in .env in the root of pedometer-backend to listen at a different port.  
To view API docs, go to http://localhost:$PORT.  
Counters are stored in an in-memory map.

### REST API Docs Summarized
#### POST /teams/:teamName
Create a new counter for team teamName.
##### Example Response:
    {
        "message": "CREATE_TEAM_COUNTER_SUCCESS",
        "data": [
            {
                "teamName": "Yellow",
                "score": 0,
                "users": []
            }
        ]
    }

#### GET /teams/:teamName
Get counter details for team teamName.
##### Example Response:
    {
        "message": "GET_TEAM_COUNTER_SUCCESS",
        "data": {
            "teamName": "Yellow",
            "score": 0,
            "users": []
        }
    }
#### GET /teams
List all teams with scores and users.
##### Example Response:
    {
        "message": "LIST_TEAM_COUNTER_SUCCESS",
        "data": [
            {
                "teamName": "Purple",
                "score": 7,
                "users": [
                    {
                        "userName": "Jake",
                        "stepCount": 7
                    }
                ]
            },
            {
                "teamName": "Blue",
                "score": 6,
                "users": [
                    {
                        "userName": "Denise",
                        "stepCount": 6
                    }
                ]
            },
            {
                "teamName": "Red",
                "score": 4,
                "users": [
                    {
                        "userName": "Ed",
                        "stepCount": 3
                    },
                    {
                        "userName": "Kris",
                        "stepCount": 1
                    }
                ]
            }
        ]
    }

#### POST /teams/:teamName/users/:userName
Add user userName to teamName, if it exists.
##### Example Response:
    {
        "message": "ADD_USER_TO_TEAM_SUCCESS",
        "data": [
            {
                "teamName": "Purple",
                "score": 7,
                "users": [
                    {
                        "userName": "Jake",
                        "stepCount": 7
                    }
                ]
            },
            {
                "teamName": "Blue",
                "score": 6,
                "users": [
                    {
                        "userName": "Denise",
                        "stepCount": 6
                    }
                ]
            },
            {
                "teamName": "Red",
                "score": 4,
                "users": [
                    {
                        "userName": "Ed",
                        "stepCount": 3
                    },
                    {
                        "userName": "Kris",
                        "stepCount": 1
                    }
                ]
            },
            {
                "teamName": "Yellow",
                "score": 0,
                "users": [
                    {
                        "userName": "Matilda",
                        "stepCount": 0
                    }
                ]
            }
        ]
    }

#### PUT /teams/:teamName/users/:userName
Increment the stepCount of the user belonging to teamName, if it exists.
##### Example Response:
    {
        "message": "INCREMENT_TEAM_COUNTER_SUCCESS",
        "data": [
            ...
            {
                "teamName": "Yellow",
                "score": 1,
                "users": [
                    {
                        "userName": "Matilda",
                        "stepCount": 1
                    }
                ]
            }
        ]
    }
#### GET /teams/:teamName/users/:userName
Get the counter of the user userName belonging to teamName, if it exists.
##### Example Response:
    {
        "message": "GET_TEAM_COUNTER_SUCCESS",
        "data": {
            "userName": "Matilda",
            "stepCount": 1
        }
    }

## Frontend service notes
    cd pedometer-frontend
    npm i
    npm start
App opens in default browser. Add team counters by specifying their names in the text input provided and clicking on the 'Add team' button.    
A card will be created representing each team counter which displays team name and score. Add a new user to the team with the text input provided within the team card.  Click on the plus button within the user's card to increment the step count.    
Cards will only appear if the backend service is running in the background as the app transforms and retrieves data through the API. 
![Screenshot from 2022-04-04 16-31-39](https://user-images.githubusercontent.com/17983341/161530712-b205b9a8-c551-4564-a73d-8d395e48d227.png) 