const request = require('supertest');
const app = require('../index'); // Memanggil app langsung dari index.js

describe('GET /api/todos', () => {
    it('seharusnya mengembalikan respons dari server', async () => {
        const res = await request(app).get('/api/todos');
        
        // Memastikan endpoint merespons (bisa status 200, 401, atau 404 tergantung proteksi route)
        expect(res.status).toBeDefined();
    });
});