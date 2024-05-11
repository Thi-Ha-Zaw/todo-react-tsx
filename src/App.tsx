import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import 'animate.css';
import EmptyStage from "./components/EmptyStage";
import Heading from "./components/Heading";
import ListCount from "./components/ListCount";
import SubHeading from "./components/SubHeading";
import TextInputGroup from "./components/TextInputGroup";
import List from "./components/List";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

const App = () => {
    const [lists, setLists] = useState<Todo[]>([]);

    console.log(lists);

    const handleAddList = (text: string) => {
        const newTodoList: Todo = {
            id: uuidv4(),
            text: text,
            completed: false,
        };
        setLists(pre => [...pre, newTodoList]);
    };
    return (
        <div className=" w-full h-screen flex justify-center items-center bg-gray-50">
            <div className=" w-[450px] p-10 bg-white shadow rounded">
                <Heading title="List Builder" />
                <TextInputGroup handleAddList={handleAddList} />
                <div className=" flex mt-3 justify-between items-center">
                    <SubHeading title="Lists" />
                    <ListCount total={lists.length} completed={0} />
                </div>
                <div className=" mt-10 todo-lists">
                    {
                        lists.length == 0 && <EmptyStage />
                    }
                    <div className=" flex flex-col gap-3">
                    {
                        lists?.map(list => <List text={list.text} key={list.id} />)
                    }
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default App;
