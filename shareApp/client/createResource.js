
export default (_url, _recipient) => {
  console.log('granting access to', _url, 'for', _recipient);

  return new Promise((resolve, reject) => {
    Meteor.call('create', _recipient, _url, function(err, resp) {
      if(err) {
        alert(err);
        return;
      }
      resolve();
    });
  });
}
