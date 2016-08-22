import test from 'ava'

import Eunoia from '../src/Component'
import { composeTree } from '../src/ComponentTree'

test('flattenss a tree of components to get passed their internal promises', async t => {
  const Complex = Eunoia.Component(function (props, children) {
    const { left, right } = props
    const val = left < right
      ? 'smaller'
      : (left > right
        ? 'larger'
        : 'equal')
    return val
  })

  const Root = Eunoia.Component(function (props, children) {
    const { left, right } = props
    return {
      left,
      right,
      comparison: Eunoia.createComponent(Complex, {left, right})
    }
  })

  t.deepEqual(
    await composeTree(Eunoia.createComponent(Root, { left: 40, right: 50 })),
    { left: 40, right: 50, comparison: 'smaller' }
  )
})
