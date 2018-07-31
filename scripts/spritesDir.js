const fs = require('fs');

fs.access('sprite', fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir('sprite', (err)=>{if (err){console.error(err)}});
  }
});
