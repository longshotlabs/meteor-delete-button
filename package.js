Package.describe({
  name: "delete-button",
  summary: "Provides a delete button UI component"
});

Package.on_use(function(api) {
  api.use(['templating', 'mongo-livedata']);
  api.add_files(['delete-button.html', 'delete-button.js'], 'client');
});