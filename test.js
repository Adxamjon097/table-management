let str = "5*SUM(C1:C3)+SUM(C1:C4)";

console.log (str.match(/SUM\((.*?)\)/));

while (str.match(/SUM\((.*?)\)/)){
    str = str.replace(/SUM\((.*?)\)/, 11);
}

console.log (str);