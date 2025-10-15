export interface IUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_metadata?: any
  id?: string | undefined
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  img_url?: string
}
