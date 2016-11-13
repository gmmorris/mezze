/* @flow */
import Meze from 'meze'
import pick from 'lodash.pick'

function emptyHandler (req, res, next) {
  res.status(500)
  res.send('Invalid Handler')
  next()
}

const createMethodComponent = method => Meze.Component(props => {
  const { server, children } = props
  const methodProps = pick(props, 'path', 'version')
  const handlers = children
    // create a handler for every child component
    ? Meze.Children.mapToArray(
        children,
        child => {
          function handler (req, res, next) {
            return Meze
              .compose(child.clone({ req, res, next }))
              .then(next)
          }

          if (child.props.handlerName) {
            handler.handlerName = child.props.handlerName
          }

          return handler
        }
      )
    : [ emptyHandler ]

  server[method](methodProps, ...handlers)
}, method)

export const Handler = Meze.Component(props => {
  const { res, req, children, next } = props
  return Meze.Children.cloneWithProps(children, { res, req, next, ...req.params })
}, 'Handler')

export const Get = createMethodComponent('get')
export const Head = createMethodComponent('head')
export const Put = createMethodComponent('put')
export const Post = createMethodComponent('post')
export const Delete = createMethodComponent('del')

export default {
  Get,
  Head,
  Put,
  Post,
  Delete,
  Handler
}
