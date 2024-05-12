import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import EmptyStage from "./components/EmptyStage";
import Heading from "./components/Heading";
import ListCount from "./components/ListCount";
import SubHeading from "./components/SubHeading";
import TextInputGroup from "./components/TextInputGroup";
import List from "./components/List";

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

const App = () => {
    const [lists, setLists] = useState<Todo[]>([]);
    const [completedCount, setCompletedCont] = useState<number>(0);

    const handleAddList = (text: string): void => {
        const newTodoList: Todo = {
            id: uuidv4(),
            text: text,
            completed: false,
        };
        setLists(pre => [...pre, newTodoList]);
    };

    const handleRemvoeList = (id: string): void => {
        const filterLists = lists.filter(list => list.id != id);
        setLists([...filterLists]);
    };

    const handleCheckedList = (id: string): void => {
        const allLists = lists.map(list =>
            list.id == id ? { ...list, completed: !list.completed } : list
        );
        setLists([...allLists]);
    };

    const handleUpdateList = (updateText: string, id: string): void => {
        const allLists = lists.map(list =>
            list.id == id ? { ...list, text: updateText } : list
        );
        setLists([...allLists]);
    };

    useEffect(() => {
        const checkedListCount = lists.filter(
            list => list.completed == true
        ).length;
        setCompletedCont(checkedListCount);
    }, [lists]);

    return (
        <>
            <div className=" w-full h-screen flex justify-center items-center bg-gray-50">
                <div className=" w-[450px] p-10 bg-white shadow rounded animate__animated animate__fadeIn">
                    <Heading title="List Builder" />
                    <TextInputGroup handleAddList={handleAddList} />
                    <div className=" flex mt-3 justify-between items-center">
                        <SubHeading title="Lists" />
                        <ListCount
                            total={lists.length}
                            completed={completedCount}
                        />
                    </div>
                    <div className=" mt-10 todo-lists">
                        {lists.length == 0 ? (
                            <EmptyStage />
                        ) : (
                            <div className=" flex flex-col gap-3">
                                {lists?.map(list => (
                                    <List
                                        key={list.id}
                                        list={list}
                                        handleRemvoeList={handleRemvoeList}
                                        handleCheckedList={handleCheckedList}
                                        handleUpdateList={handleUpdateList}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
