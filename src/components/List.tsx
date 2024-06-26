import { useRef, useState } from "react";
import { Todo } from "../App";
import { Toast } from "../error/alert";
import Swal from "sweetalert2";

type Props = {
    list: Todo;
    handleRemvoeList: (id: string) => void;
    handleCheckedList: (id: string) => void;
    handleUpdateList: (updateText: string, id: string) => void;
};

const List = ({
    list: { text, id, completed },
    handleRemvoeList,
    handleCheckedList,
    handleUpdateList,
}: Props) => {
    const [isanimateOut, setIsAnimateOut] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const listRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const handleEditBtnClick = () => {
        setIsEdit(true);
        Toast.fire({
            icon: "warning",
            title: "It will save automatically when you clicked outside the input",
        });
    };

    const handleInputOnBlur = () => {
        handleUpdateList(editInputRef.current?.value ?? "", id);
        setIsEdit(false);
    };



    const handleDelBtnClick = () => {
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
                setIsAnimateOut(true);
                listRef.current?.addEventListener("animationend", () => {
                    handleRemvoeList(id);
                })
                Toast.fire({
                    icon: "success",
                    title: "Deleted it successfully",
                });
            }
        });
    };

    return (
        <div
            ref={listRef}
            className={` animate__animated ${
                isanimateOut ? "animate__hinge" : "animate__slideInLeft"
            } flex justify-between px-4 py-2 shadow-sm border rounded group overflow-hidden items-center`}
        >
            <div className=" flex gap-2 items-center">
                <input
                    onChange={() => handleCheckedList(id)}
                    type="checkbox"
                    className="w-4 h-4 text-gray-600 accent-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {isEdit ? (
                    <input
                        onBlur={handleInputOnBlur}
                        ref={editInputRef}
                        defaultValue={text}
                        autoFocus
                        type="text"
                        className=" outline-none border-b-2  px-3 focus-visible:outline-none"
                    />
                ) : (
                    <p className={` text-sm ${completed && "line-through"}`}>
                        {text}
                    </p>
                )}
            </div>
            <div className=" flex gap-2 items-center translate-x-[150%] duration-500 group-hover:translate-x-0">
                <button className=" active:scale-90 duration-300" onClick={handleEditBtnClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </button>
                <button className=" hover:scale-105 duration-300" onClick={handleDelBtnClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default List;
