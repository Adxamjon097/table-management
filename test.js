let first = "C1";

let letter = first.match(/[A-Z]+/) ? first.match(/[A-Z]+/)[0] : null;
let num = first.match(/[0-9]+/) ? Number.parseInt(first.match(/[0-9]+/)[0]) - 1 : null;

let variable = "";

if (Number.parseInt(num / 26) > 0)
    variable = String.fromCharCode(97 + Number.parseInt(num / 26) - 1);
else
    variable = "";

variable += String.fromCharCode(97 + (num % 26));

variable = letter + variable;