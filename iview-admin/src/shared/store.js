import { createStore } from 'redux';

let reducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
        // 设置 Token
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
    }
}

const store = createStore(reducer)

store.dispatch({
    type: 'SET_TOKEN',
    payload: 'Read the 123123'
})

console.log(store.getState())

// TS 版本
// 接口 State
// type State = {
//   //  可选属性
//   token?: string;
// };
//
// type Action = {
//   type: string;
//   payload: any;
// };

// const reducer = (state: State = {}, action: Action): State => {
//     switch (action.type) {
//     default:
//         return state;
//     // 设置 Token
//     case 'SET_TOKEN':
//         return {
//             ...state,
//             token: action.payload
//         };
//     }
// };
//
// const store = createStore<State, Action, unknown, unknown>(reducer);

export default store;
