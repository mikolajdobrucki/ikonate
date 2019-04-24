const fs = require('fs');

const catalogs = ['build', 'build/inline', 'build/sprite'];

catalogs.forEach((src) => {
	fs.access(src, fs.constants.F_OK, (e) => {
		if (e) {
			fs.mkdirSync(src, (error) => {
				if (error) {
					console.error(error);
				}
			});
		}
	});
});
