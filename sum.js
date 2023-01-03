
const sum = (a,b) => a+b;
console.log(process.argv);
const [ , ,n1,n2] = process.argv;
console.log(sum(+n1,+n2));