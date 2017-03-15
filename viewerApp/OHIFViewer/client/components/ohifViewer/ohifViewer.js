import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import eutil from 'ethereumjs-util';

import {ReactiveVar} from "meteor/reactive-var"

const studylistContentId = 'studylistTab';
let lastContentId;

var signedHeaders;

cornerstoneWADOImageLoader.configure({
    beforeSend: function(xhr) {
        // Add custom headers here (e.g. auth tokens)
        var ctx = Session.get('ethereumContext');
        var clonedHeaders = Object.assign({}, signedHeaders);
        clonedHeaders["x-contractaddresses"] = ctx.wadoContract + ',' + clonedHeaders["x-contractaddresses"];
        Object.keys(clonedHeaders).forEach((it) => {
            xhr.setRequestHeader(it, clonedHeaders[it]);
        });
    }
});


var userSigned = new ReactiveVar(false);

function hexSigToRSV(hexSig) {
  var sgn = hexSig;
  var r = eutil.toBuffer(sgn.slice(0,66));
  //console.log('r', r);
  var s = eutil.toBuffer('0x' + sgn.slice(66,130));
  //console.log('s', s);
  var v = eutil.bufferToInt(eutil.toBuffer('0x' + sgn.slice(130,132)));
  return {
    r: r,
    s: s,
    v: v
  };
}


function signRequest() {
  // prompt user to sign
  var msSinceEpoch = new Date().getTime();
  var ctx = Session.get('ethereumContext');
  var contractAddress1 = ctx.wadoContract;
  var contractAddress2 = ctx.wadoRsContract;

  var message = contractAddress1 + contractAddress2 + msSinceEpoch;
  var msgHex = web3.sha3(message);

  web3.eth.sign(web3.eth.accounts[0], msgHex, function(err, result) {
    if(err) {
      console.log('error signing:', err);
      return;
    }

    var sig = hexSigToRSV(result);

    signedHeaders = {
      "x-secp256k1-r" : sig.r.toString('hex'),
      "x-secp256k1-s" : sig.s.toString('hex'),
      "x-secp256k1-v" : sig.v,
      "x-timestamp" : msSinceEpoch,
      "x-contractaddresses" : contractAddress1 + ',' + contractAddress2,
    }

    Session.set('signedHeaders', signedHeaders);
    userSigned.set(true);
    console.log(result);
  });
}

// Define the ViewerData global object
// If there is currently any Session data for this object,
// use this to repopulate the variable
Template.ohifViewer.onCreated(() => {
    ViewerData = Session.get('ViewerData') || {};
    //signRequest();
});

Template.ohifViewer.events({
    'click .js-toggle-studyList'() {
        const contentId = Session.get('activeContentId');

        if (contentId !== studylistContentId) {
            switchToTab(studylistContentId);
        } else {
            switchToTab(lastContentId);
        }
    },
    'click #sign'() {
      signRequest();
    }
});

Template.ohifViewer.helpers({
  userSigned() {
    return userSigned.get();
  },
    studyListToggleText() {
        const contentId = Session.get('activeContentId');
        Session.get('ViewerData');

        // If the Viewer has not been opened yet, 'Back to viewer' should
        // not be displayed
        const viewerContentExists = !!Object.keys(ViewerData).length;
        if (!viewerContentExists) {
            return;
        }

        if (contentId === studylistContentId) {
            return 'Back to viewer';
        } else {
            lastContentId = contentId;
            return 'Study list';
        }
    },

    onStudyList() {
        return (Session.get('activeContentId') === 'studylistTab');
    }
});
