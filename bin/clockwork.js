var clockworkFake = require('../').create();

clockworkFake.app.listen(8080, function () {
  console.log("Listening...");
});