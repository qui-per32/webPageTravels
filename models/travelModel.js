const Conn = require("../helpers/mysqlconnection");

class travelModel {
    // getAll(cb) {
    //     if (!Conn) return cb("No se ha creado la conexión");
    //     const SQL = "SELECT * FROM usuarios;";
    //     Conn.query(SQL, (error, rows) => {
    //         if (error) return cb(error);
    //         return cb(rows);
    //     });
    // }

    findUser(username) {
        return new Promise((resolve,reject)=>{
            if (!Conn) return reject("No se ha podido crear la conexión");
            const SQL = "SELECT * FROM usuarios WHERE usuario LIKE '%" + username + "%';";
            Conn.query(SQL, (error, rows) => {
                if (error) return reject(error);
                else return resolve(rows);
            })
        })
        
    }

    findEmail(correo) {
        return new Promise((resolve,reject)=>{
            if (!Conn) return reject("No se ha podido crear la conexión");
            const SQL = `SELECT * FROM usuarios WHERE email LIKE '%" + '${correo}' + "%';`;
            Conn.query(SQL, (error, rows) => {
                if (error) return reject(error);
                else return resolve(rows);
            })
        })
        
    }
    getUserByEmailOrUsername(username, email) {
        return new Promise((resolve,reject)=>{
             if (!Conn) return reject("No se ha podido crear la conexión");
             const SQL = `SELECT * FROM usuarios where usuario ='${username}' or email ='${email}';`;
             Conn.query(SQL, (error, rows) => {
                 if (error) return reject(error);
                 else return resolve(rows);
             })
        })
       
    }

    getUserByHash(hash) {
        return new Promise((resolve, reject) => {
            if (!Conn) return reject('No existe conexión');
            let SQL = `SELECT * FROM usuarios WHERE hash = '${hash}';`;
            Conn.query(SQL, (error, rows) => {
                if (error) return reject(error);
                else return resolve(rows);
            })
        })
    };

    setActiveUser(hash) {
        return new Promise((resolve, reject) => {
            if (!Conn) return reject('No existe conexión');
            let SQL = `UPDATE usuarios set active=1 , hash='' where hash='${hash}';`;
            Conn.query(SQL, (error, rows) => {
                if (error) return reject(error);
                else return resolve(rows);
            })
        })
    };

   insertUser(userData) {
       return new Promise((resolve,reject)=>{
           let {user,email,hash,pass} = userData;
       if (!Conn) return reject("No se ha podido crear la conexión");
       const SQL = `INSERT INTO usuarios (usuario, email, password, hash) VALUES ('${user}','${email}','${pass}', '${hash}');`;
       Conn.query(SQL, (error, rows) => {  
           if (typeof Promise === 'function'){
               if (error) return reject(error);
               else return resolve(rows);
           }
       })
       })
       
   }

   setDesactivateUser(user) {
       return new Promise((resolve, reject) => {
           console.log(user.email);
           if (!Conn) return reject("No existe conexión");
           let SQL = `UPDATE usuarios set active=0, hash='${user.hash}', pass='' where email='${user.email}';`;
           Conn.query(SQL, (error, rows) => {
               if (error) return reject(error);
               else return resolve(rows);
           })
       })
   }

   setActiveRecover(hash, pass) {
       return new Promise((resolve, reject) => {
           if (!Conn) return reject('No existe conexión');
           let SQL = `UPDATE usuarios set active=1 , pass='${pass}', hash='' where hash='${hash}';`;
           Conn.query(SQL, (error, rows) => {
               if (error) return reject(error);
               else return resolve(rows);
           })
       })
   };

//    showTravels(cb) {
//        if (!Conn) return cb("No se ha podido crear la conexión");
//        const SQL = "SELECT * FROM travels;";
//        Conn.query(SQL, (error, rows) => {
//            if (error) return cb(error);
//            else return cb(rows);
//        })
//    }
}

module.exports = travelModel;