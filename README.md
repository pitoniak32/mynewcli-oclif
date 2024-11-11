mynewcli
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mynewcli.svg)](https://npmjs.org/package/mynewcli)
[![Downloads/week](https://img.shields.io/npm/dw/mynewcli.svg)](https://npmjs.org/package/mynewcli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mynewcli
$ mcli COMMAND
running command...
$ mcli (--version)
mynewcli/0.0.0 linux-x64 node-v18.20.4
$ mcli --help [COMMAND]
USAGE
  $ mcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mcli hello PERSON`](#mcli-hello-person)
* [`mcli hello world`](#mcli-hello-world)
* [`mcli help [COMMAND]`](#mcli-help-command)
* [`mcli plugins`](#mcli-plugins)
* [`mcli plugins add PLUGIN`](#mcli-plugins-add-plugin)
* [`mcli plugins:inspect PLUGIN...`](#mcli-pluginsinspect-plugin)
* [`mcli plugins install PLUGIN`](#mcli-plugins-install-plugin)
* [`mcli plugins link PATH`](#mcli-plugins-link-path)
* [`mcli plugins remove [PLUGIN]`](#mcli-plugins-remove-plugin)
* [`mcli plugins reset`](#mcli-plugins-reset)
* [`mcli plugins uninstall [PLUGIN]`](#mcli-plugins-uninstall-plugin)
* [`mcli plugins unlink [PLUGIN]`](#mcli-plugins-unlink-plugin)
* [`mcli plugins update`](#mcli-plugins-update)

## `mcli hello PERSON`

Say hello

```
USAGE
  $ mcli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ mcli hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Projects/mynewcli/blob/v0.0.0/src/commands/hello/index.ts)_

## `mcli hello world`

Say hello world

```
USAGE
  $ mcli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ mcli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Projects/mynewcli/blob/v0.0.0/src/commands/hello/world.ts)_

## `mcli help [COMMAND]`

Display help for mcli.

```
USAGE
  $ mcli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for mcli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.16/src/commands/help.ts)_

## `mcli plugins`

List installed plugins.

```
USAGE
  $ mcli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ mcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/index.ts)_

## `mcli plugins add PLUGIN`

Installs a plugin into mcli.

```
USAGE
  $ mcli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into mcli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ mcli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ mcli plugins add myplugin

  Install a plugin from a github url.

    $ mcli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ mcli plugins add someuser/someplugin
```

## `mcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ mcli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ mcli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/inspect.ts)_

## `mcli plugins install PLUGIN`

Installs a plugin into mcli.

```
USAGE
  $ mcli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into mcli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ mcli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ mcli plugins install myplugin

  Install a plugin from a github url.

    $ mcli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ mcli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/install.ts)_

## `mcli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ mcli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ mcli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/link.ts)_

## `mcli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mcli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mcli plugins unlink
  $ mcli plugins remove

EXAMPLES
  $ mcli plugins remove myplugin
```

## `mcli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ mcli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/reset.ts)_

## `mcli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mcli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mcli plugins unlink
  $ mcli plugins remove

EXAMPLES
  $ mcli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/uninstall.ts)_

## `mcli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ mcli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ mcli plugins unlink
  $ mcli plugins remove

EXAMPLES
  $ mcli plugins unlink myplugin
```

## `mcli plugins update`

Update installed plugins.

```
USAGE
  $ mcli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/update.ts)_
<!-- commandsstop -->
