import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDoItem from "./ToDoItem";

const Todo = () => {

    const [text, setText] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const TODO_STORAGE_KEY = 'toDoList';

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const addOrEditItem = () => {
        let newItem;
        if (isEditMode) {
            newItem = {
                ...itemToEdit,
                text
            }

            const itemToEditIndex = todoList.findIndex((item) => item.id === newItem.id);
            const todoListCopy = [...todoList];

            todoListCopy[itemToEditIndex] = newItem;

            localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoListCopy));
            setTodoList(todoListCopy);
            setIsEditMode(false);
            setItemToEdit(null);
        }
        else {


            const newItem = {
                id: uuidv4(),
                text,  // ili text: tex
                isCompleted: false
            };
            setTodoList((prevState) => {
                localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify([...prevState, newItem]));
                return [...prevState, newItem]
            });
        }
        //IMEDIATE RETURN
        //setToDoList((prevState) => [...prevState, setItem]);   
        setText("");
    };

    const handleCheckToDoItem = (itemId) => {
        const itemToCheckIndex = todoList.findIndex((item) => item.id === itemId)
        console.log(itemToCheckIndex);
        const todoListCopy = [...todoList];

        todoListCopy[itemToCheckIndex].isCompleted = true;
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoListCopy));
        setTodoList(todoListCopy);
    }

    useEffect(() => {
        console.log('prvo učitavanje');
        const toDos = localStorage.getItem(TODO_STORAGE_KEY);
        if (toDos) {
            setTodoList(JSON.parse(toDos));
        }

    }, []);

    const onEdit = (itemToEdit) => {
        setText(itemToEdit.text);
        setItemToEdit(itemToEdit);
        setIsEditMode(true);
    }

    const onDelete = (item) => {
        const toDoListCopy = [...todoList];

        const itemToDeeletIndex = toDoListCopy.findIndex((todo) => todo.id === item.id)
        toDoListCopy.splice(itemToDeeletIndex, 1);
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(toDoListCopy));
        setTodoList(toDoListCopy);
    }
    return (
        <div>
            <h2>TODO APP</h2>
            <div className="input-wrapper">
                <input type="text" className="input" onChange={(event) => handleChange(event)} value={text} />
                <button className="add-button" onClick={addOrEditItem} disabled={!text}>{isEditMode ? 'Update' : '+ Add'}</button>
            </div>
            <div>
                {todoList.map((todoItem) =>
                    <ToDoItem
                        todoItem={todoItem}
                        handleCheckToDoItem={handleCheckToDoItem}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default Todo;