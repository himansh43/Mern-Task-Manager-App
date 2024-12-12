import React, { createContext, useContext,useState } from 'react'


export const TodoContext= createContext()

export const TodoContextProvider=({children})=>{

    const [todos,setTodos]= useState([])
   return <TodoContext.Provider value={[todos, setTodos]}>
    {children}
   </TodoContext.Provider>
}

export const useTodosContext= ()=>{
    return useContext(TodoContext)
}