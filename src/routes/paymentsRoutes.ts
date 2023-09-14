import axios from 'axios';
import { Router } from 'express';
import Payment, { IPayment } from '../models/Payment';

const router = Router();

router.post('/payments', async (req, res) => {
    try {
        const usuario: IPayment = new Payment(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).send(payments);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.get('/payments/:id', async (req, res) => {
    try {
        const usuario = await Payment.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Payment not found');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.put('/payments/:id', async (req, res) => {
    try {
        const usuario = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Payment not found');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.delete('/payments/:id', async (req, res) => {
    try {
        const usuario = await Payment.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Payment not found');
        }
        res.status(200).send({ message: 'Payment deleted' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;