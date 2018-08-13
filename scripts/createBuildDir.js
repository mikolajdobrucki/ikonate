const fs = require('fs');

const catalogs = ["build", "build/inline", "build/sprite"]

catalogs.forEach((src)=>{
  fs.access(src, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(src, (err)=>{if (err){console.error(err)}});
    }
  });
})
