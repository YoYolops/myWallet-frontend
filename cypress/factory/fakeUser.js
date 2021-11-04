import faker from 'faker';

export default function fakeUser() {
    return {
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}