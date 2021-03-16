const express =require("express");
const bodyParser = require("body-parser")
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app =express()

const Routes = require('./routes/routerController')
const cors = require('cors')

app.use(bodyParser.json())
app.use('/email',Routes)
app.use(cors())
app.use(cors({origin:'http://localhost:3300'}))


const swagggerOptions ={
    swaggerDefinition:{
        info:{
            title:'email api',
            version: '1.0.0',
            description :'api to send email',
            contact:{
                name:'ange-parfait'
            },
            servers:["http://localhost:2000"]
        }
    },
    apis:["index.js"] //nom du fichier
};
const swaggerDocs= swaggerJsDoc(swagggerOptions)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))


/**
* @swagger
* /email:
*  get:
*   description: post a email
*   responses:
*     '200':
*       description: coucou
*/


/**
 * @swagger
 *
 * /email:
 *    post:
 *      description: post a email
 *      responses:
 *         "200":
 *           description: mesage send
 *         "400":
 *           description: email is not valid
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: email
 *          in: "body"
 *          required: true
 *          type: object
 */

app.listen(2000,()=>{
    console.log('server ruining on port 2000');
})