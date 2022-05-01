# API Server

## Running the backend server and linking with React

### Steps:
* Run the django application
```
python manage.py runserver
```
* Open the api folder in React application and change the baseURL to the localhost and port number your django application is running in. 
http://127.0.0.1:8000/


# React

## Cloning the React Repo and running it in a local machine

### Steps:
 * Clone the repo
 * Delete node_modules package-lock.json file (if present). But, not the package.json file.
 * Be inside the directory of package.json and run:
 ```
 npm install
 ```
 * if an error occurs saying: ERESOLVE unable to resolve dependency tree, then run:
 ```
 npm install --legacy-peer-deps
 Or,
 npm install --save --legacy-peer-deps
 ```
 * Finally, Run the application.
```
npm start
```






