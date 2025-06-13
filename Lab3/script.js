const food = [
  'Burger',
  'Pizza',
  'Donuts',
  'Pizza',
  'Koshary',
  'Donuts',
  'Seafood',
  'Burger',
];

//1
const foodSet = new Set(food);
//2
foodSet.add('Pasta');
//3
foodSet.delete('Burger');
console.log(foodSet);

//4
function ClearSet(x) {
  if (x.constructor.name != 'Set') {
    console.log('Not a set');
    return;
  } else {
    if (x.size > 2) {
      x.clear();
    }
    console.log(x.size);
  }
}

ClearSet(new Set([1, 2, 3]));
ClearSet(new Set([1, 2]));

// ===========================================

//01
class Vehicle {
  constructor(wheels, speed) {
    console.log(`Wheels: ${wheels} --- Speed: ${speed}`);
  }
}

//02
class Bike extends Vehicle {
  constructor(wheels = 2, speed = 'fast enough') {
    super(wheels, speed);
    Bike.IncrementCounter();
  }

  static counter = 0;
  static IncrementCounter() {
    this.counter++;
    console.log(
      'A new instance of bike - There are ' + this.counter + ' currently.'
    );

    //return new this(2, 'test'); //returning an object of the same type with 'this'
  }
}

const bike1 = new Bike();
const bike2 = new Bike();

console.log(Bike.counter);
