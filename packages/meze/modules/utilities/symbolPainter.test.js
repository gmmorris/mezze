import test from 'ava'

import symbolPainter from './symbolPainter'

test('should expose a function', t => {
  t.is(typeof symbolPainter, 'function')
})

test('the default function creates custom versions of the paint, painted and clean functions', t => {
  const customPainter = symbolPainter('customPaint')
  t.is(typeof customPainter.paint, 'function')
  t.is(typeof customPainter.painted, 'function')
  t.is(typeof customPainter.clean, 'function')
})

test('paint adds a symbol marker to the object it receves as an arg', t => {
  const customPainter = symbolPainter('customPaint')
  const obj = {}
  const paintedObj = customPainter.paint(obj)
  t.deepEqual(obj, paintedObj)
  t.true(customPainter.painted(paintedObj))
})

test('clean removes the symbol marker from the object it receives as an arg', t => {
  const customPainter = symbolPainter('customPaint')
  const obj = {}
  let paintedObj = customPainter.paint(obj)
  paintedObj = customPainter.clean(paintedObj)
  t.false(customPainter.painted(paintedObj))
})

test('paint sets a value under the painted symbol', t => {
  const customPainter = symbolPainter('customPaint')
  const obj = {}
  let paintedObj = customPainter.paint(obj, 'jumbo')
  t.is(customPainter.paintedBy(paintedObj), 'jumbo')
})
