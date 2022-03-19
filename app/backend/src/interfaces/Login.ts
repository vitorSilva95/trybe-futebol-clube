export default interface Login {
  user: {
    id: number;
    username: string,
    role: string,
    email: string,
  }
  token:string
}
