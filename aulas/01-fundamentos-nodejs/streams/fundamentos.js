/** Importação de clientes via CSV (Excel)
 * 1gb - 1.000.000L
 * POST /upload import.csv
 * 
 * 10mb/s - 100s
 * 
 * 100s -> Inserções no banco de dados
 * 
 * 100bs -> 100.000L
 * 
 * Readable Streams (Leitura aos poucos de uma determinada requisição) / Writable Streams
 */


//  Streams -> 

// process.stdin
//     .pipe(process.stdout)

import { Readable } from 'node:stream'

class oneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        
        setTimeout(() => {
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i));
    
                this.push(buf)
            }
        }, 100)
    }
}

new oneToHundredStream()
    .pipe(process.stdout)