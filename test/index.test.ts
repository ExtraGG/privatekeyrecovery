require("source-map-support").install();
import recover from '../src/index';

describe('Recover.', () => {
  it('should return the private key', () => {
    const expectedVal = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1'
    const atTheEnd = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????'
    expect(recover(atTheEnd, 100000, 55000000)).toBe(expectedVal)
  })
  it('should return the private key', () => {
    const allOverThePlace = 'KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1'
    const expectedVal = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1'
    expect(recover(allOverThePlace, 100000, 571000000)).toBe(expectedVal)
  })
  it('should return the private key', () => {
    const atTheBeginning = '?????X9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1';
    const expectedVal = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1'
    expect(recover(atTheBeginning, 100000, 492300000)).toBe(expectedVal)
  })
})
