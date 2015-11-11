Meteor.publish('allProjects', function() {
    return Projects.find();
});

Meteor.startup(function() {
});
