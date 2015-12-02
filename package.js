Package.describe({
  name: "aldeed:delete-button",
  version: "1.0.0",
  summary: "Provides a delete button UI component",
  git: "https://github.com/aldeed/meteor-delete-button.git"
});

Package.on_use(function(api) {
  if (api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.1');
    api.use(['templating', 'mongo']);
  } else {
    api.use(['templating', 'mongo']);
  }

  api.add_files(['delete-button.html', 'delete-button.js'], 'client');
});
