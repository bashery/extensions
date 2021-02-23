hello = (i,  name) => {
	console.log(i, name + ' hell from background');
}
for (let i = 0; i< 4; i++ ) {
	hello(i, "adams")
}
