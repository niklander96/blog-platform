import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import userApi from '../../service/userApi'
import { setUser } from '../../store/usersSlice'
import { setToken } from '../../utils/getToken'
import SubmitButton from '../../components/SubmitButton'

import styles from './Registration.module.scss'

import '../../index.scss'
// eslint-disable-next-line import/order
import elementsRoutes from '../../routes'

function Registration() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: 'all' })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [registrationRequest, { data, isSuccess, error: authError }] = userApi.useRegistrationMutation()

  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, token } = data.user

      toast.success('You have logged')
      dispatch(setUser({ username, email, token, image: null }))
      setToken(token)
      navigate(`${elementsRoutes.HOME}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (authError) {
      const { username: usernameError, email: emailError } = authError.data.errors
      if (usernameError) toast.error(`Username ${usernameError}`)
      if (emailError) toast.error(`Email ${emailError}`)
    }
  }, [authError])

  const onSubmit = (submitData) => {
    const { username, email, password } = submitData

    registrationRequest({ user: { username, email, password } })
  }

  return (
    <div className={classNames('window', styles.center)}>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.head}>Create new account</h3>
        <label className='label'>
          Username
          <input
            placeholder='Username'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.username })}
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Use only lowercase English letters and numbers',
              },
              minLength: {
                value: 3,
                message: 'Your username need to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your username must be no more than 20 characters',
              },
            })}
          />
        </label>
        {errors?.username && <p className='fieldError'>{errors?.username?.message?.toString()}</p>}
        {authError?.data.errors.username && (
          <p className='fieldError'>{`Username ${authError?.data.errors.username}`}</p>
        )}
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
        {authError?.data.errors.email && <p className='fieldError'>{`Email ${authError?.data.errors.email}`}</p>}
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
        <label className='label'>
          Repeat Password
          <input
            placeholder='Repeat Password'
            type='password'
            className={classNames({ formInput: true, formInputError: errors.passwordRepeated })}
            {...register('passwordRepeated', {
              required: 'Repeat Password is required',
              validate: (value) => value === String(getValues().password) || 'Passwords must match',
            })}
          />
        </label>
        {errors?.passwordRepeated && <p className='fieldError'>{errors?.passwordRepeated?.message?.toString()}</p>}
        <div className={styles.agreement}>
          <input
            type='checkbox'
            className={styles.checkbox}
            id='agreement-checkbox'
            {...register('agreement', {
              required: 'Agreement is required',
            })}
          />
          <label htmlFor='agreement-checkbox' className={styles.labelCheckbox}>
            I agree to the processing of my personal information
          </label>
        </div>
        {errors?.agreement && <p className='fieldError'>{errors?.agreement?.message?.toString()}</p>}
        <div className={styles.submitButtonContainer}>
          <SubmitButton title='Create' />
        </div>
        <p className={styles.haveAccount}>
          Already tou have an account?{' '}
          <Link to={`${elementsRoutes.SIGN_IN}`} className={styles.signIn}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Registration
