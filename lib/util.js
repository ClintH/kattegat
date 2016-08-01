module.exports = {
	hintUrls: function(port) {
		var os = require('os');
		var ifaces = os.networkInterfaces();
		for (var dev in ifaces) {
		  var alias = 0;
		  ifaces[dev].forEach(function(details) {
		    if (details.family=='IPv4') {
		      console.log("\t\thttp://" + details.address+":" + port,"  (" + dev+(alias?':'+alias:'')+")");
		      ++alias;
		    }
		  });
		}		
	}
}
