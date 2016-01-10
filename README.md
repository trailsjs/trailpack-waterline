# trailpack-waterline

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Loads Application Models (in `api/models`) into the [Waterline](http://waterlinejs.org)
ORM; Integrates with [trailpack-router](https://github.com/trailsjs/trailpack-router) to
generate Footprints for routes.

## Usage

### Configure

```js
// config/trailpack.js
module.exports = {
  // ...
  packs: [
    require('trailpack-waterline')
  ]
}
```

### Query

```js
// api/services/BirthdayService.js
module.exports = {
  /**
   * Finds people with the given birthday.
   * @return Promise
   * @example {
   *    name: 'Ludwig Beethoven',
   *    birthday: Sun Dec 16 1770 00:00:00 GMT-0500 (EST),
   *    favoriteColors: [
   *      { name: 'yellow', hex: 'ffff00' },
   *      { name: 'black', hex: '000000' }
   *     ]
   * }
   */
  findPeopleWithBirthday (birthday) {
    return this.orm.Person.find({ birthday: birthday })
      .populate('favoriteColors')
  }
}
```

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.


## License
[MIT](https://github.com/trailsjs/trailpack-waterline/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-waterline.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-waterline
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-waterline/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-waterline
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-waterline.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-waterline
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-waterline.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-waterline
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

