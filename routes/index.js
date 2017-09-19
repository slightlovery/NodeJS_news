var express = require('express');
var router = express.Router();
var db = require('../database.js');
var common = require('../libs/common.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.query('SELECT * FROM banner',function(err, data){
		if (err) {
			console.log('Error');
			res.status(500).send('database err');
		}else{
			res.banner = data;
			next();
		}
	});
});

router.get('/', function(req, res, next) {
	db.query('SELECT ID,author_src,title,summary FROM artical',function(err, data){
		if (err) {
			console.log('Error');
			res.status(500).send('database err');
		}else{
			res.news = data;
			next();
		}
	});
});

router.get('/', function(req, res, next) {
	res.render('index',{banner:res.banner, news: res.news});
});

router.get('/artical', function(req, res, next) {
	if(req.query.id){
		db.query('SELECT * FROM artical WHERE ID = '+req.query.id+'', function (err, data) {
			if(err){
				res.status(500).send('Wrong data.').end();
			}else{
				if(data.length==0){
					res.status(404).send('Wrong data.').end();
				}else{
					var artical_data = data[0];
					artical_data.sDate = common.time_convert(artical_data.post_time);
					artical_data.content = artical_data.content.replace(/^/gm,'<p>')
						.replace(/$/gm,'</p>');
					res.render('context',{artical_data: artical_data});
				}
			}
		});

	}else{
		res.status(404).send('Can not find.').end();
	}
});

module.exports = router;
