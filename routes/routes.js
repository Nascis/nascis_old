Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.onStop(function(){ Session.set("previousLocationPath", this.url); });

Router.route('/enter_private_space', function () {
    if (Meteor.userId())
        if (Session.get('previousLocationPath')) Router.go(Session.get('previousLocationPath'));
        else Router.go('/');
    else this.render('sign');
}, {
    name: 'user.login'
});

Router.route('/', {
    name: "home",
    template: "home",
    waitOn: function() { },
    data: function() { },
    onRun: function() { this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () {this.next(); },
    onAfterAction: function () { },
    onStop: function () { },
    action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } },
    fastRender: true
});

Router.route('/checking_item_:_id', {
    name: "item.show",
    template: "item",
    waitOn: function() { this.subscribe("showItem", this.params._id); },
    data: function() { return { item: Items.findOne(this.params._id) } },
    onRun: function() {  this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () { this.next(); },
    onAfterAction: function () { },
    onStop: function () { },
    action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } }
});

Router.route('/looking_at_profile_:_id', {
    name: "user.profile",
    template: "profile",
    waitOn: function() { return Meteor.subscribe('showProfile', this.params._id); },
    data: function() { return { user: Meteor.users.findOne(this.params._id) } },
    onRun: function() {  this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () {
        if (Meteor.userId()) this.next();
        else this.render('accessDenied');
    },
    onAfterAction: function () { },
    onStop: function () { },
    action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } }
});

Router.route('/improving_the_collection', {
    name: "item.contribute",
    template: "contribute",
    // waitOn: function() { return Meteor.subscribe('addBlock'); },
    data: function() { return { item: Items.find() } },
    onRun: function() {  this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () {
        if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'user')) this.next();
        else this.render('accessDenied');
    },
    onAfterAction: function () { },
    onStop: function () { },
    //action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } }
});

Router.route('/looking_for_the_hidden_treasure', {
    name: "item.search",
    template: "search",
    waitOn: function() { this.subscribe('allItems'); },
    data: function() { },
    onRun: function() { this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () { this.next(); },
    onAfterAction: function () { },
    onStop: function () { },
    action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } }
});

Router.route('/tweaking_some_buttons', function() {
    if (Meteor.userId())
        if (this.ready()) this.render('settings');
        else this.render('loading');
    else this.render('accessDenied');
}, {
    name: "user.settings"
});

Router.route('/bye_bye', function() {
    Meteor.call('addNotification', "logOut", "");
    Meteor.logout(function(err){ if (err) console.log(err); });
    Router.go('/');
}, {
    name: "user.logout"
});

Router.route('/exploring_the_deep_data', function() {
    if (this.ready()) this.render('browse');
    else this.render('loading');
}, {
    name: "item.browse"
});

Router.route('/controling_the_world', function () {
    if (Meteor.userId && Roles.userIsInRole(Meteor.userId(), ['adm', 'iadmin']))
        if (this.ready()) this.render('administration');
        else this.render('loading');
    else this.render('accessDenied');
}, {
    name: "user.adm"
});

Router.route('/recovering_from_amnesia', function() {
    if (this.ready()) this.render('forgotten');
    else this.render('loading');
}, {
    name: "user.forgotten"
});

Router.route('/open_sesame_:_token', {
    name: "user.resetPassword",
    template: "resetPassword",
    waitOn: function() { },
    data: function() {
        return { token: this.params._token }
    },
    onRun: function() { this.next(); },
    onRerun: function () { this.next(); },
    onBeforeAction: function () { this.next(); },
    onAfterAction: function () { },
    onStop: function () { },
    action: function () { if (this.ready()) { this.render(); } else { this.render('loading'); } }
});

Router.route('/about_the_cad_collection', function() {
    if (this.ready()) this.render('about');
    else this.render('loading');
}, {
    name: "about"
});
Router.route('/getting_some_help', function() {
    if (this.ready()) this.render('help');
    else this.render('loading');
}, {
    name: "help"
});
Router.route('/boring_stuffs',function () {
    if (this.ready()) this.render('legalPages');
    else this.render('loading');
}, {
    name: "legales"
});
