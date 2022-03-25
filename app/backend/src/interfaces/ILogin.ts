export interface IError {
  status:number;
  response:{
    message:string
  };
}
export interface ILogin {
  status:number
  response: {
    user: {
      id: number;
      username: string,
      role: string,
      email: string,
    }
    token:string
  }
}
