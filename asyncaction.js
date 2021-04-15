const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const https = require('https');

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsresRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsresSucess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsresFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }

    }
}

//Action creator
const agent = new https.Agent({  
    rejectUnauthorized: false
   });

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsresRequest())
        axios.get('https://jsonplaceholder.typicode.com/users',{ httpsAgent: agent })
        .then(response => {
             //response.data 
             
             const users = response.data.map(user => user.name)
             dispatch(fetchUsresSucess(users))  
        })
        .catch(error => {
            //error.message
            dispatch(fetchUsresFailure(error.message))
        })
    }   
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())