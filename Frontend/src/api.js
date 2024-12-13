

export const createTodo=async(todo)=>{
     const url=`https://mern-task-manager-app-backend.onrender.com/todos`
    // const url= `http://localhost:4002/todos`
     const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(todo)
     }
    const response= await fetch(url,options)
    const data= await response.json()
    return data
}

export const fetchAllTodos=async()=>{
    const url=`https://mern-task-manager-app-backend.onrender.com/todos`
    // const url= `http://localhost:4002/todos`
    const options={
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response= await fetch(url,options)
    const data= await response.json()
    return data
}

export const fetchTodoById=async(_id)=>{
    const url=`https://mern-task-manager-app-backend.onrender.com/todos/${_id}`
    // const url= `http://localhost:4002/todos/${id}`
    const options={
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response= await fetch(url,options)
    const data= await response.json()
}
export const updateTodo=async(obj,_id)=>{
       const url=`https://mern-task-manager-app-backend.onrender.com/todos/${_id}`
    //    const url= `http://localhost:4002/todos/${_id}`
       const options={
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
       }
    const response= await fetch(url,options)
    const data= await response.json()
    return data
}

export const deleteTodo=async(_id)=>{
      const url=`https://mern-task-manager-app-backend.onrender.com/todos/${_id}`
    //   const url=`http://localhost:4002/todos/${_id}`
      const options={
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response= await fetch(url,options)
    const data= await response.json()
   return data
}

