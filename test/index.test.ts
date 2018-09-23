var index = require('../src/index')

describe('Recover.', () => {
  it('should return the private key', () => {
    const expectedVal = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1'
    expect(index.recover('KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy')).toBe(expectedVal)
  })
})
