import PropTypes from 'proptypes'
import difference from 'lodash.difference'

export const PropTypeLocationNames = {
  prop: 'prop',
  context: 'context'
}
export const TypeLocation = {
  prop: 'propTypes',
  context: 'contextTypes'
}

const TYPES_TO_EXPOSE = [
  'array',
  'bool',
  'func',
  'number',
  'object',
  'string',
  'any',
  'arrayOf',
  'instanceOf',
  'objectOf',
  'oneOf',
  'oneOfType',
  'shape'
]

export default TYPES_TO_EXPOSE
  .reduce((propTypesToExpose, propTypeKey) => {
    propTypesToExpose[propTypeKey] = PropTypes[propTypeKey]
    return propTypesToExpose
  }, {})

function validatePropTypes (props, propTypes, componentName, location, handleError) {
  return Object.keys(propTypes)
    .reduce((isValid, propName) => {
      let err = propTypes[propName](props, propName, componentName, location)
      if (err) {
        handleError ? handleError(err) : void 0
        return false
      }
      return isValid
    }, true)
}

export const validate = (props, propTypes, componentName, location, handleError) => {
  if (process.env.NODE_ENV !== 'production') {
    return validatePropTypes(props, propTypes, componentName, location, handleError)
  }
  return true
}