import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import userService from '../../service/userService'
import { setUser } from '../../store/usersSlice'

function Profile() {
  const { username, email, image } = useSelector((select) => select.user)

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
      image: '',
    },
  })

  const dispatch = useDispatch()
  const [editUserRequest, { data, isSuccess, error: editError }] = userService.useEditUserMutation()
  const [errorImageLoading, setErrorImageLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (username && email)
      reset({
        username,
        email,
        password: '',
        image: image || '',
      })
  }, [username, email, image])

  useEffect(() => {
    if (isSuccess && data) {
      const { username: usernameResponce, email: emailResponce, token: tokenResponce, image: imageResponce } = data.user

      toast.success('Users data has updated')
      dispatch(
        setUser({
          username: usernameResponce,
          email: emailResponce,
          token: tokenResponce,
          image: imageResponce,
        }),
      )
      reset({
        username: usernameResponce,
        email: emailResponce,
        password: '',
        image: imageResponce,
      })
    }
  })
}

export default Profile
