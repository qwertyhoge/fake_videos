import Tag from "./Tag";

export default interface Video {
    id: number;
    userId: number;
    length: number;
    rate: number;
    title: string;
    tags: Tag[];
}