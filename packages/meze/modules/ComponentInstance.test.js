import test from 'ava'
import { spy } from 'sinon'
import ComponentInstance from './ComponentInstance'

// ComponentInstance tests
test('Component Instances cant be constructed twice', t => {
  const mount = new ComponentInstance(() => {}, 'SomeName', {})
  mount()
  t.throws(() => {
    mount()
  }, /A SomeName Component Instance cannot be mounted twice/)
})

test('ComponentInstance triggers the componentWillMount from the props just before mounting a component', t => {
  t.plan(3)

  const props = {
    componentWillMount: spy(),
    componentDidMount: spy(),
    componentWillUnmount: spy()
  }

  const constructor = function () {
    t.truthy(props.componentWillMount.calledOnce)
    t.truthy(props.componentDidMount.notCalled)
    t.truthy(props.componentWillUnmount.notCalled)
  }

  const mount = new ComponentInstance(constructor, '', props)
  mount()
})

test('ComponentInstance triggers the componentDidMount from the props just after mounting a component', t => {
  t.plan(3)

  const props = {
    componentDidMount: spy()
  }

  const result = { a: 1 }

  const constructor = function () {
    t.truthy(props.componentDidMount.notCalled)
    return result
  }

  const mount = new ComponentInstance(constructor, '', props)
  mount()
  t.truthy(props.componentDidMount.calledOnce)
  t.truthy(props.componentDidMount.calledWith(result))
})

test(`ComponentInstance triggers props.componentWillUnmount after it's result has been fully composed passing the result as argument`, async t => {
  t.plan(4)

  const props = {
    componentWillUnmount: spy()
  }

  const result = { data: true }

  const constructor = function () {
    t.truthy(props.componentWillUnmount.notCalled)
    return result
  }

  const mount = new ComponentInstance(constructor, '', props)
  const { onComposed, composition } = mount()
  t.truthy(props.componentWillUnmount.notCalled)
  await onComposed(Promise.resolve(composition))
    .then(x => {
      t.truthy(props.componentWillUnmount.calledOnce)
      t.truthy(props.componentWillUnmount.calledWith(result))
    })
})

test(`ComponentInstance triggers props.componentFailedMount after it's result has rejected`, async t => {
  t.plan(3)

  const props = {
    componentFailedMount: spy()
  }

  const thrownError = Error('Holly Moly')

  const constructor = function () {
    throw thrownError
  }

  const mount = new ComponentInstance(constructor, '', props)
  t.throws(mount().composition)
  t.truthy(props.componentFailedMount.calledOnce)
  t.truthy(props.componentFailedMount.calledWith(thrownError))
})
