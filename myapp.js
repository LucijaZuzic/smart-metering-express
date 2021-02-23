var http = require('http');
//var gpio = require('pi-gpio');
var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');
app.use(cors({origin: '*'}));

app.get('/bme680', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('python3 bme680.py',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        var d = new Date();
        fs.appendFile('../smart-metering/src/assets/bmp680.txt', d.toLocaleString() + stdout + '\n', (err) => {});
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/bme680.txt', function(req, res) {
    var x = fs.readFileSync('../smart-metering/src/assets/bmp680.txt', (err) => {});
    res.status(200).send(x);
    return;
});

app.get('/killvideo', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('npx kill-port 5050',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        console.log('video ended');
        res.status(200).send(stdout);
  	return;
    });
});
app.get('/video', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('node player/server-rpi.js',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        console.log('video started');
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/delete', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('rm ../smart-metering/src/assets/bmp680.txt',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/microparticle', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('sudo python aqi.py',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        var d = new Date();
        fs.appendFile('../smart-metering/src/assets/microparticle.txt', d.toLocaleString() + '\n' + stdout + '\n', (err) => {});
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/microparticle.txt', function(req, res) {
    var x = fs.readFileSync('../smart-metering/src/assets/microparticle.txt', (err) => {});
    res.status(200).send(x);
    return;
});

app.get('/deletemicroparticle', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('rm ../smart-metering/src/assets/microparticle.txt',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/image', function(req, res) {

    var exec = require('child_process').exec, child;

    child = exec('raspistill -o ../smart-metering/src/assets/image.jpg',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
             res.status(500).send(stderr);
  	     return;
        }
        res.status(200).send(stdout);
  	return;
    });
});

app.get('/image.jpg', function(req, res) {
    var x = fs.readFileSync('../smart-metering/src/assets/image.jpg', (err) => {});
    res.status(200).send(x);
    return;
});

app.get('*', function(req, res) {
    res.status(404).send('Unrecognised API call');
});

app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
  	return;
    } else {
        next(err);
    }
});

app.listen(3000);
console.log('App Server running at port 3000');