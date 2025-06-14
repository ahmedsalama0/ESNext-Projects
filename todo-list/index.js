var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var btnTodo = document.querySelector('.btn-todo');
var btnUpdateTodo = document.querySelector('.btn-update-todo');
var inputTitle = document.querySelector('.input-title');
var inputDesc = document.querySelector('.input-description');
var divContainer = document.querySelector('.container');
var curUpdatedTodo = null;
var preUpdatedDiv = null;
var AvailableActions;
(function (AvailableActions) {
    AvailableActions["Add"] = "Add";
    AvailableActions["Update"] = "UPDATE";
})(AvailableActions || (AvailableActions = {}));
var TodoBtnState = AvailableActions.Add;
var todosStr = localStorage.getItem('todos');
var todosObj;
//Display items when loading first
if (typeof todosStr == 'string') {
    todosObj = JSON.parse(todosStr);
    if (typeof todosObj === 'object' && todosObj != null)
        console.log(todosObj);
}
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["Pending"] = 0] = "Pending";
    TodoStatus[TodoStatus["Completed"] = 1] = "Completed";
})(TodoStatus || (TodoStatus = {}));
function clearInput() {
    inputTitle.value = inputDesc.value = '';
}
var IconAction;
(function (IconAction) {
    IconAction["Check"] = "todo-check";
    IconAction["Edit"] = "todo-edit";
    IconAction["Delete"] = "todo-delete";
})(IconAction || (IconAction = {}));
divContainer.addEventListener('click', function (e) {
    var eventTarget = e.target;
    if (eventTarget == null)
        return;
    if (eventTarget instanceof Element) {
        var domEl = eventTarget.closest('span');
        var domDiv = eventTarget.closest('.todo-item');
        if (domEl == null || domDiv == null)
            return;
        var divId_1 = domDiv.getAttribute('data-id');
        if (divId_1 == null)
            return;
        var todosStr_1 = localStorage.getItem('todos');
        if (todosStr_1 == null)
            return;
        var todosArr = JSON.parse(todosStr_1);
        var curObjIdx = todosArr.findIndex(function (el) { return el.id === divId_1; });
        if (curObjIdx === -1)
            return;
        var curObj = todosArr[curObjIdx];
        switch (domEl.classList.value) {
            case IconAction.Check:
                //change the status in the storage
                //check the status if repeated return;
                if (curObj.status === TodoStatus.Completed)
                    curObj.status = TodoStatus.Pending;
                else
                    curObj.status = TodoStatus.Completed;
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
                    var prevSelectedDiv = document.querySelector("[data-id=\"".concat(preUpdatedDiv, "\"]"));
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
                var updatedTodos = todosArr.filter(function (todo) { return todo.id !== divId_1; });
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                loadStoredTodos();
                break;
            default:
                return;
                break;
        }
    }
});
btnTodo.addEventListener('click', function () {
    HandleActions();
});
function HandleActions() {
    if (inputTitle.value.trim() == '' && inputDesc.value.trim() == '')
        return;
    // const newTodo: {
    //   id: string;
    //   title: string;
    //   description: string;
    //   status: TodoStatus;
    // } =
    var newTodo = {
        id: Date.now().toString(),
        title: inputTitle.value,
        description: inputDesc.value,
        status: TodoStatus.Pending,
    };
    var storedTodos = [];
    var storedString = localStorage.getItem('todos');
    if (storedString != null) {
        storedTodos.push.apply(storedTodos, JSON.parse(storedString));
    }
    var submittedTodo;
    var curObjIndex = storedTodos.findIndex(function (el) { return Number(el.id) === curUpdatedTodo; });
    if (TodoBtnState === AvailableActions.Update &&
        curObjIndex != -1 &&
        curUpdatedTodo != null) {
        submittedTodo = __assign(__assign({}, storedTodos[curObjIndex]), { title: inputTitle.value, description: inputDesc.value });
        // submittedTodo.title = inputTitle.value;
        // submittedTodo.description = inputDesc.value;
    }
    else {
        //Normal Addition
        submittedTodo = newTodo;
    }
    if (submittedTodo == null)
        return;
    //Adding to storage
    if (storedTodos.length > 0) {
        localStorage.setItem('todos', JSON.stringify(__spreadArray(__spreadArray([], storedTodos.filter(function (el) { return el.id !== submittedTodo.id; }), true), [
            submittedTodo,
        ], false)));
    }
    else {
        localStorage.setItem('todos', JSON.stringify([submittedTodo]));
    }
    //Resetting the state and UI
    var curUpdatedDiv = document.querySelector('.current-div');
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
function loadStoredTodos() {
    var storedTodos = [];
    var storedString = localStorage.getItem('todos');
    btnTodo.textContent = 'Add';
    clearInput();
    divContainer.innerHTML = '';
    if (storedString != null) {
        storedTodos.push.apply(storedTodos, JSON.parse(storedString));
        storedTodos.forEach(function (todo) {
            divContainer.insertAdjacentHTML('afterbegin', GenerateTodo(todo.id, todo.title, todo.status));
        });
    }
    else {
        divContainer.innerHTML = 'No thing to show!';
    }
}
//load upon init
loadStoredTodos();
function GenerateTodo(id, title, status) {
    var html = "\n    <div class=\"todo-item ".concat(status === TodoStatus.Completed ? 'strike' : '', "\" data-id=\"").concat(id, "\">\n    <section class=\"todo-para\">\n    <p class=\"todo-item-title\">\n    ").concat(title, "</p> \n    <p class=\"todo-item-icons\">\n      <span class=\"todo-check\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6 icon\">\n  <path class=\"icon\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 12.75 6 6 9-13.5\" />\n  </svg>\n\n    </span> \n    <span class=\"todo-edit\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6 icon\">\n  <path class=\"icon\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10\" />\n</svg>\n\n    </span>\n    <span class=\"todo-delete\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6 icon\">\n  <path class=\"icon\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0\" />\n</svg>\n\n    </span>\n    </p>\n    </section>\n    </div>\n  ");
    return html;
}
