delete-button
=========================

A simple smart package for Meteor that provides a delete button UI component. This was formerly provided by the [AutoForm](https://github.com/aldeed/meteor-autoform) package as `afDeleteButton`, but it had very little to do with autoform, so it was moved to this separate package.

## Installation

In your Meteor app directory, enter:

```
$ meteor add aldeed:delete-button
```

## Usage

The UI component, `quickRemoveButton`, can be used with or without a block:

```html
{{> quickRemoveButton collection="TestCollection" _id=this._id}}

<!-- OR -->

{{#quickRemoveButton collection="TestCollection" _id=this._id}}Delete Me{{/quickRemoveButton}}
```

When used without block content, the content of the delete button will be the word "Delete".

At minimum, you need to provide the `collection` and `_id` attributes:

* `collection`: Set this to a helper that returns a `Meteor.Collection` instance or to a string that identifies a `Meteor.Collection` instance that is in the `window` scope.
* `_id`: Set this to the `_id` of the document you want the button to remove.

You can optionally provide `onError`, `onSuccess`, and `beforeRemove` attributes, which should be set to helpers that return functions:

* `onError`: A function that accepts a single argument, `error`, and is called only when the remove operation fails. If you don't provide this callback, there is a default `onError` function that displays an alert and logs the error to the browser console.
* `onSuccess`: A function that accepts a single argument, `result`, and is called only when the remove operation succeeds.
* `beforeRemove`: A function that accepts two arguments, `collection` and `id`, and is called before the document is removed. You can perform asynchronous tasks in this function, such as displaying a confirmation dialog. If the document should be removed, call `this.remove()`.

### Example

*HTML:*

```html
<template name="docList">
  <div class="container">
    {{#each docs}}
    <div class="panel panel-default">
      <div class="panel-body">
      {{this.name}} | {{> quickRemoveButton collection="Collections.TestCollection" _id=this._id onError=onError onSuccess=onSuccess beforeRemove=beforeRemove class="btn btn-danger"}}
      </div>
    </div>
    {{/each}}
  </div>
</template>
```

*JavaScript:*

```js
Collections = {};
Collections.TestCollection = new Meteor.Collection("test");

if (Meteor.isClient) {
  Template.docList.helpers({
    docs: function () {
      return Collections.TestCollection.find();
    },
    onError: function () {
      return function (error) { alert("BOO!"); console.log(error); };
    },
    onSuccess: function () {
      return function (result) { alert("YAY!"); console.log(result); };
    },
    beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        if (confirm('Really delete "' + doc.name + '"?')) {
          this.remove();
        }
      };
    }
  });
}
```

## Contributing

Code contributions and fixes welcome by pull request.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/aldeed/)
