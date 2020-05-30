/* Synchronous Web API?
 * ------ 1 -------
 */
const eleList = document.getElementsByTagName('body');
console.log(eleList);
console.log('will be executed in the same order they are called');

/* Asynchronous Web API?
 * ------ 1 -------
 */
setTimeout(() => {
	console.log('>>> 1');
}, 1000);

console.log('>>> 2');

/* why not synchronous the API?
 * ------ 2 -------
 */
setTimeout(1000);
console.log('>>> 1');
console.log('>>> 2');

/*
 * ------ 3 -------
 */
const countH = document.getElementById('count');
const incBtn = document.getElementById('inc');
const reqBtn = document.getElementById('req');

countH.style.visibility = 'visible';
incBtn.style.visibility = 'visible';
reqBtn.style.visibility = 'visible';

let count = 1;
countH.innerText = 'Count: ' + count;

incBtn.addEventListener('click', () => {
	countH.innerText = 'Count: ' + ++count;
});

reqBtn.addEventListener('click', () => {
	const req = new XMLHttpRequest();
	req.open('GET', 'http://localhost:3000/', false);
	req.send();
	console.log(req.responseText);
});

reqBtn.addEventListener('click', () => {
	const req = new XMLHttpRequest();
	req.open('GET', 'http://localhost:3000/', true);

	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			console.log(req.responseText);
		}
	};
	req.send();
});

/* Why a callback function?
 * ------ 4 -------
 */
setTimeout(() => {
	console.log('>>> 1');
}, 1000);

console.log('>>> 2');

/* What is wrong with callbacks?
 * ------ 5 -------
 */
setTimeout(() => {
	console.log('>>> 1');

	setTimeout(() => {
		console.log('>>> 2');

		setTimeout(() => {
			console.log('>>> 3');

			setTimeout(() => {
				console.log('>>> 4');
			}, 200);
		}, 200);
	}, 200);
}, 200);

/* How Promises solve the problem
 * ------ 6 -------
 */
const pause = (time) => {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve, time);
	});
};

pause(200)
	.then(() => {
		console.log('>>> 1');
		return pause(200);
	})
	.then(() => {
		console.log('>>> 2');
		return pause(200);
	})
	.then(() => {
		console.log('>>> 3');
		return pause(200);
	})
	.then(() => {
		console.log('>>> 4');
		return pause(200);
	});

/* Can we do better
 * ------ 7 -------
 */
const doSomething = async () => {
	await pause(200);
	console.log('>>> 1');
	await pause(200);
	console.log('>>> 2');
	await pause(200);
	console.log('>>> 3');
	await pause(200);
	console.log('>>> 4');
};

doSomething();
