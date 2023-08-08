//ARRAY COLMENTARIOS
const comments = [];

//DIV CONTENEDOR INPUT
const containerInput = document.createElement('div');

//CREACION INPUT
const input = document.createElement('input');
input.classList.add('input');

//CONTENDOR PADRE
const containerComments = document.getElementById('containerComments');

//SE AGREGA INPUT CONTAINER AL CONTENEDOR PADRE
containerComments.appendChild(containerInput);

//SE AGREGA INPUT AL INPUT CONTAINER
containerInput.appendChild(input);

//DISPARADOR DEL EVENTO
input.addEventListener('keydown', (e)=>{
    handleEnter(e, null)
});

//FUNCION GUARDA COMENTARIO
function handleEnter(e, current){
    if(e.key === 'Enter' && e.target.value != ''){
        const newComent = {
            text: e.target.value,
            likes: 0,
            responses: [] 
        }
        if(current === null){
            comments.unshift(newComent);
        }else{
            current.responses.unshift(newComent);
        }
        e.target.value = '';
        containerComments.innerHTML = '';
        containerComments.appendChild(containerInput);        
        renderComents(comments, containerComments);
    }
}

//FUNCION RENDEREAR COMENTARIOS
function renderComents(arr, parent){
    arr.forEach((element) => {

        //DIV CONTENEDOR PADRE FUNCION RENDERCOMMENTS
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('commentContainer');

        //DIV CONTENEDOR RECURSIVIDAD
        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('responsesContainer');

        //BOTONES REPLY Y LYKE
        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');

        replyButton.textContent = 'Reply';
        likeButton.textContent = 'Like';

        //FUNCION BOTON REPLY
        replyButton.addEventListener('click', (e)=>{
            const newInput = containerInput.cloneNode(true);
            newInput.value = '';
            newInput.focus();
            newInput.addEventListener('keydown', (e)=>{
                handleEnter(e, element);
            });
            commentContainer.insertBefore(newInput, responsesContainer);             
        });

        //FUNCION BOTON LIKE
        likeButton.addEventListener('click', (e)=>{
            element.likes++;
            likeButton.textContent = `${
                element.likes > 0 ? element.likes : ''
            } Likes`;
        });

        //DIV CONTENEDOR PALABRAS INGRESADAS
        const textContainer = document.createElement('div');
        textContainer.classList.add('texto')
        textContainer.textContent = element.text;

        //DIV CONTENEDOR BOTONES
        const actionsConteiner = document.createElement('div');
        actionsConteiner.classList.add('botones');

        commentContainer.appendChild(textContainer);
        commentContainer.appendChild(actionsConteiner);
        actionsConteiner.appendChild(replyButton);
        actionsConteiner.appendChild(likeButton);

        commentContainer.appendChild(responsesContainer);

        if(element.responses.length > 0){
            renderComents(element.responses, responsesContainer);
        }
        parent.appendChild(commentContainer);
    });
}

