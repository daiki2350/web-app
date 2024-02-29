import client from './client'

export default {
  login: authInfo => {
    return new Promise((resolve, reject) => {
      client.post("http://localhost:3000/auth/login", authInfo)
        .then(res => {
          if (res.data && res.data.token) {
            console.log(res.data)
            resolve({ token: res.data.token, userId: res.data.userId });
          } else {
            reject(new Error("Invalid response data"));
          }
        })
        .catch(err => {
          if (err.response) {
            // HTTPエラーの場合
            reject(new Error(err.response.data.message || err.message));
          } else if (err.message) {
            // ネットワークエラーなど、メッセージがある場合
            reject(new Error(err.message));
          } else {
            // その他の未知のエラー
            reject(new Error("Unknown error"));
          }
        });
    });
  },

  register: authInfo => {
    return new Promise((resolve, reject) => {
      client.post("http://localhost:3000/auth/register", authInfo)
        .then(res => {
          if(res.data){
            resolve({ username: res.data.username, password: res.data.password})
          }else {
            reject(new Error("Invalid response data"))
          }
        })
        .catch(err => {
          if (err.response) {
            // HTTPエラーの場合
            reject(new Error(err.response.data.message || err.message));
          } else if (err.message) {
            // ネットワークエラーなど、メッセージがある場合
            reject(new Error(err.message));
          } else {
            // その他の未知のエラー
            reject(new Error("Unknown error"));
          }
      })
    })
  },

  dataRegister: authInfo => {
    return new Promise((resolve, reject) => {
      client.post("http://localhost:3000/auth/dataRegister", authInfo)
      .then(res => {
        if(res.data){
          console.log(res.data)
          resolve({totalSales: res.data.totalSales, netSales: res.data.netSales})
        }else {
          reject(new Error("Invalid response data"))
        }
      })
      .catch(err => {
        if (err.response) {
          // HTTPエラーの場合
          reject(new Error(err.response.data.message || err.message));
        } else if (err.message) {
          // ネットワークエラーなど、メッセージがある場合
          reject(new Error(err.message));
        } else {
          // その他の未知のエラー
          reject(new Error("Unknown error"));
        }
      })
    })
  },

  getReportData: userId => {
    return new Promise((resolve, reject) => {
      client.post("http://localhost:3000/auth/report", userId)
        .then(res=> {
          if(res.data){
            console.log(res.data)
            resolve({allTotalSales: res.data.alltotalsales, allNetSales: res.data.allnetsales, allLaborCost: res.data.alllaborcost, allPurchaseCost: res.data.allpurchasecost, allCustomers: res.data.allcustomers})
          }else{
            reject(new Error("Invalid response data"))
          }
        })
        .catch(err => {
          if (err.response) {
            // HTTPエラーの場合
            reject(new Error(err.response.data.message || err.message));
          } else if (err.message) {
            // ネットワークエラーなど、メッセージがある場合
            reject(new Error(err.message));
          } else {
            // その他の未知のエラー
            reject(new Error("Unknown error"));
          }
        });
    })
  }
};
