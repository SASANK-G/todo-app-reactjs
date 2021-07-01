import React, { useEffect } from 'react'
import '../App.css';
import { useState } from 'react';

// import todo from '../todo.svg'


// to get the data from LS
const getLocalItems = ()=>{
  let localList = localStorage.getItem('lists');
  // console.log(list);
  if (localList){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}

const Todo = () => {

  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [iseditItem, setIsEditItem]=useState(null);


  const additem=() =>{
    if(!inputData){
      alert('Please fill data');
    }
    else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id=== iseditItem){
            return{...elem, name:inputData}
          }
          return elem;
        })
        
      )
      setToggleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    }
    else{
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData])
      setInputData('')
    }
  }

  // delete the items
  const deleteItem=(index)=>{
    const updatedItems = items.filter((elem)=>{
          return index!== elem.id;
    });
    setItems(updatedItems);
  }

  // edit the item
  const editItem = (id)=>{
      let newEditItem = items.find((elem)=>{
          return elem.id === id
      });
      // console.log(newEditItem);
      setToggleSubmit(false);
      setInputData(newEditItem.name);

      setIsEditItem(id);

  }

  // add data to localStorage
  useEffect(()=>
  {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  // const removeAll =()=>{
  //   setItems([]);
  // }

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
              <div className="todoTitle">
                <div className="todoBg">
                  <h3>Todo List</h3>
                </div>
              </div>
              <div className="addItems">
                  <input type="text" placeholder="Add Items..." autoFocus="autofocus" value = {inputData} onChange={(e)=> setInputData(e.target.value)}>
                  </input>

                  {
                    toggleSubmit ? <button type="submit" className="Addbtn"  onClick={additem}>Add</button> :
                    <button type="submit" className="Donebtn"  onClick={additem}>Done</button>
                  }

              </div>

              <div className="itemsList">
                <div className="showItems">
                  {
                    items.map((elem)=>{
                      return(
                        
                      <div className="eachItem" key={elem.id}>
                        <h3>{elem.name}</h3>
                        <div className="todo-btn">
                          <i className="far fa-edit add-btn"  onClick={()=>editItem(elem.id)}></i>
                          <i className="far fa-trash-alt add-btn"  onClick={()=>deleteItem(elem.id)}></i>
                        </div>
                      </div>
                      )
                    })
                  }                  
                </div>
              </div>

              {/* <div>
                <div className="showItems">
                  <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeAll}><span>Check List</span></button>
                </div>
              </div> */}
        </div>
      </div>
      
    </div>
  )
}


export default Todo
