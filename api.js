require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
            
        //const { userId, card } = req.body;
        //let token = require('./createJWT.js');
        const { userId, card, jwtToken } = req.body;


        /* from heroku git 7/11
        // incoming: userId, color
        // outgoing: error
            
        //const { userId, card } = req.body;
        // let token = require('./createJWT.js');
        // const { userId, card, jwtToken } = req.body;
        */

        try
        {
            if( token.isExpired(jwtToken))
            {
            let r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        const newCard = {Card:card,UserId:userId};
        let error = '';

        // const newCard = {Card:card,UserId:userId};
        // var error = '';

        try
        {
            const db = client.db("COP4331Cards");
            const result = db.collection('Cards').insertOne(newCard);
        }
        catch(e)
        {
            error = e.toString();
        }

    let refreshedToken = null;
    //var refreshedToken = null;

    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    let ret = { error: error, jwtToken: refreshedToken };
    // var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
    });

    // API Endpoint to add workout
    app.post('/api/addWorkout', async(req, res, next) =>
    {
        const {userID, workoutID, numSets, numRepsPerSet, weightLifted} = req.body;
        const newWorkout = {userID: userID, workoutID: workoutID, NumSets: numSets, NumRepsPerSet: numRepsPerSet, WeightLifted: weightLifted};
        let error = '';

        try
        {
            const db = client.db("COP4331Cards");
            const result = db.collection('Workouts').insertOne(newWorkout);
        }

        catch(e)
        {
            error = e.toString();
        }

        let ret = {error: error};
        res.status(200).json(ret);
    })

    // Delete workout 
    app.delete('/_id:', async(req, res, next) =>
    {
        console.log(req.params.id);
        const db = client.db("COP4331Cards")
        const result = await db.collection('Workouts').deleteOne({_id: new mongodb.ObjectId(req.params.id)});
        // const result = db.collection('Workouts').deleteOne(req.params.id);
        //const result = db.collection('Workouts').deleteOne({_id: new MongoClient(req.params.id.numRepsPerSet)});
        // const result3 = db.collection('Workouts').deleteOne({_id: new MongoClient(req.params.id.weightLifted)});

        res.send(result);
        // res.send(result2);
        // res.send(result3);
    })

    // Login
    app.post('/api/login', async (req, res, next) => 
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
            
        let error = '';
        // var error = '';

        const { login, password } = req.body;

        const db = client.db("COP4331Cards");
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

        let id = -1;
        let fn = '';
        let ln = '';

        let ret;

        //var ret;

        if( results.length > 0 )
        {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            em = results[0].Email;
        

            try
            {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, id, em );
            }
            catch(e)
            {
            ret = {error:e.message};
            }
        }
        else
        {
            //ret = {error:"Login/Password incorrect"};
            ret = {error:"Login/Password incorrect",id:-1};
        }

        //let ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
        // incoming: userId, search
        // outgoing: results[], error

        let error = '';

        //let token = require('./createJWT.js'); //this one was not there originally

        const { userId, search, jwtToken } = req.body;

        try
        {
            if( token.isExpired(jwtToken))
            {
            let r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        let _search = search.trim();
        
        const db = client.db("COP4331Cards");
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
        
        let _ret = [];
        for( let i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }
        
        let refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        let ret = { results:_ret, error: error, jwtToken: refreshedToken };
        // var ret = { results:_ret, error: error, jwtToken: refreshedToken };

        res.status(200).json(ret);
    });

    // Register
    app.post('/api/register', async (req, res, next) =>
    {
      // incoming: firstName, lastName, login, password, email, userID???
      // outgoing: error

      const {firstName, lastName, login, password, email, userID} = req.body;

      const newUser = {FirstName: firstName, LastName: lastName, Login: login, Password: password, Email: email, UserID: userID};
      let error = "";

      try
      {
        const db = client.db("COP4331Cards");
        const result = db.collection('Users').insertOne(newUser);
      }
      catch(e)
      {
        error = e.toString();
      }

      let ret = {error: error};
      res.status(200).json(ret);
    });

    // Update password
    app.post('/api/updatePassword', async (req, res, next) => 
    {
      // incoming: userId, newPassword
      // outgoing: results[], error

      let error = '';
      
      
      const {email, newPassword} = req.body;

      try
      {
          const db = client.db("COP4331Cards");
          const results = await db.collection('Users').updateOne({Email:email}, {$set:{Password:newPassword}});
          //console.log(results);
          error = "No errors";
      }
      catch(e)
      {
          console.log(e.message);
          error = e.toString();
      }

      let ret = {error:error};
      res.status(200).json(ret);
    });

    // Update workout
    app.post('/api/updateWorkout', async (req, res, next) => 
    {
      // incoming: workoutId
      // outgoing: results[], error

      let error = '';


      const {workoutId, numSets, numReps, weightLifted} = req.body;

      try
      {
        const db = client.db("COP4331Cards");
        const results = await db.collection('Workouts').updateOne({workoutID:workoutId}, {$set:{NumSets:numSets, NumRepsPerSet:numReps, WeightLifted:weightLifted}});
        //console.log(results);
        error = "No errors";
      }
      catch(e)
      {
        console.log(e.message);
        error = e.toString();
      }

      let ret = {error:error};
      res.status(200).json(ret);
    });
    
    app.post('/api/searchUsers', async (req, res, next) => 
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
            
        let error = '';
        // var error = '';

        const {email} = req.body;

        const db = client.db("COP4331Cards");
        const results = await db.collection('Users').find({Email:email}).toArray();

        let id = -1;
        let fn = '';
        let ln = '';
        let em = '';

        let ret;

        //var ret;

        if( results.length > 0 )
        {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            em = results[0].Email;

            try
            {
                const token = require("./createJWT.js");
                ret = token.createToken( fn, ln, id, em );
            }
            catch(e)
            {
                ret = {error:e.message};
            }
        }
        else
        {
            //ret = {error:"Login/Password incorrect"};
            ret = {error:"No users found",id:-1};
        }

        //let ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    });
  
}