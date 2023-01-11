import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import userApi from '../../service/userApi'
import { setUser } from '../../store/usersSlice'
import styles from '../Profile/Profile.module.scss'
import SubmitButton from '../../components/SubmitButton'

function Profile() {
  const { username, email, image } = useSelector((selector) => selector.user)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
  })

  const dispatch = useDispatch()
  const [editUserRequest, { data, isSuccess, error: editError }] = userApi.useEditUserMutation()
  const [errorImageLoading, setErrorImageLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (username && email)
      reset({
        username,
        email,
        password: '',
        avatar: image || '',
      })
  }, [username, email, image])

  useEffect(() => {
    if (isSuccess && data) {
      const { username: usernameResponse, email: emailResponse, token: tokenResponse, image: imageResponse } = data.user

      toast.success('Users data has updated')
      dispatch(
        setUser({
          username: usernameResponse,
          email: emailResponse,
          token: tokenResponse,
          image: imageResponse,
        }),
      )
      reset({
        username: usernameResponse,
        email: emailResponse,
        password: '',
        avatar: imageResponse || '',
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (editError) {
      const { username: usernameError, email: emailError } = editError.data.errors

      if (usernameError) toast.error(`${usernameError}`)
      if (emailError) toast.error(`${emailError}`)
    }
  }, [editError])

  const formData =
    watch().username === username &&
    watch().email === email &&
    (watch().avatar === image || (watch().avatar === '' && image === null)) &&
    watch().password === ''

  const userImageRegister = {
    ...register('avatar', {
      pattern: {
        value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Address of this image is not correct',
      },
    }),
  }

  const onSubmit = (submitData) => {
    const { username: usernameSubmit, email: emailSubmit, password: passwordSubmit, avatar: avatarSubmit } = submitData

    editUserRequest({
      user: {
        username: usernameSubmit,
        email: emailSubmit,
        password: passwordSubmit,
        image: avatarSubmit,
      },
    })
  }

  return (
    <div className={classNames('window', styles.center)}>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.head}>Edit Profile</h3>
        <label className='label'>
          Username <span className={styles.required}>*</span>
          <input
            placeholder='Username'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.username })}
            defaultValue={username || ''}
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
        {errors?.username && <p className='fieldError'>{errors.username?.message?.toString()}</p>}
        {editError?.data.errors.username && <p className='fieldError'>{`${editError?.errors.username}`}</p>}
        <label className='label'>
          Email address <span className={styles.required}>*</span>
          <input
            placeholder='Email address'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.email })}
            defaultValue={email || ''}
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
        {errors?.email && <p className='fieldError'>{errors.email?.message?.toString()}</p>}
        {editError?.data.errors.email && <p className='fieldError'>{`${editError?.errors.email}`}</p>}
        <label className='label'>
          New password <span className={styles.required}>*</span>
          <input
            placeholder='New password'
            type='password'
            className={classNames({ formInput: true, formInputError: errors.password })}
            {...register('password', {
              required: 'New password is required',
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
        {errors?.password && <p className='fieldError'>{errors.password?.message?.toString()}</p>}
        <label className='label'>
          Avatar image (url)
          <input
            placeholder='Avatar image'
            className={classNames({ formInput: true, formInputError: errors.avatar })}
            defaultValue={image || ''}
            {...userImageRegister}
            onChange={(e) => {
              userImageRegister.onChange(e)

              if (e.currentTarget.value !== '') {
                setErrorImageLoading(false)
                setImageLoading(true)
              }
            }}
          />
        </label>
        {errors?.avatar && <p className='fieldError'>{errors.avatar?.message?.toString()}</p>}
        {formData && <p className={styles.editData}>Edit your data to save changes</p>}
        {watch().avatar === '' && image && (
          <p className={styles.editData}>
            If avatar field is empty, then your existing image deleted and turned to a default image
          </p>
        )}
        {watch().avatar !== '' && !errors?.avatar && (
          <img
            src={watch().avatar}
            onLoad={() => {
              setImageLoading(false)
              setErrorImageLoading(false)
            }}
            onError={() => {
              setImageLoading(false)
              setErrorImageLoading(true)
            }}
            className='img-loaded'
            alt='user-image'
          />
        )}
        {!errors?.avatar && errorImageLoading && !formData && !imageLoading && (
          <p className={styles.imageLoadingError}>
            Your link may be turned to non-existent image. Please check your image URL!
          </p>
        )}
        {!errorImageLoading && !formData && !imageLoading && watch().avatar !== '' && (
          <p className={styles.imageLoadingSuccess}>Your image URL correct!</p>
        )}
        {imageLoading && !errorImageLoading && watch().avatar && <p>Image loading...</p>}
        <div className={styles.submitButtonContainer}>
          <SubmitButton title='Save' />
        </div>
      </form>
    </div>
  )
}

export default Profile
