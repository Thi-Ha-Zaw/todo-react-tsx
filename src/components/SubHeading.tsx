
type Props = {
    title: string;
};

const SubHeading = ({ title }: Props) => {
    return <p className=" font-roboto_slab text-lg"> {title} </p>;
};

export default SubHeading;
