import { useRef } from 'react';
import * as actionType from './actions.js'; 

const initialState = {
    // Databse reducer
    tables: [], // List of all Tables   

    // Modal reducer
    editModal: false, 
    defaultData: {},
    tableName: '',  
    callback: () => {},

    // Authentication reducer
    authenticated: false,   
    username: '', 

    searchKeyword: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionType.FETCH_TABLES:
            const tableNames = action.payload.map((val, key) => {
                return val[Object.keys(val)[0]];
            }) 

            return {
                ...state,
                tables: tableNames,
            }  
        
        case actionType.SET_EDIT_MODAL:
            return {
                ...state,
                editModal: action.status,
                defaultData: action.defaultData,
                tableName: action.tableName, 
                callback: action.callback,
            }
        
        case actionType.DISABLE_EDIT_MODAL:
            state.callback();
            return {
                ...state,
                editModal: false,
            } 
            
        case actionType.SET_LOGIN_STAT:
            return{
                ...state,
                authenticated: action.condition,
                username: action.username,
            }

        case actionType.SEARCH: 
            return {
                ...state,
                searchKeyword: action.payload,
            }

        default:
            return state;
    } 
}   

export default reducer; 