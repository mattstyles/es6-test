
class TestClass {
  constructor( id ) {
    this.id = id;
  }

  attack( character ) {
    console.log( 'attacking', character );
  }

  get id() {
    return this._id;
  }

  set id( id ) {
     this._id = id;
  }
}

module.exports = TestClass;
