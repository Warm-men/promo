export default class TextBox extends React.Component {
  state = { textValue: '' }

  _textareaOnChange = e => {
    const value = e.currentTarget.value
    const {
      updateOnChange,
      textareaMaxlength,
      upSingleWithTextValue
    } = this.props
    if (value.length <= textareaMaxlength) {
      this.setState({ textValue: value })
      upSingleWithTextValue && upSingleWithTextValue(value)
      updateOnChange && updateOnChange(value)
    }
  }

  render() {
    const { placeholder, textareaMaxlength, height, onBlur } = this.props
    const { textValue } = this.state
    return (
      <div style={{ height: height + 25 }} className="textarea-wrapper">
        <textarea
          onChange={this._textareaOnChange}
          type="text"
          maxLength={textareaMaxlength}
          placeholder={placeholder}
          value={textValue}
          style={{ height }}
          onBlur={onBlur}
        />
        <div>{`${textValue ? textValue.length : 0}/300`}</div>
      </div>
    )
  }
}
