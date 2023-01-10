import { useForm, useFieldArray } from 'react-hook-form'
import classNames from "classnames";
import styles from './ArticleForm.module.scss'

function ArticleForm({ submitHandler, fetchedArticles }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: fetchedArticles?.title || '',
      description: fetchedArticles?.description || '',
      text: fetchedArticles?.text || '',
      tagList: fetchedArticles?.tagList || '',
    },
  })

  const {fields, append, remove} = useFieldArray({ name: 'tagList', control })

  const onSubmit = (submitData) => {
    const { title, description, text, tagList } = submitData

    submitHandler({
      article: { title, description, body: text, tagList: tagList.map((tag) => tag.name) },
    })
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label className='label'>
          Title
          <input
            placeholder='Title'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.title })}
            {...register('title', {
              required: 'Title is required',
              pattern: {
                value: 1000,
                message: 'Contains no more than 1000 words',
              },
            })}
          />
        </label>
        <p className='fieldError'>{errors?.title?.message?.toString()}</p>
        <label className='label'>
          Short description
          <input
            placeholder='Short description'
            type='text'
            className={classNames({ formInput: true, formInputError: errors.description })}
            {...register('description', {
              required: 'Short description is required',
            })}
          />
        </label>
        <p className='fieldError'>{errors?.description?.message?.toString()}</p>
        <label className='label'>
          Text
          <textarea
            placeholder='Text'
            className={classNames(styles.textarea, { formInput: true, formInputError: errors.title })}
            {...register('description', {
              required: 'Text is required',
            })}
          />
        </label>
        <p className='fieldError'>{errors?.text?.message?.toString()}</p>
      </form>
    </div>
  )
}

export default ArticleForm
