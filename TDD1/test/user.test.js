const userDetails = require('../src/user')

test('user details', ()=>{
    expect(userDetails().firstname).toBe('Excel')
    expect(userDetails().lastname).toBe('ExcelT')
    expect(userDetails()).toHaveProperty('age')
    expect(userDetails().age).toBe(25)
    expect(userDetails().height).toBeLessThan(130)
})