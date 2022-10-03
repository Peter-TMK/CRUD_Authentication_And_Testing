const sum = (a,b)=>{
    return a+b;
}
const sub = (a,b)=>{
    return a-b;
}
const mul = (a,b)=>{
    return a*b;
}
const pow = (a,b)=>{
    return a ** b;
}
const div = (a,b)=>{
    return a/b;
}
const mean = (arr)=>{
    let sum = 0;

    arr.forEach(num => {
        sum += num
    })
    return sum/arr.length
}

module.exports = {
    sum, sub, mul, pow, div, mean
}