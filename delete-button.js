Template.quickRemoveButton.helpers({
  atts: function () {
    var context = this, atts = {};
    for (var prop in context) {
      if (context.hasOwnProperty(prop) &&
          prop !== "_id" &&
          prop !== "collection" &&
          prop !== "onError" &&
          prop !== "onSuccess" &&
          prop !== "beforeRemove") {
        atts[prop] = context[prop];
      }
    }
    if (!atts.type) {
      atts.type = "button";
    }
    return atts;
  }
});

Template.quickRemoveButton.events({
  'click button': function (event, template) {
    var self = this;
    var collection = lookup(self.collection);
    if (typeof Meteor !== "undefined" && Meteor.Collection) {
      if (!(collection instanceof Meteor.Collection)) {
        throw new Error("quickRemoveButton: collection attribute must be set to a Meteor.Collection instance or a string reference to a Meteor.Collection instance that is in the window scope.");
      }
    } else if (typeof Mongo !== "undefined" && Mongo.Collection) {
      if (!(collection instanceof Mongo.Collection)) {
        throw new Error("quickRemoveButton: collection attribute must be set to a Mongo.Collection instance or a string reference to a Mongo.Collection instance that is in the window scope.");
      }
    }
    var onError = self.onError || function (error) {
      alert("Delete failed");
      console.log(error);
    };
    var onSuccess = self.onSuccess || function () {};
    var beforeRemove = self.beforeRemove || function () { this.remove(); };
    beforeRemove.call({
      remove: function () {
        collection.remove(self._id, function (error, result) {
          if (error) {
            onError(error);
          } else {
            onSuccess(result);
          }
        });
      }
    }, collection, self._id);
  }
});

function lookup(obj) {
  var ref = window, arr;
  if (typeof obj === "string") {
    arr = obj.split(".");
    while(arr.length && (ref = ref[arr.shift()]));
    if (!ref) {
      throw new Error(obj + " is not in the window scope");
    }
    return ref;
  }
  return obj;
}