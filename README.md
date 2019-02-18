# Pricetrack

![some gif](https://thumbs.gfycat.com/RectangularIllfatedKitty-size_restricted.gif)

This is a frontend for Pricetrack application.<br>
[Backend part of the application can be found here](https://github.com/iamterec/pricetrack_api)

## About Pricetrack
This application will allow you to track some numeric information from third party sites.
You just need to fill page url and css selector and application will parce matched numeric information every hour and save to database.
You will able to see this information in graph and table.

## Used technologies
This fronend part of the application built on top of React and Redux. It also uses D3.js, reselect, react-router, redux-thunk, validator and gapi for authentication with google. <br>

## How to run this
It uses [create-react-app](https://github.com/facebook/create-react-app) so you can type:
```shell
npm start
```
to run the app in the development mode.<br>
Or:

```shell
npm run build
```
to build the app for production to the `build folder`.
