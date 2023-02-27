
import { pool } from '../db.js'
import jwt from 'jsonwebtoken'

export const authenticated = async (req, res) => {

    try {

        const memberIdHeader = req.headers['member_id'];

        if (typeof memberIdHeader !== 'undefined') {

            const [rows] = await pool.query('SELECT * FROM members where memberId = ?', [memberIdHeader])

            if (rows.length <= 0) return res.status(404).json({ message: 'member not found' })
            const user = rows[0]

            const token = jwt.sign({ user }, "my_secret_key", { expiresIn: '1h' });

            return res.json({ token });
        }
        else {
            res.sendStatus(403);
        }

    } catch (error) {

        res.status(500).json({ error: error });
    }

}
export const protect = async (req, res) => {
    try {
        const userId = req.userId;
        jwt.verify(req.token, 'my_secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {

                return res.json({ text: userId, data });
            }

        })
    } catch (error) {

        res.status(500).json({ error: error.message });
    }

}

