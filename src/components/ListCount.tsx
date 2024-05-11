import React from "react";

type Props = {
    total: number;
    completed: number;
};

const ListCount = ({ total, completed }: Props) => {
    return (
        <div className=" text-xs bg-gray-800 px-4 py-1 rounded-full text-white">
            Done( {completed} / {total} )
        </div>
    );
};

export default ListCount;
