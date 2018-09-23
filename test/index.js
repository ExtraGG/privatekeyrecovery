import { assert } from 'chai'
import recover from '../src'

describe('Recover.', () => {
  it('should return the private key', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh'
    assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(')
  })

  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function'
    assert(awesomeFunction() === expectedVal, 'Named awesome :(')
  })
})
