# Notice
This ia a fork of the original project maintained by Team Avengers of California State University Fullerton as a requirement for the Masters in Software Engineering program through the course Software Verification and Validation

The goal of this project was to use Enzyme as a unit testing tool to improve the client side unit tests of this fullstack application
Here is the status of all the unit tests:

[![Unit Tests with Enzyme](https://github.com/CSUF-Avengers/fullstack-tutorial/actions/workflows/webpack.yml/badge.svg)](https://github.com/CSUF-Avengers/fullstack-tutorial/actions/workflows/webpack.yml)

# Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:
- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```
## Unit Testing

To run the unit tests, run the command(after npm install)
```bash
    cd final/client && npm run test
```
