import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '720053',
  database: 'turtle_app',
})
