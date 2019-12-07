# structure
----------
This file tries to give an overview of the project's structure.

## config (_example)
----------
Contains configuration files to setup and tweak __verein__ to a user's needs.

To begin setting up a working __verein__ system, rename or recursively copy the
example config folder.

`cp -R config_example config`

Then adjust all config files in it according to your needs. Config files should
have enough comments to make them self-explanatory. (In case they are not,
please open an issue on Github.)

## src
----------
Contains source code files and is neither intended, nor required to be modified
by users.

For developers however, here is a breakdown:

* api - Routing information for the REST API, processed by router.js.
* models - Information for the database models, processed by db.js.
* pages - Frontend pages. Their routes are given by folder paths. (router.js)
* static - Static content, such as images, media and css files.
* views - Site skeletons for the frontend, written in pug. Parsed dynamically.
* .js files
  - config.js - Handles reading of all configs in the config folder.
  - db.js - Sets up the database connection by setting up a `sequelize` (ORM)
    instance and recursively creating models from the models folder.
  - logging.js - Simple logger, offers prompt (passed as parameter), indenting,
    as well as debug and error levels.
  - router.js - Configures `express`, a module used for routing. Sets up routes
    for the API, dynamic pages, static content, favicon and 404 sites.
  - server.js - Starts the server, using the bindings set up by router.js.
  - verein.js - Starting point that calls the other .js files in order.
