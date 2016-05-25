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

Login to a staticland server:

```
  staticland login \
    --email wat@static.land \
    --password thisisnotapassword \
    --server https://api.static.land
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

## License
[MIT](LICENSE.md)
