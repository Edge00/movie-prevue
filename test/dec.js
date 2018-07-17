
class Boy {
  @speak('Chinese')
  run () {
    console.log('i can speak ' + this.language)
    console.log('i can run')
  }
}

function speak (language) {
  return function (target, key, descriptor) {
    target.language = language
    console.log(target, key, descriptor)
  }
}

const luke = new Boy()

luke.run()
