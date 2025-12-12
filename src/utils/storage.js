// small wrapper for localStorage keys
const USERS_KEY = 'lm_users_v1'
const LOANS_KEY = 'lm_loans_v1'
const AUTH_KEY = 'lm_auth_user_v1'


export function seedInitial(users, loans){
if(!localStorage.getItem(USERS_KEY)) localStorage.setItem(USERS_KEY, JSON.stringify(users))
if(!localStorage.getItem(LOANS_KEY)) localStorage.setItem(LOANS_KEY, JSON.stringify(loans))
}


export function getUsers(){
return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}
export function saveUsers(users){
localStorage.setItem(USERS_KEY, JSON.stringify(users))
}


export function getLoans(){
return JSON.parse(localStorage.getItem(LOANS_KEY) || '[]')
}
export function saveLoans(loans){
localStorage.setItem(LOANS_KEY, JSON.stringify(loans))
}


export function saveAuth(user){
localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}
export function getAuth(){
return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')
}
export function clearAuth(){
localStorage.removeItem(AUTH_KEY)
}