const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index.js")


const reqaddUser = {
    "email": "cramirez@gmail.com",
    "password": "Cn1701.com",
    "full_name": "Cristian Camilo",
    "last_name": "Rmirez Cipagauta",
    "phone": "3134804388",
    "role": "65d0d92270de3c24a2350b7d"
}

describe('Pruebas sobre la API de users', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/app_video_management');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('POST /users', () => {
        it('Se inserta correctamente', async () => {
            const response = await request(app).post('/users').send(reqaddUser);
            expect(response.status).toBe(200);
        });

    });
});



