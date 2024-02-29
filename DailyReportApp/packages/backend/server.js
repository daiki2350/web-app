const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./db/pool.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const session = require('express-session')

app.use(cors())
app.use(bodyParser.json())
const secret = 'daormcmsl'
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // 本番環境では secure: true にするべき
}));

app.post('/auth/login', async (req,res) => {
    const userName = req.body.userName
    const password = req.body.password

    const secretKey = crypto.randomBytes(16).toString('hex')
    console.log(secretKey)

    try{
      const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [userName, password]);
      if(result.rows.length>0){
        const userId = result.rows[0].id
        res.json({token: secretKey, userId: userId})
      }else {
        // 認証失敗の場合、エラーレスポンス
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
    
    
})

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'))
})

app.post('/auth/dataRegister', async (req,res) => {
  const userId = req.body.userId;
  const totalSales = req.body.totalSales;
  const netSales = req.body.netSales;
  const laborCost = req.body.laborCost;
  const purchaseCost = req.body.purchaseCost;
  const customers = req.body.customers;

  try {
    const result = await pool.query('INSERT INTO report (totalSales, netSales, laborCost, purchaseCost, customers, userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [totalSales, netSales, laborCost, purchaseCost, customers, userId]);
    res.json(result.rows[0])
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
})

app.post('/auth/report', async (req,res) => {
  const userId = req.body.userId
  console.log(userId)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()+1
  console.log(month)

  try{
    const a = await pool.query('SELECT totalSales FROM report WHERE userId = $1', [userId])
    const result = await pool.query('SELECT SUM(totalSales) AS allTotalSales, SUM(netSales) AS allNetSales, SUM(laborCost) AS allLaborCost, SUM(purchaseCost) AS allPurchaseCost, SUM(customers) AS allCustomers FROM report WHERE userId = $1 AND EXTRACT(MONTH FROM year_month) = $2 AND EXTRACT(YEAR FROM year_month) = $3', [userId, month, year])
    res.json(result.rows[0])
    console.log(a)
    console.log(result)
  }catch(err){
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
})



app.post('/auth/register', async (req,res) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log(username)

    try {
      // ユーザーをデータベースに挿入
      const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
  
      // 登録成功の場合、新しいユーザー情報を応答
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'server error' });
    }
})


app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error')
})

app.listen(3000, () => {
    console.log('start listening')
})