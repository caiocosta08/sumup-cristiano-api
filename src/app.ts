import express from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import paymentsRoutes from './routes/paymentsRoutes';
import Payment, { IPayment } from './models/Payment';

const app = express();
const server = http.createServer(app); // Criando um servidor HTTP para o Express
const io = new SocketIoServer(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

// Ativando o CORS para todas as rotas
app.use(cors());

mongoose.connect('mongodb+srv://root:root@cluster0.dcfek.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'sumup_cristiano_api'
});

app.use(express.json());
app.use(paymentsRoutes);

app.post('/webhook', async (req, res) => {
    try {
        const data = req.body
        const payment: IPayment = new Payment({ data: JSON.stringify(data) });
        await payment.save();

        console.log({ data })
        io.emit('payment_confirmed', JSON.stringify(data))
        return res.send('ok')
    } catch (error) {
        return res.status(400).send(error)
    }
})

// Exemplo de manipulação de evento de conexão do Socket.io
io.on('connection', (socket) => {
    console.log('Um usuário conectou-se');

    // Você pode adicionar outros eventos aqui

    socket.on('disconnect', () => {
        console.log('Um usuário desconectou-se');
    });
});

export { app, server, io }; // Exportando o servidor HTTP para que você possa escutá-lo em outro arquivo
