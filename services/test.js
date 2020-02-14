const Base = require("./base");

class TripService extends Base {
  constructor(ctx) {
    super(ctx);
  }
  
  async hello () {
    return "hello man!";
  }
}
module.exports = TripService;
