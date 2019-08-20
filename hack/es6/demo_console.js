// Open this file in WebStorm
// Right-click on it in the editor
// Select Debug (this will run the file with Node.js)
// Open the Debugger Console tab in the Debug tool window

class Cat {
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }
}
var nyanCat = new Cat("nyan", 999, "rainbow");

function listProperties(o) {
    console.group("Groups can be nested");
    for (let p in o) {
        console.log(p, ": ", nyanCat[p]);
    }
    console.error("Something goes wrong");
    console.warn("Or not");
    console.warn("Not sure");
    console.groupEnd();
}

function groupDemo() {
    console.group("Groups");
    console.groupCollapsed("Use groupCollapsed to collapse the output");
    for (var i = 0; i < 500; i++) {
        console.log(i);
    }
    console.groupEnd();
    listProperties(nyanCat);
    console.groupEnd();
}

function stackTraces() {
    function f() {
        function g() {
            console.warn("Beware! Stack traces are collapsed by default.");
        }
        g();
    }
    f();
}

function demo() {

    console.log("%cDebug %cconsole in %s", "color: blue; font-weight: bold", "color: green", "WebStorm");

    console.info("Objects are displayed using tree-view");
    console.log(nyanCat);
    console.log("And can be displayed within text\n" +
        "Please meet the %o", nyanCat);
    console.warn("You can display several objects in a row:\n %o and %o !", nyanCat, nyanCat);
    console.error("Ouch! Look what the cat did ->", nyanCat, "!!!!!");
    stackTraces();

    groupDemo();
}

demo();
