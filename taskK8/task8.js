const express = require('express');
const prisma = require('./prismaClient');

const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * 🆕 1. إضافة لعبة جديدة إلى المجموعة
 */
app.post('/games', async (req, res) => {
    const { title, platform, condition, releaseYear } = req.body;

    if (!title || !platform || !condition || !releaseYear) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newGame = await prisma.game.create({
            data: { title, platform, condition, releaseYear },
        });
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

/**
 * 📋 2. عرض جميع الألعاب أو البحث عن لعبة معينة
 */
app.get('/games', async (req, res) => {
    const { title } = req.query;
    try {
        const games = title
            ? await prisma.game.findMany({ where: { title: { contains: title, mode: 'insensitive' } } })
            : await prisma.game.findMany();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

/**
 * 🔄 3. تحديث تفاصيل اللعبة
 */
app.put('/games/:id', async (req, res) => {
    const { id } = req.params;
    const { title, platform, condition, releaseYear } = req.body;

    try {
        const updatedGame = await prisma.game.update({
            where: { id: parseInt(id) },
            data: { title, platform, condition, releaseYear },
        });
        res.json(updatedGame);
    } catch (error) {
        res.status(404).json({ error: 'Game not found' });
    }
});

/**
 * 🗑 4. حذف لعبة من المجموعة
 */
app.delete('/games/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.game.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'Game not found' });
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
