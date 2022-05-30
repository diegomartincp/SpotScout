export interface login_return{
    status: string,
    user: User
    authorisation:Authorisation
}
export interface Authorisation{
  token: string,
  type:string
}
export interface User{
  id: string,
  name: string,
  email: string,
  validado:boolean
}
