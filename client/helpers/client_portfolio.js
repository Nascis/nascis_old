Template.portfolio.helpers({
    projects: function() { return Projects.find();  }
});

Template.portfolio.events({});

Template.portfolio.onRendered(function() {});

Template.portfolio.onCreated(function() {
    this.subscribe('allProjects');
});
