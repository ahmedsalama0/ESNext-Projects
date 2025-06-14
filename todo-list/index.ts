const btnTodo: HTMLButtonElement = document.querySelector('.btn-todo')!;
const btnUpdateTodo: HTMLButtonElement =
  document.querySelector('.btn-update-todo')!;
const inputTitle: HTMLInputElement = document.querySelector('.input-title')!;
const inputDesc: HTMLTextAreaElement =
  document.querySelector('.input-description')!;

const divContainer: HTMLDivElement = document.querySelector('.container')!;
let curUpdatedTodo: number | null = null;
let preUpdatedDiv: number | null = null;

enum AvailableActions {
  Add = 'Add',
  Update = 'UPDATE',
}

let TodoBtnState = AvailableActions.Add;

type TodoObjType = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
};
const todosStr: string | null = localStorage.getItem('todos');
let todosObj: unknown;
//Display items when loading first
if (typeof todosStr == 'string') {
  todosObj = JSON.parse(todosStr);
  if (typeof todosObj === 'object' && todosObj != null) console.log(todosObj);
}

enum TodoStatus {
  Pending,
  Completed,
}

function clearInput(): void {
  inputTitle.value = inputDesc.value = '';
}

enum IconAction {
  Check = 'todo-check',
  Edit = 'todo-edit',
  Delete = 'todo-delete',
}

divContainer.addEventListener('click', (e: MouseEvent) => {
  let eventTarget: EventTarget | null = e.target;
  if (eventTarget == null) return;

  if (eventTarget instanceof Element) {
    const domEl: Element | null = eventTarget.closest('span');
    const domDiv: Element | null = eventTarget.closest('.todo-item');
    if (domEl == null || domDiv == null) return;
    const divId: string | null = domDiv.getAttribute('data-id');
    if (divId == null) return;

    const todosStr: string | null = localStorage.getItem('todos');
    if (todosStr == null) return;
    const todosArr: TodoObjType[] = JSON.parse(todosStr);
    const curObjIdx: number = todosArr.findIndex((el) => el.id === divId);
    if (curObjIdx === -1) return;
    const curObj: TodoObjType = todosArr[curObjIdx];

    switch (domEl.classList.value) {
      case IconAction.Check:
        //change the status in the storage
        //check the status if repeated return;
        if (curObj.status === TodoStatus.Completed)
          curObj.status = TodoStatus.Pending;
        else curObj.status = TodoStatus.Completed;

        //Save to localstorage
        localStorage.setItem('todos', JSON.stringify(todosArr));
        //update UI
        //domDiv.classList.add('strike', 'disabled');
        loadStoredTodos();
        break;

      case IconAction.Edit:
        //fill the fields with the cur obj
        inputTitle.value = curObj.title;
        inputDesc.value = curObj.description;

        //switch the state of the btn in both Code, UI
        TodoBtnState = AvailableActions.Update;
        btnTodo.textContent = AvailableActions.Update;

        //assign the cur obj idx to the sate variable - STATE
        curUpdatedTodo = Number(curObj.id);
        //console.log(curUpdatedTodo, '=====', preUpdatedDiv);
        //handling the state of previous selected divs for update by removing the cur class
        if (preUpdatedDiv != null && preUpdatedDiv != curUpdatedTodo) {
          //not the first page to be visited
          const prevSelectedDiv: Element | null = document.querySelector(
            `[data-id="${preUpdatedDiv}"]`
          );
          if (prevSelectedDiv) {
            prevSelectedDiv.classList.remove('current-div');
            //console.log('removed class', preUpdatedDiv, '---', curUpdatedTodo);
          }
        }
        //change the border color of the div
        domDiv.classList.add('current-div');
        //change the visibility of add btn
        //btnTodo.classList.add('hidden');
        //change the visibility of update btn
        //btnUpdateTodo.classList.remove('hidden');
        //listen for the event on a different btn.

        //register this as previous node
        preUpdatedDiv = curUpdatedTodo;
        break;

      case IconAction.Delete:
        const updatedTodos: TodoObjType[] = todosArr.filter(
          (todo) => todo.id !== divId
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        loadStoredTodos();
        break;

      default:
        return;
        break;
    }
  }
});

btnTodo.addEventListener('click', () => {
  HandleActions();
});

function HandleActions() {
  if (inputTitle.value.trim() == '' && inputDesc.value.trim() == '') return;

  // const newTodo: {
  //   id: string;
  //   title: string;
  //   description: string;
  //   status: TodoStatus;
  // } =
  const newTodo: TodoObjType = {
    id: Date.now().toString(),
    title: inputTitle.value,
    description: inputDesc.value,
    status: TodoStatus.Pending,
  };

  let storedTodos: TodoObjType[] | null = [];
  let storedString: string | null = localStorage.getItem('todos');
  if (storedString != null) {
    storedTodos.push(...JSON.parse(storedString));
  }

  let submittedTodo: TodoObjType | null;
  const curObjIndex = storedTodos.findIndex(
    (el) => Number(el.id) === curUpdatedTodo
  );

  if (
    TodoBtnState === AvailableActions.Update &&
    curObjIndex != -1 &&
    curUpdatedTodo != null
  ) {
    submittedTodo = {
      ...storedTodos[curObjIndex],
      title: inputTitle.value,
      description: inputDesc.value,
    };

    // submittedTodo.title = inputTitle.value;
    // submittedTodo.description = inputDesc.value;
  } else {
    //Normal Addition
    submittedTodo = newTodo;
  }

  if (submittedTodo == null) return;
  //Adding to storage
  if (storedTodos.length > 0) {
    localStorage.setItem(
      'todos',
      JSON.stringify([
        ...storedTodos.filter((el) => el.id !== submittedTodo.id),
        submittedTodo,
      ])
    );
  } else {
    localStorage.setItem('todos', JSON.stringify([submittedTodo]));
  }

  //Resetting the state and UI
  const curUpdatedDiv: Element | null = document.querySelector('.current-div');
  if (curUpdatedDiv != null) {
    curUpdatedDiv.classList.remove('current-div');
  }
  curUpdatedTodo = -1;
  TodoBtnState = AvailableActions.Add;
  btnTodo.textContent = AvailableActions.Add;

  //update the UI
  //divContainer.innerHTML = '';
  //clearInput();
  // divContainer.insertAdjacentHTML(
  //   'afterbegin',
  //   GenerateTodo(newTodo.id, newTodo.title, newTodo.status)
  // );
  loadStoredTodos();
}

function loadStoredTodos(): void {
  let storedTodos: TodoObjType[] | null = [];
  let storedString: string | null = localStorage.getItem('todos');

  btnTodo.textContent = 'Add';

  clearInput();
  divContainer.innerHTML = '';

  if (storedString != null) {
    storedTodos.push(...JSON.parse(storedString));
    storedTodos.forEach((todo) => {
      divContainer.insertAdjacentHTML(
        'afterbegin',
        GenerateTodo(todo.id, todo.title, todo.status)
      );
    });
  } else {
    divContainer.innerHTML = 'No thing to show!';
  }
}

//load upon init
loadStoredTodos();

function GenerateTodo(id: string, title: string, status: TodoStatus) {
  const html: string = `
    <div class="todo-item ${
      status === TodoStatus.Completed ? 'strike' : ''
    }" data-id="${id}">
    <section class="todo-para">
    <p class="todo-item-title">
    ${title}</p> 
    <p class="todo-item-icons">
      <span class="todo-check">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon">
  <path class="icon" stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>

    </span> 
    <span class="todo-edit">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon">
  <path class="icon" stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

    </span>
    <span class="todo-delete">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon">
  <path class="icon" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

    </span>
    </p>
    </section>
    </div>
  `;
  return html;
}
