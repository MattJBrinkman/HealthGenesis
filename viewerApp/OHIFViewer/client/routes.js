import { Session } from 'meteor/session';
import { Router } from 'meteor/iron:router';

Session.setDefault('ViewerData', {});

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'layout'
});

Router.onBeforeAction('loading');
Router.onBeforeAction(function() {
    this.next();
});

Router.route('/', function() {
    this.render('ohifViewer');
});

Router.route('/viewer/:_id', {
    layoutTemplate: 'layout',
    name: 'viewer',
    onBeforeAction: function() {
        var studyInstanceUid = this.params._id;
        var ethereumContext = getEthereumContext(this.params.query.context);

        console.log(`Opening studyUID: ${studyInstanceUid}, ethereumContext: ${JSON.stringify(ethereumContext)}`);

        Session.set('ethereumContext', ethereumContext);

        this.render('ohifViewer', {
            data: function() {
                return {
                    studyInstanceUid: studyInstanceUid,
                    ethereumContext: ethereumContext
                };
            }
        });
    }
});

function getEthereumContext(blob) {
    if (!blob) return;
    try {
        return JSON.parse(atob(decodeURIComponent(blob)));
    } catch (e) {
        console.error(e);
    }
}
