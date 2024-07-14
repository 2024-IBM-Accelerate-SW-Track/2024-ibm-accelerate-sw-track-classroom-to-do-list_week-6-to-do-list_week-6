<<<<<<< HEAD
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/pb3pJxe_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15409930&assignment_repo_type=AssignmentRepo)
# Project: Week 6: To-do list application
## Introduction
As of now, you have completed Project Week 4 and now have a backend implementation where your todo lists are saved to a file. The next step is to create backend services that will return todo lists we have saved to file. If you run the solution from week 4 you'll notice that everytime you create new todo lists, the file they are stored in is updated, but your aren't able to see the currently existing todo lists stored.  By adding these new backend services this week we'll be able to see the stored todo list entries and allow users to query for specific todo lists. In this week's assignmment you'll create two backend services 1) return all todo lists, 2) return all todo lists with a specified name.


## Requirements
Feature requirements (Week5 task is complete when you):
+ Create a backend service to handle a GET request to return all todo lists
+ Create a backend service to handle a GET request to return todo lists that match the name sent as a parameter to this request
Optional
+ From the front-end call the back-end service to get all todo lists currently stored when a user opens the Home page
+ Create UI components (a textbox and a button) in the front-end to facilitate searching 

Implementation requirements:
+ Continue using the front-end and back-end frameworks from week 4.

## Instructions

### GET Service - Return all Services

#### Implementation

1. Open to-do-list/backend/server.js
2. Go to the GET listener "app.get("/get/items", getItems)"
3. At the comment "//begin here" copy/paste/type the following code to read in the todo lists stored in the database.json file:
```
    var data = await fsPromises.readFile("database.json");
```
4. Return a response to whoever called the data we just read in, we will return the data from the file but parsed as JSON data:
```
    response.json(JSON.parse(data));
```
#### Testing
We will test this service using the curl utility.  The curl utility is quite useful because it can send requests to services, simulating consuming applications that would utilize the backend service.

1. Stop the backend service if it's currently running (Ctrl-C the terminal/command window where you did the last "npm start" for the backend)
2. Start the backend service, go to the "to-do-list/backend" directory and install required packages and start the backend:
```
    npm install
    npm start
```

3. Open another terminal or command window.  Type this curl command to send a request to this service:
```
    curl http://localhost:8080/get/items
```

### GET Service - Search for and Return a ToDo List

#### Implementation
1. Open to-do-list/backend/server.js
2. Go to the GET listener "app.get("/get/searchitem",searchItems)"
3. On the line after the comment "//begin here" copy/paste/type the following code, this will retrieve a parameter passed to this service, this parameter will be the name of the Todo List we will search for:
```
    var searchField = request.query.taskname;
```
4. Continue editing this function by adding the following to read in the database 
```
    var json = JSON.parse (await fsPromises.readFile("database.json"));
```
5. Add the following to take the data from the database and apply a filter, this will seperate out only the Todo lists that match our search parameter given to the backend service and stored in "searchField":
```
    var returnData = json.filter(jsondata => jsondata.Task === searchField);
    
```
6. Whether we have data to return (i.e. todo lists that matches the name we're looking for) or not (i.e. there were no todo lists with the name), we return a response to whoever called this service with the following:
```
    response.json(returnData);
```

#### Testing


1. Stop the backend service if it's currently running (Ctrl-C the terminal/command window where you did the last "npm start" for the backend)

2. Start the backend service, go to the "to-do-list/backend" directory and install required packages and start the backend (you can skip the npm install if you ran that already above):
```
    npm install
    npm start
```

3. Open another terminal or command window.  
Contruct a curl command to search for a task: 
``` 
    curl 'http://localhost:8080/get/searchitem?taskname=<nametosearchfor>'
```

So for example, if you want to search for todo lists with a name of "hello", your command would be:
```
    curl 'http://localhost:8080/get/searchitem?taskname=hello'
```

If you want to search for a task name with a space in it, for example "hello world" you will need to use the html code for a space (%20) in your curl command, like this: 
```
    curl 'http://localhost:8080/get/searchitem?taskname=hello%20world'
```

The default for this project whould have a task name of "test" already, so to see a test succeed use this command:
```
        curl 'http://localhost:8080/get/searchitem?taskname=test'
        {"ID":0.6472388044816564,"Task":"test","Current_date":"Wed Jun 28 2023 16:48:12 GMT-0700 (Pacific Daylight Time)","Due_date":"6/28/2023"},{"ID":0.41905057483970887,"Task":"test","Current_date":"Wed Jun 28 2023 16:49:03 GMT-0700 (Pacific Daylight Time)","Due_date":"6/28/2023"},{"ID":0.3114460084164914,"Task":"test","Current_date":"Wed Jun 28 2023 17:01:54 GMT-0700 (Pacific Daylight Time)","Due_date":"6/28/2023"},{"ID":0.7516866721446989,"Task":"test","Current_date":"Thu Jun 29 2023 15:57:40 GMT-0700 (Pacific Daylight Time)","Due_date":"6/9/2023"}
```

### Optional - Use the UI to Call the Backend Service to Return All Todo Lists

#### Implementation
1. Open the front end component to-do-list/src/component/TodoData.js, on the line after the comment "//begin here" copy/paste/type the following code:
```
        const [todos, setTodos] = useState([]);
        
        useEffect( () => { 
            async function fetchData() {
                try {
                    const res = await Axios.get('http://localhost:8080/get/items'); 
                    setTodos(JSON.stringify(res.data));
                    console.log(JSON.stringify(res.data));
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }, []);
        return <div>{todos}</div>
```
2. Note the above code does a number of things, it makes use of the "useEffect" hook in react, and the await keyword, this combination is essentially telling react to wait for a call to a backend service to complete, then proceeds with the rest of the render.  Remember that nodeJS is an asynchronous platform, so statements can get executed before data is prepared and ready to return. In the case of our Axios.get above, if we didn't have the await in front of it then the rest of the code will proceed and attempt to render before our response is returned from the backend service.  To solve this we said that this function is asynchronous and hence we will receive a response from the backend service before proceeding.

3. An alternative is you could do something like we've seen in other services, store the response in state and update it as the data is returned, an example of this will be used in the search functionality next.

#### Testing

1. Go to the *to-do-list* directory, if this is the first time running the front-end for this week execute the following:
```
    npm install
    npm audit fix --force
```
2. Start the front end by running the following command in the *to-do-list* directory:
```
    npm start
```

3. Open *another* terminal or command window and go to the *to-do-list/backend* directory and run the backend:
```
    npm start
```

4. Go to a browser and open the front-end, if not open already, http://localhost:3000, this should bring up the home page. Go to the top navigation bar and click on the "TodoPage"

5. Notice on page load that the top of the page is populated with all of your tasks, saved from the backend service.

### Optional - Use the UI to search for a ToDo list

#### Implementation

1. Open the front end component to-do-list/src/component/SearchTodo.js, on the line after the comment "//begin here" copy/paste/type the following code:
```
            e.preventDefault();  
            // HTTP Client to send a GET request
            Axios({
            method: "GET",
            url: "http://localhost:8080/get/searchitem",
            headers: {
                "Content-Type": "application/json" 
            },
            params: {
                taskname: this.state.content
            }
            }).then(res => {
            this.setState({
                tmpdata: JSON.stringify(res.data),
                });
        
            });
```
2. Some things to note, there are some UI components defined in this file, the main things they will do is submit a form which will trigger the call to the searchitem backend service, as part of that submit we will take the name of the Todo to search for from the "this.state.content" parameter, the a user would type in the UI text box.
3. Note also we have state associated with this component "tmpdata", this state will be set to the data returned from the backend service via the "this.setState({tmpdata: JSON.stringify(res.data),});" code we just put in the HandleSubmit method.
4. We will use this state in the render function, underneath the search UI components you'll see "<div>{this.state.tmpdata}</div>", this is empty initially, because we haven't searched for anything, but once you supply a search parameter and click the "Search" button, we will set the state in the HandleSubmit, which will then update the state in our div to hold the return data from the backend service for the search.


#### Testing
1. Go to the *to-do-list* directory, if this is the first time running the front-end for this week execute the following:
```
    npm install
```
2. Start the front end by running the following command in the *to-do-list* directory:
```
    npm start
```

3. Open *another* terminal or command window and go to the *to-do-list/backend* directory and run the backend:
```
    npm start
```

4. Go to a browser and open the front-end, if not open already, http://localhost:3000, this should bring up the home page. Go to the top navigation bar and click on the "SearchPage" link.

5. Notice the input text box and button that will search for a Todo list in the backend. Type a task name that you know exists or doesn't exist and click the button. (Note if you left the frontend and backend services running after completing the lab steps above make sure you refresh the page so the changes you made load correctly in the browser)

6. Observe the returned value in the div section below the search UI, it will be updated in real-time after we submit the form, returning with the data obtained from the backend.

### Optional - Integration with Cloudant

*Note for this section you'll need an IBM Cloud account, so this might be something to try in later weeks when you will provision IBM Cloud accounts*

#### Create a Cloudant DB

1. Log in to IBM Cloud with your free/trial account.

2. Click "Catalog" along the top right of the page.

3. In the search bar type in "cloudant" and select the first option returned (the cloudant service).

4. Accept all the defaults and scroll to the bottom, the "Lite" plan should be selected which on the right side of the page shows as "free".

5. Click the "Create" button on the lower right side of the page.

6. The cloudant DB will create and make take some minutes to provision. You can view your cloudant resource from the hamburger menu on the top left -> "Resource List", then expand "Databases", your instance will be there and you can monitor it's provisioning progress, when it has a Status of "Active" then it's good to use.

7. Select your Cloudant DB from this page, you will now see a display for managing your cloudant DB. Copy the value for "External endpoint (preferred)".

8. Go to the left side tab and select "Service credentials", now click the "New credential" button, you can specify any name or the default, and select a role of "writer" for now, then click "Add".

9. Once your service credential is created expand it and you should see a number of lines of information, you'll want to copy the value of "apikey", for example:
```
"apikey": "cwo1uoJqYL-I8jb_rDTL333XCZFwu_T2yWVSOHvp_XK_",
```

We will want to copy the value:
```
cwo1uoJqYL-I8jb_rDTL333XCZFwu_T2yWVSOHvp_XK_
```

#### Initialize the Cloudant DB

1. Go to the backend directory and type:
```
npm install @ibm-cloud/cloudant
```

2. Create a cloudant credential with a role of 'writer', get API key from cloud console, use the drop down and copy the "apikey" field value


3. Set our cloudant environment variables, in a command window (this process may vary depending on what type of shell you're using) type the following (inserting the values you copied in the previous section):

```
CLOUDANT_URL= <the value from step 7 in the previous section>
export CLOUDANT_URL
CLOUDANT_APIKEY=<the value from step 9 in the previous section>
export CLOUDANT_APIKEY
```

4. Add the following to end of server.js after the '// Add initDB function here' code block:

```
async function initDB ()
{
    //TODO --- Insert to create DB
    //See example at https://www.npmjs.com/package/@ibm-cloud/cloudant#authentication-with-environment-variables for how to create db
    
    try {
        const todoDBName = "tododb";
        const client = CloudantV1.newInstance({});
        const putDatabaseResult = (
        await client.putDatabase({
        db: todoDBName,
      })
    ).result;
    if (putDatabaseResult.ok) {
      console.log(`"${todoDBName}" database created.`);
    }
  } catch (err) {
   
      console.log(
        `Cannot create "${todoDBName}" database, err: "${err.message}".`
      );

  }
};
```
5. Add toward the top of server.js under the "//Init code for Cloudant" comment

```
const {CloudantV1} = require('@ibm-cloud/cloudant');
if (useCloudant)
{
    initDB();
}
```

6. start the backend
```
npm start
```

7. In server.js near the top, set the useCloudant value from 'false' to 'true', like so:

```
const useCloudant = true;
```

8. What happened? You likely got an error stating "Access is denied due to invalid credentials.", if you look at the cloudant IAM roles [documentation](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-managing-access-for-cloudant#ibm-cloudant-roles-ai) "writer" does not have permission to create databases. Go to the cloudant management page in IBM cloud, create a new credential with a role of "manager". Copy the apikey value from this new role and set your environment variable to it.


9. stop the backend service, ctrl-c in the window its running in

10. Start the backend service again:
```
npm start
```

11. You should now see the database being create on startup:
```
npm start

> backend@1.0.0 start
> node server.js

Backend server live on 8080
"tododb" database created.
```

#### Store a Todo task in a Cloudant DB

1. In the server.js file add the following to the addItem function after the '//begin here for cloudant' code block:
```
            // Setting `_id` for the document is optional when "postDocument" function is used for CREATE.
            // When `_id` is not provided the server will generate one for your document.
            const todoDocument = { _id: id.stringify };
          
            // Add "name" and "joined" fields to the document
            todoDocument['task'] = task;
            todoDocument.curDate = curDate;
            todoDocument.dueDate = dueDate;
          
            // Save the document in the database with "postDocument" function
            const client = CloudantV1.newInstance({});
            console.log('Writing to: ', todoDBName)
            const createDocumentResponse = await client.postDocument({
              db: todoDBName,
              document: todoDocument,
            });
            console.log('Successfully wrote to cloudant DB');
```
#### Return all items from Cloudant

1. in the server.js file we're going to add code for cloudant to retrieve, but in an if/else block, if we are using cloudant go to cloudant to retrieve, otherwise use the local file as before. To make these changes easily, replace the entire getItems function in server.js as follows:

```
//** week 6, get all items from the json database*/
app.get("/get/items", getItems)
async function getItems (request, response) {
    //begin here

    //begin cloudant here
    if (useCloudant) {
    //add for cloudant client
    const client = CloudantV1.newInstance({});
    var listofdocs;
    await client.postAllDocs({
        db: todoDBName,
        includeDocs: true
    }).then(response => {
        listofdocs=response.result;
        });
    response.json(JSON.stringify(listofdocs));
    }
    else {
    //for non-cloudant use-case
    var data = await fsPromises.readFile("database.json");
    response.json(JSON.parse(data));
    }

};
```


#### Search a Todo Task in Cloudant

1. create index and design document in cloudant


2. In server.js replace your searchItems function code as follows:
```
//** week 6, search items service */
app.get("/get/searchitem", searchItems) 
async function searchItems (request, response) {
    //begin here
    var searchField = request.query.taskname;

    if (useCloudant){
        const client = CloudantV1.newInstance({});
        var search_results
        await client.postSearch({
            db: todoDBName,
            ddoc: 'newdesign',
            query: 'task:'+searchField,
            index: 'newSearch'
          }).then(response => {
            search_results=response.result;
            console.log(response.result);
          });
        console.log(search_results);
        response.json(JSON.stringify(search_results));
        
    }
    else {
    var json = JSON.parse (await fsPromises.readFile("database.json"));
    var returnData = json.filter(jsondata => jsondata.Task === searchField);
    response.json(returnData);
    }
};
```

#### Enable Cloudant code and test
1. If you haven't already set useCloudant to 'true', in server.js near the top, set the useCloudant value from 'false' to 'true', like so:

```
const useCloudant = true;
```

2. Stop the backend server if not already stopped with a cntrl-c, go to the backend directory on a command window and type:
```
npm start
```

3. Start the front-end UI if not already started, from a separate command window go to the top level directory to-do-list, and run:
```
npm start
```

4. Go to the browser and open the front-end url: localhost:3000

5. Try to add a todo item, you should see a message in the backend console after it's added:
```
Writing to:  tododb
Successfully wrote to cloudant DB
```

6. Click on the TodoPage menu link at the top of the webpage:

7. Click on the SearchPage menu link at the top of the webpage, input a task name to search for and observe results returned from cloudant:

=======
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/SmdVjiJ4)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15351622&assignment_repo_type=AssignmentRepo)
# Project Week 4: To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 3 and should now have a fully functional React Application with the ability to navigate to an **About me** page and a **Home** page hosting the Todo List Application. The Todo List Application itself allows users to provide a task with a due date, create a list with those user inputs to be displayed on a webpage, mark those task as complete and remove them from the list, and etc. Currently, all data which is essentially our tasks in this case lives in the front-end (Todo List Application). Everytime we refresh the page or restart our application that data is lost. This is where the backend component comes into play. The backend component will allow us to communicate to our front-end component (Todo List Application) using express and save our data inside a database (json file) where data will not be lost after a page refresh or application restart. For Project Week 4, you will go through the process of initializing and creating a backend component, using express to communicate with the front-end component, and using axios to communicate with backend component.

## Requirements
Feature requirements (Week 4 task is complete when you):
+ Create and Initialize an Express application (Backend)
+ Create a connection between the Backend and Front-end
+ Create a json file to represent your database
+ Create a **POST** request to submit data to a json file

Implementation requirements:
+ Use [**Express**](https://www.npmjs.com/package/express) within the backend component
+ Use [**Axios**](https://www.npmjs.com/package/axios) within the front-end component (Todo List Application)

## Instructions

### Express APP (Backend)
1. In this step, we will be going through the process of creating an Express application with in our Todo List Application. **Note:** From here on out, the term Backend will correspond to our Express Application, Front-end will correspond to our Todo List Application, and vice versa.
      + Navigate to our project's root directory and run the following command within the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
        1. Create a new folder called `backend` that will essentially host our Express application by running the following command: `mkdir backend`
      + Navigate to the newly created `backend` folder and run the following commands within the terminal. **Hint:** Currently, this directory should be empty with no such sub-folders or files present. **Hint** Run the command `cd backend` or similar to change directory.
        1. Run the following command to initialize your directory with some basic information: `npm init --yes`
        2. Run the following command to install Express as a dependency: `npm install express`
        3. Run the following command to install cors as a dependency: `npm install cors`\
           **Note:** Cors allows us to relax the security applied to an API. You can learn more about this module [**here**](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/)
        5. Create a new file called `index.js` out of which we'll run our Express server by running this command: `touch index.js`\
           **Note:** If this command doesn't work, look into creating the file through a file explorer or VS code.
         
      + The file structure of your project should now look similar to what is shown on the screenshot below:
        <img width="299" alt="Screen Shot 2022-06-23 at 6 25 55 AM" src="https://user-images.githubusercontent.com/57464095/175310108-65d0525c-c0b4-4432-8c12-a01ce7a0c05e.png">
           
2. In this step, we will be using Express to create a simple web server that will then be ran on a specified port.\
   **Note:** As you follow along with these sub-steps, place each snippet of code below the other.
      + Navigate to `backend/index.js`
        1. Implement the code snippet provided below:
           ```javascript
           const express = require("express"),
                  app = express(),
                  port = process.env.PORT || <port>,
                  cors = require("cors");
           const bodyParser = require('body-parser');
           const fs = require("fs").promises;
           ```
           **Note:** This snippet of code is importing external modules and reading the environment variables. Make sure to replace `<port>` with a port number of your choosing such as **8080** or **3001** keep note of this port number for future usage. Click on the following links [**express**](https://expressjs.com/en/5x/api.html), [**cors**](https://expressjs.com/en/resources/middleware/cors.html), [**body-parser**](https://expressjs.com/en/resources/middleware/body-parser.html), and [**fs**](https://nodejs.dev/learn/the-nodejs-fs-module) to learn more about these modules and their usage.
        2. Implement the code snippet provided below:
           ```javascript
           app.use(cors());
           app.use(bodyParser.json({ extended: true }));
           app.listen(port, () => console.log("Backend server live on " + port));
           ```
           **Note:** This snippet of code sets up our express application and returns a message back to console once our application is running.
        3. Implement the code snippet provided below:
           ```javascript
           app.get("/", (req, res) => {
               res.send({ message: "Connected to Backend server!" });
           });
           ```
           **Note:** This snippet of code returns a message once a **GET** request to the specified route is made.
         4. Implement the code snippet provided below:
            ```javascript
            app.post("/add/item", addItem)
            ```
            **Note:** This snippet of code makes a call the `addItem` function once a **POST** request to the specified route is made.
         5. Implement the code snippet provided below:
            ```javascript
            async function addItem (request, response) {
                try {
                    // Converting Javascript object (Task Item) to a JSON string
                    const id = request.body.jsonObject.id
                    const task = request.body.jsonObject.task
                    const curDate = request.body.jsonObject.currentDate
                    const dueDate = request.body.jsonObject.dueDate
                    const newTask = {
                      ID: id,
                      Task: task,
                      Current_date: curDate,
                      Due_date: dueDate
                    }

                    const data = await fs.readFile("database.json");
                    const json = JSON.parse(data);
                    json.push(newTask);
                    await fs.writeFile("database.json", JSON.stringify(json))
                    console.log('Successfully wrote to file') 
                    response.sendStatus(200)
                } catch (err) {
                    console.log("error: ", err)
                    response.sendStatus(500)
                }
            }
            ```
            **Note:** This snippet of code takes in a request body from the Todo List Application which represents a `todo` item. The body is then converted into a new json object called `newTask` to represent the new `todo` item. The new json object is finally appended to a json list located in a file called `database.json` to represent our `todos` list.
           
3. In this step, we will be creating a json file to act as our database and hold data submitted from our Front-end application once a user clicks on the **Add** button.
      + Navigate to the `backend` directory. **Hint:** This is the directory that only contains package.json, package-lock.json, and index.js files.
        1. Create a new file called `database.json` out of which we'll store the data received from the front-end by running this command: `touch database.json`\
           **Note:** If this command doesn't work, look into creating the file through a file explorer or VS code.
      + Navigate to `backend/database.json`
        1. Implement the code snippet provided below:
           ```
           []
           ```
           **Note:** The square brackets must be placed within this json file or we will receive an error when trying to append `todo` items within a list. Square brackets corresponds to an array.
      + The file structure of your project should now look similar to what is shown on the screenshot below:
        <img width="302" alt="Screen Shot 2022-06-23 at 11 27 59 AM" src="https://user-images.githubusercontent.com/57464095/175369370-5a323053-deff-43a3-ad1c-bca2918135f8.png">

### Todo List APP (Front-End)
1. In this step, we will be implementing axios in order to submit requests to the Express Application as well as to receive a response.
      + Navigate to our project's root directory and run the following command within the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
        1. Run the following command to install Axios as a dependency: `npm install axios`
      + Navigate to `src/component/AddTodo.js`
        1. Import the Axios library at the top of our file:
           ```javascript
           import Axios from "axios";
           ```
        2. In the handleSubmit function, implement the code snippets provided below before performing the **addTodo** action:
           ```javascript
           const jsonObject = {
              id: this.state.id,
              task: <value representing the task content>,
              currentDate: <value representing the date/time task was added>,
              dueDate: <value representing the date/time task is due>
           };
           ```
           **Note:** This snippet of code is creating a json object that will be used as a body request to be sent to the `addItem` function located in our Express application. Place this code snippet below the code snippet above and make sure to replace the comments with the updated values for the following remaining keys: `task`, `currentDate`, and `dueDate`.
           ```javascript
           Axios({
              method: "POST",
              url: "http://localhost:<port>/add/item",
              data: {jsonObject},
              headers: {
                 "Content-Type": "application/json"
              }
           }).then(res => {
              console.log(res.data.message);
           });
           ```
           **Note:** This snippet of code is making a **POST** request the `addItem` function located in our Express Application and returning a response message. Make sure to replace `<port>` with the port number that was used in the Express Application process such as **8080** or **3001**.

## Running Application
Upon completion of Week 4 Lab Project, all the necessary components and functions should be implemented in order to successfully send and receive data between the Client Side (Todo List Application) and Server side (Express Application). Now we will go through the steps in simplifying the process of setting up and and running your applications. 

1. Navigate to `package.json` file located in our project's root directory. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
   + Add the following scripts to the `scripts` property and save the file.
     ```
     "install-backend": "cd backend && npm install",
     "install-both": "npm install & npm run install-backend",
     "backend": "cd backend && node index.js",
     "start-both": "npm run backend & npm start"
     ```
   + The `package.json` file `scripts` property should now look similar to the screen shot shown below:
     ![Screen Shot 2022-06-24 at 12 31 47 AM](https://user-images.githubusercontent.com/57464095/175486138-37ee5abb-1409-4305-aeaa-eb821dff3781.png)

     **Note:** This configuration will allow us install all dependencies needed for both our Front-end and Backend application as well as running both application from one directory instead of creating multiple terminals.
     
2. Navigate to our project's root directory once again and run the following commands within the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
  + Run `npm run install-both` to install all dependencies for both applications (Todo List Application and Express Application)
  + Run `npm run start-both` to start up both applications (Todo List Application and Express Application)

**Optional:** To Test and see if your Express Application was implemented correctly, run the following command: `npm run backend`\
**Note:** Make sure all processes are terminated before running this command.
  + There should be no error message and a message similar to the screenshot provided below should be displayed:
    ![Screen Shot 2022-06-24 at 12 40 20 AM](https://user-images.githubusercontent.com/57464095/175487997-f8b2bd8c-8ee6-41bb-83da-f82f39c92dea.png)

## Pre-session Material
Here is a [**link**](https://ibm.box.com/s/250jt0y92fa8wvyyjsmmfsr9f3j8161c) to the pre-session material that was provided to you earlier.

## Optional Challenge
As a completely optional challenge of this lab, you can add support in your backend app to talk to a real database instead of the local file.

1. Setup MongoDB, a NoSQL Database, to run on your computer.
    1. [Follow the instructions here to install the Community Edition of MongoDB for your operating system.](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials)
    1. When you are not running the To-do list app, you do not need to run the `mongod` service. Remember to stop the service when you don't need it.
    1. Once installed, you can test that it works correctly by running `mongosh` in your terminal.
1. Install the [mongodb npm package](https://www.npmjs.com/package/mongodb) for your backend app. You'll need to use this to easily connect to mongodb from your code.
1. In order to maintain the existing functionality of using the JSON file for storage, implement a feature flag to switch between using the JSON file and mongodb.
    1. You can [read an environment variable in your code](https://nodejs.org/api/process.html#processenv) to decide when to use the file or mongo.
    1. Based on that variable, you can conditionally call your new code.
1. Import the package into your code. **Hint**: [follow the example code from the npm package web page](https://www.npmjs.com/package/mongodb#connect-to-mongodb)
1. When your app starts, load your collection object.
1. Use methods on the `collection` object to implement the creating a todo-list item in your app.
    1. [Creating objects](https://www.npmjs.com/package/mongodb#insert-a-document)
1. For future weeks, you can also implement this in the database for the functions.
    1. [Finding objects](https://www.npmjs.com/package/mongodb#find-documents-with-a-query-filter)
    1. [Updating objects](https://www.npmjs.com/package/mongodb#update-a-document)
    1. [Deleting objects](https://www.npmjs.com/package/mongodb#remove-a-document)
>>>>>>> week4/main
