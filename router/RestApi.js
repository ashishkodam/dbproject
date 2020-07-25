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
        connect.query(req.body.query, (err, result) => {
            if (err) return (err);
            console.log(result)
            returnData = result;
            // console.log(result)
            return res.json(returnData)
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
                    // let sqlQueary = [];
                    //  for (let index = 0; index < 2; index++) {
                    //     if (fileData[index].substr(-1) == '\r') {
                    //         sqlQueary.push(new Array(fileData[index].slice(0, -1)));
                    //     }
                    //     else {
                    //         sqlQueary.push(new Array(fileData[index]));
                    //      }
                    //  }

                    // console.log(sqlQuearyz)

                    // let values = [
                    //     [108955, 'David', 'Johnson', 1005, 'RB', 6, 103, 75000],
                    //     [108956, 'Andy', 'Dalton', 1001, 'QB', 3, 100, 55000],
                    //     [108957, 'Shea', 'Patterson', 1002, 'QB', 2, 100, 60000],
                    //     [108958, 'Nathan', 'Peterman', 1003, 'QB', 2, 110, 75000],
                    //     [108959, 'Brandon', 'Aiyuk', 1004, 'WR', 4, 105, 65000],
                    //     [108960, 'David', 'Johnson', 1005, 'RB', 6, 103, 75000],
                    //     [108961, 'Andy', 'Dalton', 1001, 'QB', 3, 100, 55000]
                    // ]

                    // let sql
                    // let tableColo = [];
                    // let sqlQueary = [];
                    // for (let index = 0; index < 2; index++) {

                    //     if (fileData[index].substr(-1) == '\r') {

                    //         sqlQueary.push(Number(fileData[index].slice(0,-1)));
                    //     }
                    //     else {
                    //         sqlQueary.push(fileData[index]);
                    //     }
                    // }
                    // console.log(sqlQueary)
                    // connect.query(`${"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'"}${tableName}${"'"};`, (err, result) => {
                    //     for (let index = 0; index < result.length; index++) {
                    //         tableColo.push(" " + result[index].COLUMN_NAME)

                    //     };
                    //     connect.end
                    // })

                    // setTimeout(() => {
                    //     console.log(tableColo)
                    //     sql = `${'insert into'} ${tableName} ${'('}${tableColo}${')'} ${'VALUES ?'} `;
                    //     connect.query(sql, [sqlQueary], function (err, result, feilds) {
                    //         if (err) throw err;
                    //         //console.log('result',result)
                    //         time = Date.now() - start;
                    //         message = time;
                    //         // });

                    //     })
                    // }, 2000);
                    //  let a = 0;

                    // while (a <= fileData.length - 1) {
                    //     let totalVale = '';
                    //     let z = 0;
                    //     l
                    //     while (z < 1000 && a <= fileData.lenth - 1) {
                    //         if (fileData[a+z].substr(-1) == '\r') {
                    //             totalVale = totalVale + "(" + fileData[a+z] + "),";
                    //         }
                    //         else {
                    //             totalVale = totalVale + "(" + fileData[a+z] + ")";
                    //         }
                    //         z++;


                    //     }
                    //     console.log(totalVale)
                    //     a =a+1000
                    // }
                    let a = 0;
                    let b = 0;
                    while (a <= fileData.length - 1) {
                        let times = 0;
                        let totalVale = '';
                        while (times < 1000 && b <= fileData.length-1) {

                            if (fileData[b].substr(-1) == '\r' ) {
                                if(times === 999){
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + ")";
                            }
                            else{
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + "),";
                            }
                        }
                            else {
                                totalVale = totalVale + "(" + fileData[b] + ")";
                            }
                            times++;
                            b++;
                        };
                        let tableColo=[]
                        connect.query(`${"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'"}${tableName}${"'"};`, (err, result) => {
                            for (let index = 0; index < result.length; index++) {
                                tableColo.push(result[index].COLUMN_NAME)

                            };
                            connect.end
                        })

                        setTimeout(() => {
                            sql = `${'insert into'} ${tableName} ${'('}${tableColo}${')'} ${'values'} ${totalVale}; `;
                            console.log('quary', sql)
                            connect.query(sql, function (err, result, feilds) {
                                if (err) throw err;
                                //console.log('result',result)
                                time = Date.now() - start;
                                message = time;
                                // });

                            })
                        }, 2000);
                        a = a + 1000;
                        console.log('a', a)
                    }
                    time = Date.now() - start;
                    message = time;

                    break;
                case 'load':
                    // let path = `${'D:/Nodejs/DBproject-master/DBproject-master/Datasets'}/${req.files.userfile.name}`
                    // let lastSynctax =`${"FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n'"}`
                    // sql = `${'LOAD DATA INFILE'} ${'"'}${path}${'"'} ${'INTO TABLE'} ${tableName} ${lastSynctax}`;
                    //LOAD DATA INFILE 'employee3.txt'  INTO TABLE employee  FIELDS TERMINATED BY ',' ENCLOSED BY '"';
                    let path = `LOAD DATA LOCAL INFILE "D:/Nodejs/DBproject-master/DBproject-master/Datasets/players1.txt" INTO TABLE players FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';`
                    //sql2 = 'LOAD DATA INFILE ' + path + ' INTO TABLE ' + tableName + lastSyntax;

                    //console.log(sql2)
                    connect.query(path, function (err, result, fields) {
                        if (err) throw err;
                        /*  Object.keys(result).forEach(function(key) {
                    
                        }); */
                        console.log(result, fields)
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
        res.status(500).send({ err });
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
    connect.query(`${'Delete from '}${tableName}`, (err, result) => {
        if (err) return err;
        res.json('Successfully deleted')
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
            connect.query('select Max(PlayerID) from players', (err, result) => {

                if (err) return err;
                return PlayerID = result[0];
            });
            connect.query('select Max(TeamID) from players', (err, result) => {
                if (err) return err;
                return TeamID = result[0];
            });
            connect.query('select Max(TouchDowns) from players', (err, result) => {
                if (err) return err;
                return TouchDowns = result[0];
            });
            connect.query('select Max(TotalYards) from players', (err, result) => {
                if (err) return err;
                return TotalYards = result[0];
            });
            connect.query('select Max(Salary) from players', (err, result) => {
                if (err) return err;
                return Salary = result[0];
            });
            setTimeout(() => {
                let finalResult = [PlayerID, TeamID, TouchDowns, TotalYards, Salary]
                res.json(finalResult)
            }, 1000);

            break;
        case "play":
            tableName = 'play'
            let playerID;
            let GameID;
            connect.query('select Max(PlayerID) from play', (err, result) => {

                if (err) return err;
                return playerID = result[0];
            });
            connect.query('select Max(GameID) from play', (err, result) => {
                if (err) return err;
                return GameID = result[0];
            });
            setTimeout(() => {
                let finalResult = [playerID, GameID]
                res.json(finalResult)
            }, 1000);
            break;
        case "games":
            tableName = 'games'
            let gameID;
            let Attendance;
            let TicketRevenue;
            connect.query('select Max(GameID) from games', (err, result) => {

                if (err) return err;
                return gameID = result[0];
            });
            connect.query('select Max(Attendance) from games', (err, result) => {
                if (err) return err;
                return Attendance = result[0];
            });
            connect.query('select Max(TicketRevenue) from games', (err, result) => {
                if (err) return err;
                return TicketRevenue = result[0];
            });
            setTimeout(() => {
                let finalResult = [gameID, Attendance, TicketRevenue]
                res.json(finalResult)
            }, 1000);
            break;
        case "teams":
            tableName = 'teams'
            let teamID;
            connect.query('select Max(TeamID) from teams', (err, result) => {
                if (err) return err;
                return teamID = result[0];
            });
            setTimeout(() => {
                let finalResult = [teamID]
                res.json(finalResult)
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