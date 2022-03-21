export interface Error {
  status:number;
  response:{
    message:string
  };
}
export interface Login {
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
