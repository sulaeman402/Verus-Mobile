/*
  The ledger reducer generally conatains coin information fetched from electrum
  calls and wallet information. The needsupdate booleans are to be set to true when the 
  program assumes some element of the ledger has changed and needs to be re-fetched, 
  and set to false again when that componenet updates.
*/

import { namesList } from '../utils/CoinData'
//TODO: Change this to get coin names from activeCoinForUser
//so that when people add custom coins they also get told to 
//update

export const ledger = (state = {
  balances: {},
  transactions: {},
  rates: {},
  needsUpdate: {balances: true, transactions: {}, rates: true},
  updateIntervalID: null
}, action) => {
  switch (action.type) {
    case 'SET_BALANCES':
      return {
        ...state,
        balances: action.balances,
        needsUpdate: {...state.needsUpdate, balances: false}
      };
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions,
        needsUpdate: {...state.needsUpdate, transactions: action.needsUpdateObj}
      };
    case 'SET_RATES':
      return {
        ...state,
        rates: action.rates,
        needsUpdate: {...state.needsUpdate, rates: false}
      };
    case 'BALANCES_NEED_UPDATE':
      return {
        ...state,
        needsUpdate: {...state.needsUpdate, balances: true}
      };
    case 'TRANSACTIONS_NEED_UPDATE':
      return {
        ...state,
        needsUpdate: {...state.needsUpdate, transactions: action.needsUpdateObj}
      };
    case 'RATES_NEED_UPDATE':
      return {
        ...state,
        needsUpdate: {...state.needsUpdate, rates: true}
      };
    case 'EVERYTHING_NEEDS_UPDATE':
      let _transactions = state.needsUpdate.transactions
      for (let i = 0; i < namesList.length; i++) {
        _transactions[namesList[i]] = true
      }
      return {
        ...state,
        needsUpdate: {balances: true, 
                      transactions: _transactions,
                      rates: true}
      };
    case 'SIGN_OUT':
      return {
        ...state,
        balances: {},
        transactions: {},
        rates: {},
      };
    case 'SET_INTERVAL_ID':
      return {
        ...state,
        updateIntervalID: action.updateIntervalID
      };
    default:
      return state;
  }
}