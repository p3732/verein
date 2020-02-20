# verein
__Verein__ intends to provide a simple digital infrastructure for cultural communities.



Setup steps
-----------
1. Clone repository

    `git clone https://github.com/p3732/verein.git`

2. Install required npm packages

    ```
      cd verein
      npm install .
    ```

3. Setup configuration

    `cp -R config_example config`

    These can be changed to fit your intended usage. The config files should
    have enough comments to make them self-explanatory. (In case they are not,
    please open an issue.)

    Hint for developers:
    A symlink is handy to avoid copying changed default values.

    `ln -s config_example config`

4. Start the server

    `node init`

