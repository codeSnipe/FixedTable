/**
 * SuperType.js
 */
function SuperType(name){
    console.log("基类构造函数");
    this.name = name;
    this.colors = ['blue','green','white'];
    this.property = "SuperType";
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
SuperType.prototype.getName = function(){
    console.log(this.name);
};