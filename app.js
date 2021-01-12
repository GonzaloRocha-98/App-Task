document.getElementById('formTask').addEventListener('submit',saveTask);
function saveTask(e){	
	e.preventDefault();		
	let title= (document.getElementById('title').value).trim();
	let desc = (document.getElementById('description').value).trim();
	let now = new Date();
	let date = now.toLocaleDateString();
	let hour = now.toLocaleTimeString();	
	if (title !='' && desc !=''){
		const task = {
			title,
			desc,
			date,
			hour,
		};
		if(localStorage.getItem('tasks') === null){
			let tasks = [];
			tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(tasks))
			}
			else{
				let tasks =JSON.parse(localStorage.getItem('tasks'));
				tasks.push(task);
				localStorage.setItem('tasks', JSON.stringify(tasks))
			};
			document.getElementById('formTask').reset();
			getTask();
		} else{
		alert('Blanks are not accepted');
		}
	}

function getTask(){
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	let taskView = document.getElementById('tasks');
	let fragment = document.createDocumentFragment()
	for (let i = 0; i < tasks.length; i++){
		let title = tasks[i].title;
		let desc = tasks[i].desc;
		let date = tasks[i].date;
		let hour = tasks[i].hour;
		let div = document.createElement('DIV');
		div.classList.add('card', 'mb-4');
		div.innerHTML = `
			<div class = "card-body"> 
				<p>${title.trim()}</p>
				<p>${desc}</p>
				<a class='btn btn-danger' onclick= deleteTask('${title}') > Borrar</a>
				<a style='float:right'>${hour+' '+date } </a>
			</div>
			`;
		fragment.appendChild(div);
	};
	while (taskView.firstChild){
		taskView.removeChild(taskView.firstChild)
	}
	taskView.appendChild(fragment)
}

function deleteTask(title){
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	for(let i = 0; i < tasks.length; i++){
		if(tasks[i].title === title ){
			tasks.splice(i, 1)
		}
	}
	localStorage.setItem('tasks',JSON.stringify(tasks));
	getTask();
}
