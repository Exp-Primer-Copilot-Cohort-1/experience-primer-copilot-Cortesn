function skillsMember() {
    var skills = {
        name: 'John',
        age: 30,
        skills: ['JS', 'React', 'Node'],
        greet: function () {
            console.log('Hello');
        }
    };
    skills.greet();
    skills.skills.forEach(function (skill) {
        console.log(skill);
    });
}