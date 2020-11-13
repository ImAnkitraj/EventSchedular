const express = require('express');
const env = require('dotenv').config()
const { graphqlHTTP } = require('express-graphql');
const  bodyParser = require('body-parser');
const mongoose = require("mongoose");

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth  = require('./middleware/isAuth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})
app.use(isAuth);

app.use('/graphql',graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
}));

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Db connected')
    app.listen(process.env.PORT, function(){
        console.log('Server started')
    });
    
}).
catch(err => {
    console.log(err);
    console.log("Not connected")
})




