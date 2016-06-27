# staticland

Publish static sites with this command-line tool & API client for [static.land](http://static.land)

## Features
- One command to deploy a site.
- Automatic SSL using Let's Encrypt.
- Use any static site generator.
- Host it yourself. Use it how you want.

## Limitations
- DNS records must be set up and propogated before deploying a site for the first time.
- Setting aliases or redirects is not currently supported.
- By default the server admin must explicitly give access to users. This will be optional in future releases.
- The staticland server at api.static.land is not yet publicly usable, so you'll need to set up a staticland instance.

## Deploying sites
Set up a [staticland API server](https://github.com/staticland/staticland-api):

Create an account on a staticland server:

```
  staticland register \
    --email wat@static.land \
    --password thisisnotapassword \
    --server your.staticlandserver.com
```

One command to deploy a site with SSL:

```
  staticland deploy \
    --source /path/to/site \
    --domain example.com
```

## Install

```
npm i -g staticland
```

## Usage

```
USAGE:
  staticland {command} [options]

COMMANDS:
  register,  create an account on a staticland server
  login,     log in to a staticland server
  logout,    log out of a staticland server
  deploy,    deploy a static site to a staticland server
  password,  change your password on a staticland server
  server,    switch between staticland servers you've logged in to
  whoami,    show which user you're using on which staticland server
  help,      show this help message

DEPLOY
  staticland deploy --path site/ --domain example.com --server api.static.land

HELP
  staticland help

LOGIN
  staticland login --email hi@example.com --password sosecret --server api.static.land

SERVER
  staticland server api.static.land

WHOAMI
  staticland whoami
```

## License
[MIT](LICENSE.md)
