const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index.js")
const jwt = require('jsonwebtoken');

const reqaddVideo = {
    "name": "Crepusculo",
    "description": "Pelicula romantica basada en vampiros",
    "id_uploader_user": "65d0d92270de3c24a2350b7d",
    "date_publication": "12/07/2013",
    "id_author": [
      "65d0d92270de3c24a2350b7d"
    ]
};
const payload = {
    role: 'administrator',
    email: 'mnbenavides1@gmail.com',
    password: '$2a$12$dKtXuNK5KaSZiPK1BENBOeE1fZ/oo6NNeG.rHNzT3RtJU16bfXRpG',
    name_user: 'mnbenavides1'
  }

const token = jwt.sign(payload, 'g3$T1onVid30+B3M4$7eR', {
    expiresIn: 10800, // 3 hours
});

describe('Pruebas sobre la API de videos', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/app_video_management');
    });

    afterAll(async () => {
        await mongoose.close();
        await mongoose.disconnect();
    });
    describe('POST /videos', () => {
        it('Se el token esta expirado', async () => {
            console.log(token);
            const response = await request(app).post('/videos').set('Authorization',  `Bearer ${token}`).send(reqaddVideo);
            expect(response.status).toBe(200);

        });
    });
});
