# Instructions to run locally

## Frontend
I recommend install `nvm` before running the project. 
#### here how to install `nvm`
```
brew upgrade
brew install nvm
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"' >> ~/.zshrc
echo '[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && \. "$(brew --prefix nvm)/etc/bash_completion.d/nvm"' >> ~/.zshrc
source ~/.zshrc
```

### Run these settings first
- `nvm install 8.11.3`
- `nvm use 8.11.3`  
- `npm install -g yarn`

### Project
- Create an .env file. in `book-web/.env` 
- Add the value: `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000` and `SERVER_API_URL=http://127.0.0.1:8000` 
- run `yarn install`
- run `yarn dev` here you should be able to see the front app running in the port :3000

### Unit test
All the components related to the test they have unit test. I didn't add tests for `book-web-app/src/components/ui` because they are components created by 
Chakra UI CLI so since they come from a package I decided to omit the tests. 

I used React testing library and Jest

To run the unit tests
- Go to the path `book-web-app`
- run `nvm use` 
- run `yarn test`


## Backend 
- Create a local Posgress data base
- create a .env file.`bookApi/.env`
- add the value for `DATABASE_URL = 'DB connection url'`


WHen the database is ready we can check this:

- Create a virtual env in the root project
- `python3 -m venv venv`
- `source venv/bin/activate`
- when the virtual env is ready please install the packages. 
- `pip install -r bookApi/requirements.txt`
- run the app `uvicorn bookApi.main:app --reload`


### unit tests
- please be sure you are in bookApi folder
- check that the you activated the virtual env
- create a .env.test file
- add the following in the file `DATABASE_URL="sqlite:///test.db"` this will use the connection for the local db in test env
- run this `TEST_ENV=true pytest` (The flag will allow us to use the .env.test file)



# Run app using docker
- run the command `docker-compose up --build` this will create the docker images for the app and will expose the frontend and backed endpoints. 
- to validate the frontend you just go to http://localhost:3000

Any question reach Cayetano Rosales. 
