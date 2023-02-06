let user = {
    age: 54,
    name: 'Kylie',
    magic: true,
    scream: function(){
        console.log('ahhhhhhh!');
    }
}

user.age // O(1)
user.spell = 'abra kadabra'; // O(1)
user.scream(); // O(1)