
import { pool } from '../db.js'

export const getMembers = async (req, res) => {
    try {

        const ownerId = [rows] = await pool.query('SELECT * FROM members',)

        res.json(ownerId)
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
        const { first_name, email, memberId } = req.body
        const [rows] = await pool.query('INSERT INTO members (first_name, last_name, email, ranking, role, date_of_birth, identification_number, address, phone_number, memberId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.first_name, req.body.last_name, req.body.email, req.body.ranking, req.body.role, req.body.date_of_birth, req.body.identification_number, req.body.address, req.body.phone_number, req.body.memberId])
        res.send({ id: rows.insertId, first_name, email, memberId })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateMember = async (req, res) => {
    // const [result] = await pool.query('DELETE FROM member where id = ?', [req.params.id])

    // if (result.affectedRows <= 0) return res.status(404).json({ message: 'member not found' })
    // res.sendStatus(204)
    res.send('Udate Members');

}

export const updateFieldMember = async (req, res) => {
    //res.send('Update Field Members');
    const { id } = req.params;
    const { first_name, last_name, ranking, role, date_of_birth, identification_number, address, phone_number } = req.body;

    const [result] = await pool.query('UPDATE members SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), ranking = IFNULL(?, ranking), role = IFNULL(?, role), date_of_birth = IFNULL(?, date_of_birth), identification_number = IFNULL(?, identification_number), address = IFNULL(?, address), phone_number = IFNULL(?, phone_number) WHERE id = ?',
        [first_name, last_name, ranking, role, date_of_birth, identification_number, address, phone_number, id])
    
    if(result.affectedRows === 0) return res.status(404).json({ mensaje: 'Miembro no encontrado' })

    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    
    res.json({
        updated_member : rows[0]
    });
}