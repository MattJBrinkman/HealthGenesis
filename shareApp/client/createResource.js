
export default (_url, _receipient) => {
  return new Promise((resolve, reject) => {
    Meteor.call('create', _receipient, _url, function(err, resp) {
      if(err) {
        alert(err);
        return;
      }
      resolve();
    });
  });
}
