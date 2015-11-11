// Router.configure({
//     layoutTemplate: 'layout',
//     notFoundTemplate: 'notFound',
//     loadingTemplate: 'loading'
// });
//
// Router.onStop(function(){ Session.set("previousLocationPath", this.url); });

Router.route('/', {
    name: "home",
    template: "singlePage",
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
//
// Router.route('/about_the_nascis', function() {
//     if (this.ready()) this.render('about');
//     else this.render('loading');
// }, {
//     name: "about"
// });
//
// Router.route('/boring_stuffs',function () {
//     if (this.ready()) this.render('legalPages');
//     else this.render('loading');
// }, {
//     name: "legales"
// });
