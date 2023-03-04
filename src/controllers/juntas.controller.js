
import { pool } from '../db.js'

import jwt from 'jsonwebtoken'
export const getJuntas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM juntas',)
    res.json(rows)

}
export const getJunta = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM juntas where id = ?', [req.params.id])

    if (rows.length <= 0) return res.status(404).json({ message: 'juntas not found' })
    res.json(rows[0])

}
export const deleteJunta = async (req, res) => {
    const [result] = await pool.query('DELETE FROM juntas where id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'junta not found' })
    res.sendStatus(200).json({ message: 'junta deleted successfully' });

}
export const createJunta = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM juntas where id = ?', [req.params.id])
    try {
        jwt.verify(req.token, 'my_secret_key', async (err, data) => {
            try {
                const { name, description, typeQuotes, totalAmount, quotes, typeAmount } = req.body
                const [rows] = await pool.query('INSERT INTO juntas (name, description, typeQuotes, totalAmount, quotes, typeAmount, memberOwnerId, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.name, req.body.description, req.body.typeQuotes, req.body.totalAmount, req.body.quotes, req.body.typeAmount, data.user.memberId, "pending"])
                return res.send({ id: rows.insertId, name, description, typeQuotes, totalAmount, quotes, typeAmount, memberOwnerId: data.user.memberId, status: "pending"})

            } catch (error) {

                res.status(500).json({ error: error.message });
            }
        })

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

}
export const joinJunta = async (req, res) => {

    try {
        jwt.verify(req.token, 'my_secret_key', async (err, data) => {
            const { name, description } = req.body
            const [juntas_members_rows] = await pool.query('INSERT INTO juntas_members (junta_id, member_id) VALUES (?, ?)',
                [rows.insertId, data.user.memberId])
            return res.send({ id: rows.insertId, name, description, juntas_members_id: juntas_members_rows.insertId })
        })

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

}
export const updateJunta = async (req, res) => {
    const [result] = await pool.query('DELETE FROM juntas where id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'juntas not found' })
    res.sendStatus(204)

}