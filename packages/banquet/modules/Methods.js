/* @flow */
import Meze from 'meze'
import pick from 'lodash.pick'

function emptyHandler (req, res, next) {
  res.send('Invalid Handler')
  next()
}

const createMethodComponent = method => Meze.Component(props => {
  const { server, children } = props
  const methodProps = pick(props, 'path', 'version')
  const handlers = children && children.length
    // create a handler for every child component
    ? Meze.Children.mapToArray(
        children,
        child => {
          function handler (req, res, next) {
            Meze
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
})

export const Handler = Meze.Component(props => {
  const { res, req, children, next } = props
  return Meze.Children.cloneWithProps(children, { res, req, next, ...req.params })
})

export const Get = createMethodComponent('get')
export const Head = createMethodComponent('head')
export const Put = createMethodComponent('put')
export const Post = createMethodComponent('post')
export const Delete = createMethodComponent('del')