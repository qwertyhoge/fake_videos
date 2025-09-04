import { faker } from "@faker-js/faker";
import Tag from "@/type/Tag";

export async function generateRandomVideo(){
    const fetchData = async (url: string) =>{
        const res = await fetch(url);

        return await res.json();
    };
    const randomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }

    const users = await fetchData("http://localhost:3000/api/users");
    const tags = await fetchData("http://localhost:3000/api/tags");
    const tagIds = tags.map((t: Tag) => t.id);

    const title = faker.lorem.words(3);
    const length = faker.number.int({min: 10, max: 10000});

    const randomVideo = {
        title: title,
        length: length,
        user_id: users[randomInt(users.length)].id,
        tag_ids: tagIds.filter(() => faker.datatype.boolean()),
        rate: randomInt(3) - 1
    };

    return randomVideo;
}

export async function generateRandomUser(){
    const name = faker.lorem.words(2);

    const randomUser = {
        name: name
    };

    return randomUser;
}

export async function generateRandomTag(){
    const name = faker.book.genre();

    const randomTag = {
        name: name
    };

    return randomTag;
}
