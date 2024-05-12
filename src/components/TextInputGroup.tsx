import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
    handleAddList: (text: string) => void;
};

const TextInputGroup = ({ handleAddList }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        handleAddList(inputRef.current?.value ?? "");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className=" flex mt-8">
            <input
                ref={inputRef}
                type="text"
                className=" border border-gray-800 flex-grow px-3 rounded-l focus-visible: outline-none"
                autoFocus
            />
            <button
                onClick={handleClick}
                className=" bg-gray-800 text-white px-4 py-2 rounded-r"
            >
                +
            </button>
        </div>
    );
};

export default TextInputGroup;
