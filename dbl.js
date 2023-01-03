console.log(process.argv, process.argv[2]);

const double = (n) => n*2;
//console.log(double(10));

console.log(double(process.argv[2]));