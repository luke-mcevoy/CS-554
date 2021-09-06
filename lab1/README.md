# Database

## The blog document

```json
{
	"_id": new ObjectID(),
	"title": string,
	"body": string,
	"userThatPosted": { "_id": ObjectID, "username": string },
	"comments": [objects]
}
```

## The comment object (stored as a sub-document in blog document)

```json
{
	"_id": new ObjectID(),
	"userThatPostedComment": { "_id": ObjectID, "username": string },
	"comment": string
}
```

## The user document: Use bcyrpy to hash the passowrd to store in the DB for signup and loging

```json
{
	"_id": new ObjectID(),
	"name": string,
	"username": string,
	"password": hashedPW
}
```

### Example blog post

```json
{
    "_id": "61294dadd90ffc066cd03bed",
    "title": "My experience Teaching JavaScript",
    "body": "This is the blog post body.. here is the actually blog post content.. blah blah blah.....",
    "userThatPosted": {_id: "61294dadd90ffc066cd03bee", username: "graffixnyc"},
    "comments": [
        {
            "_id": "61294dadd90ffc066cd03bef",
            "userThatPostedComment": {_id:"61294dadd90ffc066cd03bee", username: "graffixnyc"},
            "comment": "Thank you for all your wonderful comments on my blog post!"
        },
        {
            "_id": "61296014082fe5073f9ba4f2",
            "userThatPostedComment": {_id:"6129617a082fe5073f9ba4f5", username: "progman716"}
            "comment": "Very informative post!"
        }
    ]
}
```
