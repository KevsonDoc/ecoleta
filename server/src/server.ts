import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json([
        'Diego',
        ' Cleito',
        'Robson'
    ]);
});

app.listen(3333, () => console.log('Funfando'));