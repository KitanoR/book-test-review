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
- Add the value: `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000` this will connect the NextAPP with the backend, it can be any url, but the example provider here is the default one.
- run `yarn install`
- run `yarn dev` here you should be able to see the front app running in the port :3000


### Backend 
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


Any question reach Cayetano Rosales. 

