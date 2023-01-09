import classNames from 'classnames'

import styles from '../../pages/Registration/Registration.module.scss'

function SubmitButton({ title, disabled }) {
  return (
    <button
      type='submit'
      className={classNames(styles.submitButton, { [styles['submitButtonDisabled']]: disabled })}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

SubmitButton.defaultProps = {
  disabled: false,
}

export default SubmitButton
