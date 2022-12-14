import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Taks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo(({id, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, changeTodolistTitle, filter, changeTaskTitle}: PropsType) => {
    console.log('TL')
    const addTask1 = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id])

    const removeTodolist1 = () => {
        removeTodolist(id);
    }
    const changeTodolistTitle1 = (title: string) => {
        changeTodolistTitle(id, title);
    }

    const onAllClickHandler = () => changeFilter("all", id);
    const onActiveClickHandler = () => changeFilter("active", id);
    const onCompletedClickHandler = () => changeFilter("completed", id);

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }

    const removeTask1 = useCallback((taskId: string) => removeTask(taskId, id), [removeTask, id])

    const changeTaskStatus1 = useCallback((taskId: string, status: boolean) => {
        changeTaskStatus(taskId, status, id);
    }, [changeTaskStatus, id])

    const changeTaskTitle1 = useCallback((taskId: string, title: string) => {
        changeTaskTitle(taskId, title, id);
    }, [changeTaskTitle, id])

    const tasksUseMemo = useMemo(() => {
        return tasksForTodolist.map(t => {
            return <Task
                key={t.id}
                task={t}
                removeTask={removeTask1}
                changeTaskTitle={changeTaskTitle1}
                changeTaskStatus={changeTaskStatus1}
            />
        })
    }, [tasks, filter])

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle1} />
            <IconButton onClick={removeTodolist1}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask1}/>
        <div>
            {
                tasksUseMemo
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


