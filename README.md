# Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:
- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Usage

### Setting up server for Windows PCs
1. Ensure Python 3 is installed.
    * To check if installation exists, open command prompt and type in `py`.
    * You should see python version and some other information.
    * In the last line you should see three chevrons (`>>>`). This indicates python shell window is activated (also known as IDLE)
2. Delete `package-lock.json` file
3. Open `package.json` and under `dependencies` replace `"sqlite3": "^4.0.3"` with `"sqlite3": "^5.0.0"`
4. Open terminal at project location and navigate to `./start/server/` location
5. Run the command `npm install` to install all the dependencies
6. Now follow the tutorial at https://www.apollographql.com/docs/tutorial/introduction/

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```
