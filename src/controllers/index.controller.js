
import { pool } from '../db.js'

export const ping = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT "Pong" AS result');

        return res.json(result[0]);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}