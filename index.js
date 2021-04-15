console.log('Welcome to Redux tutorial!');
const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'

//------------- ACTION --------------------//
//Action Creator
/*
Having a action creator is not mandatory. But this will save you time later if the action name or property is modified. 
Say if the action is hardcoded in the dispatcher then if the action name is changes then we need to modify all the places.
But having a function created will make our life easy
*/
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// (previousState, action) => newState
const initialState = {
    numOfCakes: 10
}

//------------- REDUCER --------------------//
//If there are multiple properties in the state, best practice is to make a copy of the state using spread operation [...state]
//and then change the state 
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}


//------------- STORE --------------------//
/*
RESPONSIBILITIES
HOLDS APPLICATION STATE
ALLOWS ACCESS TO STATE VIA getState()
ALLOWS STATE TO BE UPDATED VIA dispatch(action)
REGISTERS LISTENERS VIA subscribe(lister)
HANDLES UNREGISTERING OF LISTNERS VIA FUNCTION RETURNED BY SUBCSRIBE(LISTERNER)
*/

const store = createStore(reducer)
console.log('Initial state',store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()