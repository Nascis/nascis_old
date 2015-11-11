Meteor.publish('allProjects', function() {
    return Projects.find();
});

Meteor.startup(function() {

    var project = {
        dateAdded: new Date(),
        dateRealized: new Date(),
        name: "allo",
        shortDescription: "allo",
        description: "allo",
        urlWebsite: "https://allo.com",
        imgUrl: "allo"
    };

    Projects.insert(project);
});
