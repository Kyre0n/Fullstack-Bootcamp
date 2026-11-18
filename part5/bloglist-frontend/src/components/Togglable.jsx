import { forwardRef, useImperativeHandle, useState } from 'react'
const Togglable = forwardRef(({ children, buttonLabelShow, buttonLabelHide }, ref) => {
  const [Visible, setVisible] = useState(false)
  const hideWhenVisible = { display: Visible ? 'none' : '' }
  const showWhenVisible = { display: Visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!Visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabelShow}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{buttonLabelHide}</button>
      </div>
    </div>
  )
})
export default Togglable
