import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import reducerBokmaList, { actionAsyncRefleshList } from './models/bokmaList'
//
// let store = createStore(reducerBokmaList,
//   applyMiddleware(thunk),
// )
//
// export default store