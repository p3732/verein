# structure
----------
This file means to give an explanation of how this project is structured.

## config
----------
Contains configuration files to setup and tweak __verein__ to users needs.

To begin setting up a working __verein__ system, you want to copy every file
ending with .json.example, drop the .example ending of the name and adjust the
contained values to your needs.

Config files should have enough comments to make them self-explanatory. (In case
they are not, please open an issue on Github.)

## src
----------
Contains source code files and is neither intended, nor required to be modified
by users.

For developers however, here is a breakdown:

* api - contains routing information for the API, processed by router.js
* models - contains all information for the database models, processed by db.js
* pages - contains routes for sites that the server provides
* static - contains static content, such as images and css files
* views - contains actual site skeletons, written in pug, which are parsed dynamically upon calling
* .js files
  - config.js - handles reading of all configs in the config folder
  - db.js - sets up database connection by setting up a sequelize (ORM) instance and recursively creating models from the models folder.
  - logging.js - simple logger, offers prompt (passed as parameter), indenting, debug and error
  - router.js - configures express, a node module which is used for routing. Sets up routes for api, pages and static.
  - server.js - starts the server, using the bindings set up by router.js
  - verein.js - bundels and calls config.js, db.js, router.js and serve.js

