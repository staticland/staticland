# staticland

Publish static sites with this command-line tool & API client for [static.land](http://static.land)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/staticland.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/staticland
[travis-image]: https://img.shields.io/travis/staticland/staticland.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/staticland
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

The `staticland` command-line tool is used to publish static sites to [static.land](https://static.land) and [self-hosted instances of staticland-api](https://github.com/staticland/staticland-api).

### Features
- One command to deploy a site.
- Automatic SSL using Let's Encrypt.
- Use any static site generator.
- Open source & MIT-licensed. Host it yourself to use it how you want.

### Limitations
- DNS records must be set up and propogated before deploying a site for the first time.
- Setting aliases or redirects is not currently supported.

### Deploying sites
Set up a [staticland API server](https://github.com/staticland/staticland-api) or use https://static.land.

Create an account on static.land:

```sh
staticland register
```

Use `--server yourstaticlandserver.com` to use a custom server.

Ensure that your domain's DNS settings are pointing at `52.39.104.182` (or the IP address of your custom server) before deploying:

```sh
host static.land
static.land has address 52.39.104.182
```

Setting the DNS before deploying is required for Let's Encrypt to successfully provision a certificate.

Deploy a site with auto-SSL:

```sh
staticland path/to/site/ example.com
```

The above command is a shorthand version of the `deploy` command, and works the same as this example:

```sh
staticland deploy path/to/site/ example.com
```

## Install

```
npm i -g staticland
```

`staticland` requires Node.js and npm. [Install Node.js if you haven't already](https://nodejs.org).

## Usage

```
USAGE:
  staticland {command} [options]

COMMANDS:
  register    create an account on a staticland server
  login       log in to a staticland server
  logout      log out of a staticland server
  deploy      deploy a static site to a staticland server
  password    change your password on a staticland server
  server      switch between staticland servers you've logged in to
  whoami      show which user you're using on which staticland server
  domain      check if domain dns is correctly set up with a staticland server
  help        show this help message

DEPLOY
  staticland deploy site/ example.com

  Options:
  -e, --exclude   exclude specific files and diectories
  -s, --server    Specify a server to use instead of the hosted version at static.land

  You can drop the "deploy" subcommand for a shortened version:

    staticland site/ example.com

  To exclude file and directories:

    staticland site/ example.com -e bigfile.pdf -e secret.txt -e dir/of/super/big/files/

HELP
  staticland help

REGISTER
  staticland register

LOGIN
  staticland login

SERVER
  staticland server api.static.land

WHOAMI
  staticland whoami
```


## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **chat** – You can chat about this project at [gitter.im/staticland/staticland](http://gitter.im/staticland/staticland)
- **issues** – Please open issues in the [issues queue](https://github.com/staticland/staticland/issues)
- **twitter** – [@sethdvincent](https://twitter.com/sethdvincent)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[MIT](LICENSE.md)
