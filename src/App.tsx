import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import Swal from "sweetalert2";
import EmptyStage from "./components/EmptyStage";
import Heading from "./components/Heading";
import ListCount from "./components/ListCount";
import SubHeading from "./components/SubHeading";
import TextInputGroup from "./components/TextInputGroup";
import List from "./components/List";
import { Toast } from "./error/alert";

type Todo = {
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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f2937",
            cancelButtonColor: "#1f2937",
            confirmButtonText: "Yes, delete it!",
        }).then(result => {
            if (result.isConfirmed) {
                const filterLists = lists.filter(list => list.id != id);
                setLists([...filterLists]);
                Toast.fire({
                    icon: "success",
                    title: "Deleted it successfully",
                });
            }
        });
    };

    const handleCheckedList = (id: string): void => {
        const allLists = lists.map(list =>
            list.id == id ? { ...list, completed: !list.completed } : list
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
                <div className=" w-[450px] p-10 bg-white shadow rounded">
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
                                        text={list.text}
                                        key={list.id}
                                        id={list.id}
                                        completed={list.completed}
                                        handleRemvoeList={handleRemvoeList}
                                        handleCheckedList={handleCheckedList}
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
