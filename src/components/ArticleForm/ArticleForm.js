import { useForm, useFieldArray } from 'react-hook-form'
import classNames from 'classnames'

import styles from './ArticleForm.module.scss'
import '../../index.scss'

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
      tagList: fetchedArticles?.tagList || [],
    },
  })

  const { fields, append, remove } = useFieldArray({ name: 'tagList', control })

  const onSubmit = (submitData) => {
    const { title, description, text, tagList } = submitData

    submitHandler({
      article: { title, description, body: text, tagList: tagList.map((tag) => tag.name) },
    })
  }

  return (
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
      <p className='fieldError'>{errors.title?.message?.toString()}</p>
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
      <p className='fieldError'>{errors.description?.message?.toString()}</p>
      <label className='label'>
        Text
        <textarea
          placeholder='Text'
          className={classNames(styles.textarea, { formInput: true, formInputError: errors.text })}
          {...register('description', {
            required: 'Text is required',
          })}
        />
      </label>
      <p className='fieldError'>{errors.text?.message?.toString()}</p>
      <label className='label'>Tags</label>
      {fields.length === 0 && (
        <div>
          <input
            type='button'
            value='Add tags'
            className={classNames(styles.tagButton, styles.addTagButton)}
            onClick={() => append({ name: '' })}
          />
        </div>
      )}
      {fields.map((field, fieldIndex) => (
        <div className={styles.tag} key={field.id}>
          <div>
            <input
              type='text'
              placeholder='Tag'
              defaultValue={fields.length}
              {...register(`tagList.${fieldIndex}.name`, {
                required: 'Tag is required',
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Use only English letters and numbers',
                },
                validate: (tagValue) =>
                  !getValues()
                    .tagList.map((tagObject) => tagObject.name)
                    .filter((_, currentTagIndex) => fieldIndex !== currentTagIndex)
                    .includes(tagValue) || 'Tag must be unique!',
              })}
              className={classNames(styles.tagInput, {
                formInput: true,
                formInputError: errors?.tagList?.[fieldIndex],
              })}
            />
            <input
              type='button'
              value='Delete'
              className={classNames(styles.tagButton, styles.deleteTagButton)}
              onClick={() => remove(fieldIndex)}
            />
            {fields.length - 1 === fieldIndex && (
              <input
                type='button'
                value='Add tag'
                className={classNames(styles.tagButton, styles.addTagButton)}
                onClick={() => append({ name: '' })}
              />
            )}
          </div>
          {errors?.tagList?.[fieldIndex] && (
            <p className={classNames('fieldError', styles.tagError)}>
              {errors?.tagList?.[fieldIndex]?.name?.message?.toString()}
            </p>
          )}
        </div>
      ))}
      <button type='submit' className={classNames(styles.submitButton)}>
        Send
      </button>
    </form>
  )
}

ArticleForm.defaultProps = {
  fetchedArticleData: null,
}

export default ArticleForm
