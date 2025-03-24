
const ToDoItem = ({todoItem, handleCheckToDoItem, onDelete}) => {

    return (
       
        <div key={todoItem.id} className={`todo-item-wrapper`}>
        <h3 className={`${todoItem.isCompleted ? 'line-through' : ''}`}>{todoItem.text}</h3>
        <div>
            <button onClick={() => handleCheckToDoItem(todoItem.id)} >Check</button>
            <button className="edit-button" onClick={() => onEdit(todoItem)}>Edit</button>
            <button disabled={!todoItem.isCompleted} className="delete-button" onClick={() => onDelete(todoItem)}>Delete</button>
        </div>
    </div>

    )
};

export default ToDoItem;