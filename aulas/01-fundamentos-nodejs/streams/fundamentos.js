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