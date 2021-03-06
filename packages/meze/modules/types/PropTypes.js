import PropTypes from 'proptypes'

import iterable from './iterable'
import union from './union'
import intersection from './intersection'
import prop from './prop'
import composit from './composit'
import component from './component'
import componentOf from './componentOf'
import childOf from './childOf'
import childrenOf from './childrenOf'
import childrenOfType from './childrenOfType'

export const PropTypeLocationNames = {
  prop: 'prop',
  context: 'context',
  composition: 'composition'
}
export const TypeLocation = {
  prop: 'propTypes',
  context: 'contextTypes',
  composition: 'compositionTypes'
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
  }, {
    iterable,
    union,
    intersection,
    prop,
    composit,
    component,
    componentOf,
    childOf,
    childrenOf,
    childrenOfType
  })

function validatePropTypes (props, propTypes, componentName, location, handleError) {
  return Object.keys(propTypes)
    .reduce(
      (isValid, propName) => validateType(props, propTypes[propName], propName, componentName, location, handleError) && isValid,
      true
    )
}

function validateType (value, type, propName, componentName, location, handleError) {
  let err = type(value, propName, componentName, location)
  if (err) {
    handleError ? handleError(err) : void 0
    return false
  }
  return true
}

const rePropTypeError = /^([^\s]+) undefined `([^`]*)`/
const reComposiitonDirectionError = /^Invalid `composition` supplied to `([^`]*)`/
const reTypedComposiitonDirectionError = /^Invalid `composition` of type `([^`]*)` supplied to `([^`]*)`/
export function removeUndefinedPropTypeLocationMessage (ex) {
  ex.message = ex.message
    .replace(rePropTypeError, '$1 `$2`')
    .replace(reComposiitonDirectionError, '`Composition` of `$1` resulted in invalid type')
    .replace(reTypedComposiitonDirectionError, '`Composition` of `$2` resulted in invalid type `$1`')
  return ex
}

export const validate = (props, propTypes, componentName, location, handleError) => {
  return validatePropTypes(props, propTypes, componentName, location, handleError)
}
