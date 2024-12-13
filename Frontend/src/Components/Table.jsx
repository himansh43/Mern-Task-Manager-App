import React, { useEffect } from "react";
import { useTodosContext } from "../Context/TodoContext";
import { deleteTodo, fetchAllTodos, updateTodo } from "../api";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import { notify } from "../utils";

const Table = ({ setAddTodo, setEditTodo }) => {
    const [allTodos, setAllTodos] = useTodosContext();
      //handle Fetch all Todos from database
  const handlegetAllTodos = async () => {
    const data = await fetchAllTodos();
    setAllTodos(data.todos);
  };
  useEffect(() => {
    handlegetAllTodos();
  }, []);


  //handle Edit Todo functionality
  const handleEditTodo = async (todo) => {
    setAddTodo(todo.todoName);
    setEditTodo(todo);
  };

  //Delete Todo functionality
  const handleDeleteTodo = async (_id) => {
    const data = await deleteTodo(_id);
    const { success, message } = data;
    setAllTodos(data.allTodos);
    if (success) {
      //show success toast
      notify(message, "success");
    } else {
      //show error toast
      notify(message, "error");
    }
  };


  
  //complete Todo functionality
  const handleCompleteTodo = async (todo) => {
    const { _id, todoName, isDone } = todo;
    const obj = {
      todoName: todoName,
      isDone: !isDone,
    };
    const data = await updateTodo(obj, _id);
    handlegetAllTodos();
  };

  return (
    <>
          <table className="w-[90%] border-2 border-slate-700 text-center self-start  ">
        <thead>
          <tr className="text-xl text-center">
            <th>Id</th>
            <th className="p-2">Todos</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allTodos) &&
            allTodos?.map((todo, idx) => (
              <tr className="border-2 border-slate-700 " key={idx}>
                <td>{idx+1}</td>
                <td className="p-2  rounded-full m-2">
                  <p
                    className={
                      todo.isDone
                        ? "line-through  text-red-700 "
                        : "none"
                    }
                  >
                    {todo.todoName}
                  </p>
                </td>
                <td>
                  <button
                    className="bi bi-check text-success me-2"
                    onClick={() => {
                      handleCompleteTodo(todo);
                    }}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="bi bi-pencil-fill text-warning me-2"
                    onClick={() => {
                      handleEditTodo(todo);
                    }}
                  >
                    <FaPencilAlt />
                  </button>

                  <button
                    className="bi bi-trash-fill text-danger"
                    onClick={() => {
                      handleDeleteTodo(todo._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

      </table>
    </>
  )
}

export default Table










