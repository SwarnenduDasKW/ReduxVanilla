const axios = require('axios')
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false
   });

axios.get('https://jsonplaceholder.typicode.com/users',{ httpsAgent: agent })
        .then(response => {
             //response.data 
             console.log('data',response)
            
        })
        .catch(error => {
            //error.message
            console.log(error.message)
        })