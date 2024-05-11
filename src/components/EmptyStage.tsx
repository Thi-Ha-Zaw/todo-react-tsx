import EmptySvg from "../images/empty.svg";

const EmptyStage = () => {
    return (
        <div className=" flex flex-col justify-center items-center gap-5">
            <img src={EmptySvg} alt="" className=" w-40" />
            <p className=" text-sm">There is no lists</p>
        </div>
    );
};

export default EmptyStage;
