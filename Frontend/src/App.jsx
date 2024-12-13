import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Table from "./Components/Table";
import { createTodo, fetchAllTodos, updateTodo } from "./api";
import { useTodosContext } from "./Context/TodoContext";
import { notify } from "./utils";
import { ToastContainer } from "react-toastify";

function App() {
  const [todos, setTodos] = useTodosContext();

  const [search, setSearch] = useState("");
  const [addTodo, setAddTodo] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [editTodo, setEditTodo] = useState([]);
  const addTodoRef = useRef(null);

  //handle Fetch all Todos from database
  const handlegetAllTodos = async () => {
    try {
      const data = await fetchAllTodos();
      setTodos(data.todos);
      setCopyTasks(data.todos);
    } catch (error) {
      notify("Failed to fetch tasks", "error");
    }
  };
  useEffect(() => {
    handlegetAllTodos();
  }, []);

  //Add a new Todo functionality
  const handleAddTodo = useCallback(
    async (e) => {
      try {
        const obj = {
          todoName: addTodo,
          isDone: false,
        };

        if (!addTodo) {
          addTodoRef.current.focus();

          return;
        }
        const data = await createTodo(obj);
        const { success, message } = data;
        handlegetAllTodos();
        setAddTodo("");
        if (success) {
          //show success toast
          notify(message, "success");
        } else {
          //show error toast
          notify(message, "error");
        }
      } catch (error) {
        notify("Failed to create task", "error");
      }
    },
    [addTodo]
  );

  const handleUpdateTodo = async () => {
    try {
      if (!editTodo || !addTodo) return;
      const { _id } = editTodo;
      const obj = {
        todoName: addTodo,
        isDone: editTodo.isDone,
      };
      const data = await updateTodo(obj, _id);
      const { success, message } = data;
      handlegetAllTodos();
      setAddTodo("");
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
    } catch (error) {
      notify("Failed to update task", "error");
    }
  };

  //search todo functionality
  const handleSearch = useCallback(
    (e) => {
      const term = search.toLowerCase();
      const oldTasks = [...copyTasks];
      const filteredData = oldTasks.filter((item) => {
        return item.todoName.includes(term);
      });
      setTodos(filteredData);
    },
    [search]
  );

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="w-screen h-screen  flex justify-center items-center bg-slate-400 text-black">
      <div className="w-[60%] h-screen ">
        <h1 className="font-bold text-3xl text-center m-10 text-gray-800">
          Task Manager App
        </h1>
        <div className="flex justify-between items-center gap-40  ">
          <div className="flex flex-row">
            <input
              ref={addTodoRef}
              type="text"
              className="py-1 px-4 outline-none border-2 border-slate-700 rounded-full"
              value={addTodo}
              placeholder="Add todo.."
              onChange={(e) => setAddTodo(e.target.value)}
            />
            <button
              className="font-medium py-1 px-4 outline-none border-2 border-slate-700 rounded-full"
              type="submit"
              onClick={handleAddTodo}
            >
              Add
            </button>
            <button
              className=" font-medium py-1 px-4 outline-none border-2 border-slate-700 rounded-full"
              onClick={handleUpdateTodo}
            >
              Update
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search Todo..."
              className="py-1 px-4  outline-none border-2 border-slate-700 rounded-full "
              value={search}
              name="todoName"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center m-5 overflow-auto h-[430px] ">
          <Table
            addTodo={addTodo}
            setAddTodo={setAddTodo}
            updateTask={updateTask}
            setUpdateTask={setUpdateTask}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
      </div>
      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
