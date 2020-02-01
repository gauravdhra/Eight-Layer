var path = require('path');
var Service = require('node-windows').Service;

function mysqlDate(date) {
  date = date || new Date();
  return date.toISOString().split('T')[0];
}

myDate = mysqlDate();
var svc = new Service({
  name: 'EightLayerApp Service',
  description: 'The nodejs.org example web server.',
  script: path.join(__dirname, 'eightLayerAppService.js')
});

svc.on('start', function () {
  console.log(svc.name + 'EightLayerAppService');
});
svc.install();
// svc.on('uninstall',function(){
//   console.log('Uninstall complete.');
//   console.log('The service exists: ',svc.exists);
// });
// svc.uninstall();

