// Meteor.publish(null, function (){ return Meteor.roles.find({}) });

Meteor.publish('myData',
    function (clientUserId) {
        if (clientUserId === this.userId) {
            return myFiles.find({ 'metadata._Resumable': { $exists: false },
                                  'metadata.owner': this.userId });
       } else {
        return null;
      }
    }
);

Meteor.publish('addItems', function() {
    if (this.userId)
    	return Items.find({ "metadata.owner": this.userId, "metadata.validated": false, "metadata.deleted": false });
    else
        this.stop();
});

Meteor.publish('showItem', function(itemId) {
    check(itemId, String);
    if (itemId)
        if (Roles.userIsInRole( this.userId, 'adm'))
            return Items.find(itemId);
        else
            return Items.find({ _id: itemId, "metadata.validated":true, "metadata.completed":true, "metadata.deleted":false });
    else
        this.stop();
});

Meteor.publish('showOwner', function(itemId) {
    console.log(itemId);
    check(itemId, String);
    console.log(Items.findOne(itemId));
    var owner = Items.findOne(itemId).metadata.owner;

    if (itemId && owner)
        return Meteor.users.find(owner, {fields: { "username": 1, "createdAt":1 } });
    else
        this.stop();
});


Meteor.publish('showActivities', function(userId) {
    check(userId, String);
    if (userId)
        return Activities.find({ owner: userId });
});

Meteor.publish('showProfile', function(userId) {
    check(userId, String);
    if (userId)
        if (Roles.userIsInRole( this.userId, 'adm'))
            return Meteor.users.find(userId);
        else
            return Meteor.users.find({ _id: userId, 'profile.banned':false });
    else
        this.stop();
});

Meteor.publish('showAvatar', function(userId) {
    check(userId, String);
    if (userId)
        return Avatars.find({ "metadata.owner": userId });
    else
        this.stop();
});

Meteor.publish('showOwnAvatar', function() {
    return Avatars.find({ "metadata.owner": this.userId });
});

Meteor.publish("allUsers", function () {
    if (Roles.userIsInRole( this.userId, 'adm')) return Meteor.users.find();
});
Meteor.publish("allQueries", function () {
    if (Roles.userIsInRole( this.userId, 'adm')) return Queries.find();
});
Meteor.publish("allActivities", function () {
    if (Roles.userIsInRole( this.userId, 'adm')) return Activities.find();
});
Meteor.publish("allAvatars", function(){
    if (Roles.userIsInRole( this.userId, 'adm')) return Avatars.find();
});
Meteor.publish("allItems", function(){
    if (Roles.userIsInRole( this.userId, 'adm'))
        return Items.find();
    else {
        return Items.find({"metadata.validated":true, "metadata.completed":true, "metadata.deleted":false });
    }
});
Meteor.publish("allCategories", function () {
    if (Roles.userIsInRole( this.userId, ['adm', 'iadmin'])) return Categories.find();
});
Meteor.publish("allPrograms", function () {
    if (Roles.userIsInRole( this.userId, ['adm', 'iadmin'])) return Programs.find();
});
Meteor.publish("allTags", function () {
    if (Roles.userIsInRole( this.userId, ['adm', 'iadmin'])) return Tags.find();
});
Meteor.publish("allMaterials", function () {
    if (Roles.userIsInRole( this.userId, ['adm', 'iadmin'])) return Materials.find();
});

Meteor.publish("addCategories", function () {
    return Categories.find({}, { fields: { name: 1 }});
});
Meteor.publish("addPrograms", function () {
    return Programs.find({}, { fields: { name: 1 }});
});
Meteor.publish("addTags", function () {
    return Tags.find({}, { fields: { name: 1 }});
});
Meteor.publish("addMaterials", function () {
    return Materials.find({}, { fields: { name: 1 }});
});
