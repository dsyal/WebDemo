// index.js
import moment from 'moment';
console.log('hello world');
console.log(moment().startOf('day').fromNow());
var name = "Bob",
	time = "today";
console.log(`Hello ${name}, how are you ${time}?`);