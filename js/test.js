/****test.js****/
function SubType(name,age){
    SuperType.call(this,name);
    this.subproperty = "SubType";
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.getAge = function(){
  console.log(this.age);
};

var instance1 = new SubType("nick","12");
instance1.colors.push("black");
console.log(instance1.colors);
instance1.getName();
instance1.getAge();

var instance2 = new SubType("jack","14");
console.log(instance2.colors);
instance2.getName();
instance2.getAge();
console.log(5);