const { sum, sub, mul, pow, div, mean } = require('../src/math')

test('add 4 and 6 together', ()=>{
    expect(sum(4,6)).toBe(10);
})
test('subtract 4 from 6', ()=>{
    expect(sub(6,4)).toBe(2);
})
test('multiply 4 and 6 together', ()=>{
    expect(mul(4,6)).toBe(24);
})
test('raise 2 to the power of 3', ()=>{
    expect(pow(2,3)).toBe(8);
})
test('divide 20 by 4', ()=>{
    expect(div(20,4)).toBe(5);
})
test('mean of 5,4,3,2,1', ()=>{
    expect(mean([5,4,3,2,1])).toBe(3);
})
