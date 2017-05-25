const sql = require('mssql')
 
async () => {
    try {
        const pool = await sql.connect('mssql://username:password@localhost/database')
        const result = await sql.query`select * from mytable where id = ${value}`
        console.dir(result)
    } catch (err) {
        // ... error checks 
    }
}

//I7 - MARCIO\SQLEXPRESS