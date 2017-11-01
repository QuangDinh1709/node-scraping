var request = require('node-fetch');
var cheerio = require('cheerio');
var _ = require('underscore');

var fs = require('fs');

// request('https://www.foody.vn/ho-chi-minh/food/dia-diem')
//   .then(function(res) {
//       return res.text();
//   }).then(function(body) {
//       var $ = cheerio.load(body);
//         $('div.row-item.filter-result-item').each(function (index) {
//             //var title = $(this).find('a').text().trim();
//             var title = $(this).find('h2').text().trim();
//             var url = $(this).find('a').attr('href');
//             var rank = $(this).find('div.status').text().trim();
//             var json = {
//               'rank'  : rank,
//               'title' : title,
//               'url'   : 'https://www.foody.vn' + url
//             }
//
//             // visitPage(url,function(address) {
//             //   console.log('AAAAA '+url);
//             //     var jsonAddress = JSON.stringify(address);
//             //     var target = _.extend(json, jsonAddress);
//             //     fs.appendFileSync('coffeeS.txt', JSON.stringify(target, undefined, 2));
//             // });
//             fs.appendFileSync('coffeeS.txt', JSON.stringify(json, undefined, 2));
//         });
//   }).catch((e) => {
//       console.log(e);
//   });

function visitPage(url, callback) {
  request(url).then(function(res) {
      return res.text();
  }).then(function(body){
      var $ = cheerio.load(body);
      var addressArray = [];
      $('.ldc-items-list.ldc-column li').each(function(index){
          console.log('AAAA');
          var address = $(this).find('.ldc-item-h-address').text().trim();
          if(address) {
            addressArray.push(address)
          }
      });
      addressArray.pop();
      callback(addressArray);
  }).catch((err) => {
    console.log(err);
  });
}

visitPage('https://www.foody.vn/thuong-hieu/morico-modern-japanese-restaurant-cafe?c=ho-chi-minh',function (reslut){
  var target = JSON.stringify(reslut);
  console.log(reslut);
  fs.appendFileSync('coffeeS_address.txt', JSON.stringify(target, undefined, 2));
});


// request('https://www.foody.vn/ho-chi-minh/food/dia-diem')
//   .then(function(res) {
//     return res.text();
//   }).then(function(body) {
//       var $ = cheerio.load(body);
//
//       var bodyText = $('html > body').text();
//       console.log(bodyText);
//
//   }).catch((e) => {
//     console.log(e);
//   });
