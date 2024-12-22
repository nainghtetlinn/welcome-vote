import { login } from './action'

const Login = () => {
  return (
    <form>
      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        name='email'
        type='email'
        required
      />
      <label htmlFor='password'>Password:</label>
      <input
        id='password'
        name='password'
        type='password'
        required
      />
      <button formAction={login}>Log in</button>
    </form>
  )
}

export default Login
