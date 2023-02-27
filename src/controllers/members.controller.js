
import { pool } from '../db.js'

export const getMembers = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM members',)

        res.json(rows)
    } catch (error) {

        res.status(500).json({ error: error.message });
    }

}
export const getMember = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM members where id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({ message: 'member not found' })
        res.json(rows[0])
    } catch (error) {

        res.status(500).json({ error: error.message });
    }


}
export const deleteMember = async (req, res) => {
    const [result] = await pool.query('DELETE FROM member where id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'member not found' })
    res.sendStatus(204)

}
export const createMember = async (req, res) => {
    try {
        const { first_name, email, memberId} = req.body
        const [rows] = await pool.query('INSERT INTO members (first_name, last_name, email, ranking, role, date_of_birth, identification_number, address, phone_number, memberId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.first_name, req.body.last_name, req.body.email, req.body.ranking, req.body.role, req.body.date_of_birth, req.body.identification_number, req.body.address, req.body.phone_number, req.body.memberId])
        res.send({ id: rows.insertId, first_name, email, memberId})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateMember = async (req, res) => {
    const [result] = await pool.query('DELETE FROM member where id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'member not found' })
    res.sendStatus(204)

}