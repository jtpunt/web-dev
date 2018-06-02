/*******************************************
* Author: Jonathan Perry
* Date: 10/16/17
* Assignment: CS 290 - GET and POST Checker
*******************************************/
module.exports = function(app) {
    app.get('/',function(req,res){
        res.render('home');
    });
	app.get('/about',function(req,res){
		res.render('about');
	});
	app.get('/courses',function(req,res){
	  	var callbackCount = 0;
        var context = {};
        context.css_scripts = ["courses.css", "tabs.css",];
        context.js_scripts = ["deletecourse.js", "updatepage.js"];
        var mysql = req.app.get('mysql');
        getCourses(res, mysql, context, complete);
        getProjects(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('classes', context);
            }
        }
	});
	/* Display one class for the specific purpose of updating class information */
	app.get('/courses/:id',function(req,res){
        callbackCount = 0;
        var context = {};
        var context1 = [];
        context.css_scripts = ["button.css"];
        context.js_scripts = ["selectprof.js","updatecourse.js"];
        var mysql = req.app.get('mysql');
        getCourses(res, mysql, context, complete);
        getCourse(res, mysql, context, req.params.id, complete);
        getProfessors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                for(var keys in context){
                    console.log(keys); // jss_scripts, css_scripts, courses, course, ETC.
                    if(keys === 'course') // we want the single course we queried for
                        for(var course in context[keys]){
                            console.log(course); // Class_ID of single query result
                            console.log(context[keys][course]); // BCIS 3610 of single query result
                        }
                }
                context["courses"].forEach(function(values){ // we want the key to every course we queried the db for
                    context1.push(values); // push each course object into an array
                });
                context1.forEach(function(value){
                    console.log(value); // display each course object
                });
                res.render('classes', context);
            }
        }
	});
	/* Display one class for the specific purpose of updating class information */
	app.put('/courses/:id',function(req,res){
    	var mysql = req.app.get('mysql');
        var sql = "UPDATE Classes SET Class_ID=?, Class_Name=?, Class_Description=? WHERE Class_ID=?"; 
        // remember that these inserts are URL encoded
        var inserts = [req.body.Class_ID, req.body.Class_Name, req.body.Class_Description, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
	});
    app.delete('/courses/:id',function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Classes WHERE Class_ID = ?";
        // remember that these inserts are URL encoded
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    app.post('/courses', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Classes (Class_ID, Class_Name, Class_Description, Semester_Taken) VALUES (?,?,?,?)";
        var inserts = [req.body.Class_ID, req.body.Class_Name, req.body.Class_Description, req.body.Semester_Taken];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/courses');
            }
        });
    });
	app.get('/resume',function(req,res){
        var context = {};
		res.render('resume',context);
	});
	app.use(function(req,res){
  		res.status(404);
  		res.render('404');
	});
	app.use(function(err, req, res, next){
  		console.error(err.stack);
  		res.type('plain/text');
  		res.status(500);
  		res.render('500');
	});
};
function getProjects(res, mysql, context, complete){
    var  sql = "SELECT Class_ID, ProjectFile FROM ClassFiles";
    mysql.pool.query(sql, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.projects = results;
        complete();
    });
}
function getProfessors(res, mysql, context, complete){
    var  sql = "SELECT Prof_ID, CONCAT(Prof_FName, ' ' ,Prof_LName) AS Prof_Name FROM Professors";
    mysql.pool.query(sql, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.professors = results;
        complete();
    });
}
function getProfessor(res, mysql, context, id, complete){
    var sql = "SELECT Prof_ID, CONCAT(Prof_FName, ' ' ,Prof_LName) AS Prof_Name FROM Professors WHERE Prof_ID = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.courses.Prof_ID = results[0]; // returns a list of results
        complete();
    });
}
function getCourses(res, mysql, context, complete){
    var sql;
    sql =  "SELECT c.Class_ID, c.Class_Name, c.Class_Description, c.Semester_Taken, "; 
    sql += "CONCAT(p.Prof_FName,' ', p.Prof_LName) AS Prof_Name, c.SyllabusFilePath, c.FinalGrade FROM Classes c ";
    sql += "LEFT JOIN Professors p ON c.Prof_ID = p.Prof_ID";
    mysql.pool.query(sql, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.courses = results;
        complete();
    });
}
function getCourseIDs(res, mysql, context, complete){
    mysql.pool.query("SELECT Class_ID FROM Classes", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.courseID = results;
        complete();
    });
}
function getCourse(res, mysql, context, id, complete){
    var sql;
    sql =  "SELECT c.Class_ID, c.Class_Name, c.Class_Description, c.Semester_Taken, "; 
    sql += "CONCAT(p.Prof_FName,' ', p.Prof_LName) AS Prof_Name, c.SyllabusFilePath, c.FinalGrade FROM Classes c ";
    sql += "LEFT JOIN Professors p ON c.Prof_ID = p.Prof_ID WHERE c.Class_ID = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.course = results[0]; // returns a list of results
        complete();
    });
}