/* const { test } = require('node:test') // Forma de hacerlo con node, dejo todo el modulo comentado para tenerlo de referencia ahora que voy a cambiar a jest
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
}) */ // Forma de hacerlo con node, dejo todo el modulo comentado para tenerlo de referencia ahora que voy a cambiar a jest
const { reverse } = require('../utils/for_testing')
describe('reverse', () => {
  test('of a', () => {
    expect(reverse('a')).toBe('a')
  })

  test('of react', () => {
    expect(reverse('react')).toBe('tcaer')
  })

  test('of saippuakauppias', () => {
    expect(reverse('saippuakauppias')).toBe('saippuakauppias')
  })
})
