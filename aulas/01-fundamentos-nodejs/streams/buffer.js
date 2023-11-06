// Representação de um espaço na memória do computador; usado especificamente para transitar dados de maneira rápida.

const buf = Buffer.from("ok");

console.log(buf); // <Buffer 6f 6b>

// O buffer converte valores em códigos hexadecimais binários, decimais e etc, ou seja, conversões mais de baixo nível, o que torna essa ação extremamente perfomática; 
// Sendo capaz de oferecer um 'buff' ao transitar recursos.