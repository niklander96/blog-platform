import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import userApi from '../../service/userApi'
import { setUser } from '../../store/usersSlice'
import { setToken } from '../../utils/getToken'
import styles from '../Login/Login.module.scss'
import '../../index.scss'
import SubmitButton from '../../components/SubmitButton'
import elementsRoutes from '../../routes'

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'all' })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginRequest, { data, isSuccess, error: authError }] = userApi.useLoginMutation()

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token, image } = data.user

      toast.success('You have logged in')
      dispatch(setUser({ username, email, token, image }))
      setToken(token)
      navigate(`${elementsRoutes.HOME}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (authError) {
      toast.error('Email or password is not correctly!')
    }
  }, [authError])

  const onSubmit = (submitData) => {
    const { email, password } = submitData
    loginRequest({ user: { email, password } })
  }

  return (
    <div className={classNames('window', styles.center)}>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.head}>Sign In</h3>
        <label className='label'>
          Email address
          <input
            placeholder='Email address'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.email })}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-control-regex
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-] *[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-\9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-\9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: 'Please, enter your correct email',
              },
            })}
          />
        </label>
        {errors?.email && <p className='fieldError'>{errors?.email?.message?.toString()}</p>}
        <label className='label'>
          Password
          <input
            placeholder='Password'
            type='password'
            className={classNames({ formInput: true, formInputError: errors.password })}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password need to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password must be no more than 40 characters',
              },
            })}
          />
        </label>
        {errors?.password && <p className='fieldError'>{errors?.password?.message?.toString()}</p>}
        <div className={styles.submitButtonContainer}>
          <SubmitButton title='Login' />
        </div>
        <p className={styles.dontHaveAccount}>
          Already tou have an account?{' '}
          <Link to={`${elementsRoutes.SIGN_UP}`} className={styles.signUp}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
