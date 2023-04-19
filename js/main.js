const questions = [
	{
		question: "Что всегда ставит Дин в игре камень-ножницы-бумага? ",
		answers: ["Ножницы", "Бумага", "Камень", "Ооогонек)"],
		correct: 1,
	},
	{
		question: "Какое имя было у внебрачного сына Джона Винчестера?",
		answers: [
			"Алан",
			"Адам",
			"Аларик",
			"Аким",
		],
		correct: 2,
	},
	{
		question: "Кто помог Дину сбежать из частилища?",
		answers: [
			"Сэм",
			"Бобби",
			"Бэни",
			"Кас",
		],
		correct: 3,
	},
	{
		question: "Кто оказался на земле,когда Кас открыл частилище?",
		answers: ["Левиафаны", "Вампиры", "Демоны", "всех монстров из частилища"],
		correct: 1,
	},
    {
		question: "Как убить вендиго?",
		answers: ["Поджечь", "Отрубить голову", "Серебрянная пуля в сердце", "Клинком из чистой меди"],
		correct: 1,
	},
    {
		question: "Как зовут первого демона,которого создал Люцифер?",
		answers: ["Кроули", "Аббадон", "Лилит", "Мэг"],
		correct: 3,
	},
    {
		question: "Кто вытащил душу Сэма из клетки?",
		answers: ["Кастиил", "Бог", "Кроули", "Смерть"],
		correct: 4,
	},
    {
		question: "Кто заменил Бобби,когда он умер?",
		answers: ["Гарт", "Сэм", "Дин", "Джуди "],
		correct: 1,
	},
    {
		question: "Кем изначально был  архангел Гавриил?",
		answers: ["Балдур", "Леший", "Локи", "все ответы неверные"],
		correct: 3,
	},
    {
		question: "Какая сверхспособность была у Сэма от демона ?",
		answers: ["Телекинез",  "Видел чью-то смерть", "Телепатия","Сверхсила"],
		correct: 2,
	},
]

//Находим элементы 
	const headerContainer = document.querySelector('#header');
	const listContainer = document.querySelector('#list');
	const  submitBtn = document.querySelector('#submit');
	//Переменные игры 
	let score = 0;// кол-во правильных ответов
	let questionIndex =0;//текущий вопрос
	
    

	clearPage();
	showQuestion();
	submitBtn.onclick = checkAnswer;

	function clearPage(){ //функция очистки страницы 
		headerContainer.innerHTML = '';
		listContainer.innerHTML= '';
	}

	function showQuestion(){
		
		//вопрос
		const headerTemplate = '<h2 class="title">%title%</h2>';
		const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

		 headerContainer.innerHTML = title;

	  // варианты ответов
	  let answerNumber = 1
		for (answerText of questions[questionIndex]['answers'] ){
			
			const questionTemplate = 
			`<li>
				<label>
					<input value ="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
		    </li>`

			const answerHTML =questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber)
			listContainer.innerHTML += answerHTML;
			answerNumber++;
		}

	}

	function checkAnswer(){
		console.log(' checkAnswer start')
			//находим выбранную радиокнопку
		const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
		
		//если нет ответа ничего не делаем выходим из функции 
		if (!checkedRadio ){
			submitBtn.blur();
			return
		}
		//узнаем номер ответа пользователя		
		const userAnswer = parseInt(checkedRadio.value)
		
		// если ответ верный - увеличиввем счет 
		if (userAnswer ===questions[questionIndex]['correct']){
			score++;
			
	}
		

	if (questionIndex !== questions.length-1){
		questionIndex++;
		clearPage();
		showQuestion();
		
		
	}else {

		clearPage();
		showResults();
	}
}
function showResults(){
	console.log('startret results');

	const resultsTemplate =`
					<h2 class="title">%title%</h2>
                    <img  src="%image%" alt="">
					<h3 class="summary">%message%</h3>
					<p class="result">%result%</p>
					`;


	let title, message,image;
	//варианты заголовка и тексат 
	if (score === questions.length) {
		title ='Вы истинная Беки';
        image = 'img/Becki.jpg'
		message='Только сам Чак знает больше)';
       
        
	}
	else if ((score *100)/questions.length >= 50){
		title ='Вы-Бобби';
        image = 'img/bobby.jpg'
		message='Балбес)'
	}
	else {
		title ='Вы-Духоловы';
        image = 'img/Duholov.jpg'
		message='Вы очень далеки от всего сверхъестественного'
	}

	//Результат 
	let result =`${score} из ${questions.length}`;

	// финальтный ответ 
	const finalMessage = resultsTemplate
								.replace('%title%', title)
                                .replace('%image%',image)
								.replace('%message%', message)
								 .replace('%result%', result)
                                
                                

	headerContainer.innerHTML = finalMessage;
		
 // меняем кнопку 
 submitBtn.blur();
 submitBtn.innerText ='Начать заново';
 submitBtn.onclick=()=>{history.go()}


}
