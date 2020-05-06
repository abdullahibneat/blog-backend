## Blog backend
This application was built as part of the [FullStackOpen](https://fullstackopen.com/en/) online course. This express-based API allows users to save interesting blogs to a MongoDB database.
It can be seen in action at the following address: [https://blog-backend.abdullahibneat.now.sh/](https://blog-backend.abdullahibneat.now.sh/)

## Environment Variables
|Name|Value|
|--|--|
|MONGODB_URI|Address to MongoDB (e.g. mongodb+srv://user@cluster...)|
|TOKEN_SECRET|Secret for JWT|

To deploy to vercel:
- `now secrets add blog-backend-mongodb-uri mongodb+srv://uri-to-db`
- `now secrets add blog-backend-token-secret secret-for-jwt`

## API endpoints
|Endpoint|Details|
|--|--|
|/api/login|`POST /` Expects JSON request body in the format `{ username: "username", password: "password" }`. Returns JSON object `{ name: "the user's name", token: JWT signed token }`|
|/api/users|`GET /` Returns JSON of all users in the database in the format `[{ id: "123", name: "user's name", username: "john", blogs: [list of blogs] }]`<br><br>`GET /:id` Returns JSON of user with the specified id<br><br>`POST /` Allows a new user to be created. Expects a JSON request body in the format `{ name: "user's name", username: "username",  password: "password }`|
|/api/blogs|`GET /` Returns JSON of all blogs in the database in the format `{ id: "123", title: "title", author: "author", url: "link/to/article", likes: 2, comments: [all comments], user: { user who saved the article } }`<br><br>`POST /` Allows a new blog to be created. Request **must** have an Authorization header with the user's token. Expects a JSON request body in the format `{ title: "title", author: "author", url: "link/to/article" }`<br><br>`POST /:id/comments` Adds a new comment to the blog with the specified it. Expects a JSON request body in the format `{ comment: "new comment" }`<br><br>`DELETE /:id` Deletes the blog with the specified id. Request **must** have an Authorization header with the user's token. This action can only be performed successfully by the user who created the blog.<br><br>`PUT /:id` Updates a field of the blog with the specified id. Expects a JSON request with body `{ fieldToUpdate: "new value" }`|
|/api/testing|Available only when process.env.NODE_ENV = "test".<br><br>`POST /reset` Clears the User and Blog collections in the database.|


## MongoDB models
### Blog
|Field|Type|
|--|--|
|title|String **(required)**|
|author|String **(required)**|
|url|String **(required)**|
|likes|Number (default: 0)|
|user|Reference to User who stored this entry|
|comments|Array of String|

### User
|Field|Type|
|--|--|
|name|String **(required)**|
|username|String **(required)**|
|passwordHash|String **(required)**|
|blogs|Array of BlogID|
