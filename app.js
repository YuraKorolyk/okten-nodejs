const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersPath = path.join(process.cwd(), 'users.json');
app.get('/users', async (req, res) => {
        try {
            const users = await fs.readFile(usersPath, { encoding: "utf-8" });
            res.json(JSON.parse(users))
        } catch (err) {
            throw new Error(err.message)
        }
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const users = await fs.readFile(usersPath, { encoding: "utf-8" });
        const parsedUsers = JSON.parse(users);
        const deletedUser = parsedUsers.splice(+id, 1)[0];
        const updatedUsers = JSON.stringify(parsedUsers);

        await fs.writeFile(usersPath, updatedUsers)
        res.json(deletedUser);
    } catch (err) {
        throw new Error(err.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const {name, age} = req.body;
        if (!name || name.length < 3) {
            return res.status(400).json('wrong name');
        }
        if (!age || age < 0 || age > 100) {
            return res.status(400).json('wrong age');
        }
        const users = await fs.readFile(usersPath, { encoding: "utf-8" });
        const parsedUsers = JSON.parse(users);
        parsedUsers.push(req.body);
        const finalUsers = JSON.stringify(parsedUsers);
        console.log(req.body);
        await fs.writeFile(usersPath, finalUsers);
        res.json(req.body);
    } catch (err) {
        throw new Error(err.message);
    }
})


const PORT = 5001;

app.listen(PORT, ()=> {
    console.log(`Server has started on port ${PORT}`);
});

