import React, { Component } from "react";
import AddTodo from './AddTodo';
import axios from "axios";

export default class TodoList extends Component {
state = {
   todos: [],
}; 
componentDidMount = () => {
    axios
    .get("https://5f142b812710570016b37c94.mockapi.io/api/login/loginids")
    .then((response) => {
        this.setState({
            todos:response.data,
        });
    })
    .catch((err) => console.log(err));

}; 


addToDo = (newTodo) => {
    console.log(newTodo);
    axios
    .post("https://5f142b812710570016b37c94.mockapi.io/api/login/tasks", newTodo)
    .then((response) => {
        this.setState({
            todos: [...this.state.todos,response.data],
        });
    });
};

deleteToDo =(todo) => {
    console.log(todo);
    
    axios.delete(`https://5f142b812710570016b37c94.mockapi.io/api/login/tasks/${todo.id}`)
.then(response => {
//  console.log(response);
//  console.log(response.data);
 const update =this.state.todos.filter(item =>{
    return item.id !== todo.id;
   
}) 

this.setState({todos:update})

})
}  
/*
addToDo = (todo) => {
    this.setState({
        todos: [...this.state.todos, todo]
    });
};
deleteToDo = (todo) => {
    const filteredItems = this.state.todos.filter(x => x.Title !== todo.Title);
    this.setState({
         todos: filteredItems
    });
};
*/
render() {
    return (
         <div className="container p-3">
            <AddTodo onAdd={this.addToDo}></AddTodo>    
            <br></br>   
            <br></br>
                <table className="table" style={{textAlign: "center"}}>
                   <thead>
                     <tr>
                        <th>Task</th>
                        <th>Delete</th>
                     </tr>
                   </thead>
                   <tbody>
                       {this.state.todos.map(x => {
                         return (
                              <tr key={x.Title}>
                              <td>{x.Title}</td>
                              <td>
                              <button className="btn btn-danger" onClick={() => this.deleteToDo(x)}>
                                Delete
                              </button>
                              </td>
                              </tr>
                          );
                       })}
                    </tbody>
                </table>
          </div> 
      );
   }
}