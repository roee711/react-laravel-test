import {useEffect, useRef,useState} from "react";
import { Link } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axiosClient from "../../axiosClient";
import ReactPaginate from "react-paginate";
const ItemType = 'ROW';

const DraggableRow = ({  index, row, moveRow ,onDeleteClick }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveRow(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <tr   className='row-table'  key={row.id}  ref={(node) => ref(drop(node))}>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.description}</td>
            <td>{row.due_date}</td>
            <td>{row.user}</td>
            <td><Link className="btn-edit" to={'/tasks/' + row.id}>Edit</Link>&nbsp;
             <button className="btn-delete" onClick={e => onDeleteClick(row)}>Delete</button>
            </td>
        </tr>
    );
};
function Tasks(){
    const tasksPerPage = 10;
    const [defaultTasks,setDefaultTasks] =useState([]);
    const [tasks,setTasks] =useState(defaultTasks);
    const [loading,setLoading] = useState(false);
    const [searchVal,setSearchVal] = useState("");
    const [page,setPage] = useState(0);
    const [disableOrder ,setDisableOrder]  =useState(0);
    const numberOfTasksVisited = page * tasksPerPage;
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const changePage = ({ selected }) => {
        setPage(selected);
    }
    const moveRow = (fromIndex, toIndex) => {
        const updatedRows = [...tasks];
        const [movedRow] = updatedRows.splice(fromIndex, 1);
        updatedRows.splice(toIndex, 0, movedRow);
        setTasks(updatedRows);
        setDefaultTasks(updatedRows);
    };

    useEffect(()=> {
        getTasks();
    }, [])

    const onDeleteClick = task => {
            if (!window.confirm("Are you sure you want to delete this Task?")) {
            return
        }
        axiosClient.delete(`/tasks/${task.id}`)
            .then(() => {
                getTasks()
            })
    }
    const handleClearClick= (e) => {
        setTasks(defaultTasks)
        setSearchVal('')
    }
    const handleSearchClick = e => {
        e.preventDefault()
        if (searchVal === "") { setTasks(defaultTasks); return; }
        const filterBySearch = defaultTasks.filter((item) => {
            if (item.title.toLowerCase()
                .includes(searchVal.toLowerCase())|| item.description.toLowerCase()
                .includes(searchVal.toLowerCase() )) { return item; }
        })

        setTasks(filterBySearch);
    };
    const getTasks = () => {
        setLoading(true)
        axiosClient.get('/tasks')
            .then(({ data }) => {
                setLoading(false)
                setDefaultTasks(data.data)
                setTasks(data.data)
            })
            .catch(() => {
                setTasks(false)
            })
    }
    const saveOrder =(e) => {
        e.preventDefault();
        setDisableOrder(1)
        axiosClient.post("/tasks/saveOrder", {tasks}).then((data)=>{
            setDisableOrder(0)
        }).catch(err => {
            setDisableOrder(0)
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
        });
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Tasks</h1>
                <Link className="btn-add" to="/tasks/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                {!loading && tasks.length>0 &&
                <table className='table-search' >
                <tbody>
                    <tr>
                        <td><input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Word search"/></td>
                        <td><button onClick={handleSearchClick} className="btn btn-add">Search</button></td>
                        <td><button onClick={handleClearClick} className="btn btn-delete">Clear From Search </button> </td>
                    </tr>
                    </tbody>
                </table>
                }

                <DndProvider backend={HTML5Backend}>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>User Created </th>
                         <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading &&

                    <tr key="0">
                        <td colSpan="6" className="text-center">
                            Loading...
                        </td>
                    </tr>

                    }
                    {!loading && tasks.length >0 &&

                    (tasks.slice(numberOfTasksVisited, numberOfTasksVisited + tasksPerPage).map((task,index) => (
                            <DraggableRow key={task.id} index={index} row={task} moveRow={moveRow} onDeleteClick={onDeleteClick} />
                    )))}


                    </tbody>

                </table>
                    {!loading &&  tasks.length>0 &&
                    <button  disabled={disableOrder} className='save-order' onClick={saveOrder}> Save Order Tasks</button>
                    }
                    </DndProvider>
                {!loading && tasks.length>0 &&
                    <ReactPaginate
                        pageRangeDisplayed={5}
                        previousLabel={"Previous"}
                        nextLabel={"Next"} //
                        pageCount={totalPages}
                        onPageChange={changePage}
                        containerClassName={"navigationButtons"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"navigationActive"}

                    />
                }

            </div>
        </div>
    )
}
export  default  Tasks