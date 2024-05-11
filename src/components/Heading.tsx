type Props = {
    title : string
};

const Heading = ({title}: Props) => {
    return (
        <div>
            <h1 className=" text-2xl font-roboto_slab">{title}</h1>
        </div>
    );
};

export default Heading;
