const express = require('express');

const fs = require('fs')
// const file = require('express-fileupload');

const router = express.Router()
const mySQL = require('mysql');


router.post('/allquery', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    let returnData = {};
    connect.getConnection((err) => {
        if (err) return err;
        // connect.query("CREATE DATABASE phaniFinalProject",(err, res) =>{
        //     if (err) return err;
        //     console.log("Database Created")
        // });
        // connect.query("USE phaniFinalProject",(err, res) =>{
        //     if (err) return err;
        // });
        // console.log( 'start');;
        connect.query(req.body.query, (err, result) => {
            if (err) console.log(err);
            console.log(result)
            returnData = result;
            // console.log(result)
            res.json({ returnData })
        });
        // console.log( 'end');

    });
});
router.post('/upload', (req, res, next) => {
    let message = null;
    const connect = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let time = null;

            let sql = '';
            let fileData = req.files.userfile.data.toString().split('\n')
            let tableName = req.body.table;
            let insetType = req.body.insetType;
            const start = Date.now();

            switch (insetType) {
                case 'single':
                    let sequalQueay = []
                    sql = `${'insert into'} ${tableName} ${'values ( '}`;
                    for (let index = 0; index < fileData.length; index++) {
                        if (fileData[index].substr(-1) == '\r') {
                            sequalQueay = sql + fileData[index].slice(0, -1) + ")";
                        }
                        else {
                            sequalQueay = sql + fileData[index] + ")";
                        }
                        //sequalQueay.push(`${sql} ${fileData[index]+")"}`);
                        connect.query(sequalQueay, (err, result) => {
                            if (err) throw err;
                            //result =  result
                            // alert("Bulk Data Inserted Successfully");
                        });

                    }
                    time = Date.now() - start;
                    message = time;
                    break;
                case 'multiple':
                    sqlQueary = []

                    sql = `${'insert into'} ${tableName} ${'(PlayerID ,FirstName, LastName ,TeamID,Position,TouchDowns,TotalYards,Salary)'} ${'values (?,?,?,?,?,?,?,?)'}`;
                    let values = [
                        [108955, 'David', 'Johnson', 1005, 'RB', 6, 103, 75000],
                        [108956, 'Andy', 'Dalton', 1001, 'QB', 3, 100, 55000]
                        [108957, 'Shea', 'Patterson', 1002, 'QB', 2, 100, 60000],
                        [108958, 'Nathan', 'Peterman', 1003, 'QB', 2, 110, 75000],
                        [108959, 'Brandon', 'Aiyuk', 1004, 'WR', 4, 105, 65000],
                        [108960, 'David', 'Johnson', 1005, 'RB', 6, 103, 75000],
                        [108961, 'Andy', 'Dalton', 1001, 'QB', 3, 100, 55000]
                    ]
                    let { PlayerID, FirstName, LastName, TeamID, Position, TouchDowns, TotalYards, Salary } = values;
                    //    while (x) {
                    //     if(fileData[i].substr(-1) == '\r'){

                    //         values.push([fileData[i].slice(0, -1)]);
                    //     }
                    //     else{
                    //         values.push([fileData[i]]);
                    //         x = false;
                    //     }
                    //     i++;   
                    //    }
                    var query = connect.query(sql, [PlayerID, FirstName, LastName, TeamID, Position, TouchDowns, TotalYards, Salary], function (err, result, feilds) {
                        if (err) throw err;
                        console.log(result)
                    });
                    //    let i =0;
                    //    let x= true;

                    //    while (x) {
                    //     if(fileData[i].substr(-1) == '\r'){

                    //         sql = sql + "(" + connect.escape(fileData[i].slice(0, -1)) + "),";
                    //     }
                    //     else{
                    //         sql =  sql+ "(" + connect.escape(fileData[i]) +")" ;
                    //         x = false;
                    //     }
                    //     i++;   
                    //    }
                    // const callFunction = passTheData(sql, connect);

                    time = Date.now() - start;
                    message = time;
                    break;
                case 'load':

                    //                         LOAD DATA LOCAL INFILE 'C:\\temp\\\OSS001'
                    // INTO TABLE REJECTS FIELDS TERMINATED BY ','
                    // OPTIONALLY ENCLOSED BY '"'
                    // LINES TERMINATED BY '\n'
                    // IGNORE 1                                
                    sql = "LOAD DATA LOCAL INFILE " + "\"" + req.files.userfile.name +
                        "\"" + " INTO TABLE " + tableName + "FIELDS TERMINATED BY ','" + " LINES TERMINATED BY \'" +
                        "\\r\\n" + "\' IGNORE 0 LINES (PlayerID ,FirstName,LastName ,TeamID,Position,TouchDowns,TotalYards,Salary);"
                    // IGNORE 1 LINES'
                    sql2 = "LOAD DATA LOCAL INFILE '$filename' INTO TABLE `$tablenames` FIELDS TERMINATED BY ',' ENCLOSED BY '' LINES TERMINATED BY '\\r\\n'"
                    connect.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        /*  Object.keys(result).forEach(function(key) {
                        }); */
                        time = Date.now() - start;
                        message = time;

                    });

                    break
            }
            //send response
            res.send({
                status: true,
                message: message
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
router.delete('/delete/:id', (req, res, next) => {
    let tableName 
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    switch (req.params.id) {
        case "1":
            tableName = 'players'
            break;
        case "2":
            tableName = 'play'
            break;
        case "3":
            tableName = 'games'
            break;
        case "4":
            tableName = 'teams'
            break;
       
    }
    // connect.getConnection((err) => {
    //     if (err) return err;
        connect.query(`${'Delete from '}${tableName}`,(err, result) =>{
            if (err) return err;
            res.json( 'Successfully deleted' )
        });
  
});


router.post('/max', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    let returnData = {};
   let seletedTable = req.body.table;

   switch (seletedTable) {
    case "players":
        let PlayerID;
        let TeamID;
        let TouchDowns;
        let TotalYards;
        let Salary;
        connect.query('select Max(PlayerID) from players',(err, result) =>{
            
            if (err) return err;
           return PlayerID = result[0];
        });
        connect.query('select Max(TeamID) from players',(err, result) =>{
            if (err) return err;
          return  TeamID = result[0];
        });
        connect.query('select Max(TouchDowns) from players',(err, result) =>{
            if (err) return err;
            return TouchDowns = result[0];
        });
        connect.query('select Max(TotalYards) from players',(err, result) =>{
            if (err) return err;
            return  TotalYards = result[0];
        });
        connect.query('select Max(Salary) from players',(err, result) =>{
            if (err) return err;
            return Salary = result[0];
        });
        setTimeout(() => {
            let finalResult = [PlayerID,TeamID,TouchDowns,TotalYards,Salary]
        res.json( finalResult )
        }, 1000);
        
        break;
    case "play":
        tableName = 'play'
        let playerID;
        let GameID;
        connect.query('select Max(PlayerID) from play',(err, result) =>{
            
            if (err) return err;
           return playerID = result[0];
        });
        connect.query('select Max(GameID) from play',(err, result) =>{
            if (err) return err;
          return  GameID = result[0];
        });
        setTimeout(() => {
            let finalResult = [playerID,GameID]
        res.json( finalResult )
        }, 1000);
        break;
    case "games":
        tableName = 'games'
        let gameID;
        let Attendance;
        let TicketRevenue;
        connect.query('select Max(GameID) from games',(err, result) =>{
            
            if (err) return err;
           return gameID = result[0];
        });
        connect.query('select Max(Attendance) from games',(err, result) =>{
            if (err) return err;
          return  Attendance = result[0];
        });
        connect.query('select Max(TicketRevenue) from games',(err, result) =>{
            if (err) return err;
            return TicketRevenue = result[0];
        });
        setTimeout(() => {
            let finalResult = [gameID,Attendance,TicketRevenue]
        res.json( finalResult )
        }, 1000);
        break;
    case "teams":
        tableName = 'teams'
        let teamID;
        connect.query('select Max(TeamID) from teams',(err, result) =>{
            if (err) return err;
          return  teamID = result[0];
        });
        setTimeout(() => {
            let finalResult = [teamID]
        res.json( finalResult )
        }, 1000);
        break;
   
}
});
const passTheData = async (passSql, connect) => {
    return connect.query(passSql, (err, result) => {

        if (err) throw err;

        //result =  result
        // alert("Bulk Data Inserted Successfully");
    });
}


module.exports = router;