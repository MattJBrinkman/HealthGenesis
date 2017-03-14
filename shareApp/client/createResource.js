
export default (_url, _recipient, resourceId, resourceType) => {
  console.log('granting access to', _url, 'for', _recipient, 'id', resourceId, 'resourceType', resourceType);

  return new Promise((resolve, reject) => {
    Meteor.call('create', _recipient, _url, resourceId, resourceType,function(err, resp) {
      if(err) {
        alert(err);
        return;
      }
      resolve();
    });
  });
}
