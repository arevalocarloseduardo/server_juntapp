import { pool } from '../db.js';
import moment from 'moment';

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
    const [result] = await pool.query('DELETE FROM members where id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({ message: 'member not found' })
    res.sendStatus(204)

}
export const createMember = async (req, res) => {
    try {
        const { first_name, email, memberId} = req.body

        //date_of_birth validation
        if(!dateOfBirthValidation(req.body.date_of_birth)) return res.status(400).json({ error_message: 'invalid date_of_birth' })

        //phone_number validation
        const isNumber = await phoneNumberValidation(req.body.phone_number);
        if(!isNumber) return res.status(400).json({ error_message: 'invalid phone_number' })

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
    // res.send('Update Members');

}

export const updateFieldMember = async (req, res) => {

    const { id } = req.params;
    const { first_name, last_name, ranking, role, date_of_birth, identification_number, address, phone_number } = req.body;

    console.log(first_name, last_name, ranking, role, date_of_birth, identification_number, address, phone_number);

    //date_of_birth validation
    if(!dateOfBirthValidation(date_of_birth)) return res.status(400).json({ error_message: 'invalid date_of_birth' });
    
    const fecha_of_birth = moment(date_of_birth).local().toDate();

    //phone_number validation
    const isNumber = await phoneNumberValidation(phone_number);
    if(!isNumber) return res.status(400).json({ error_message: 'invalid phone_number' })

    const [result] = await pool.query('UPDATE members SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), ranking = IFNULL(?, ranking), role = IFNULL(?, role), date_of_birth = IFNULL(?, date_of_birth), identification_number = IFNULL(?, identification_number), address = IFNULL(?, address), phone_number = IFNULL(?, phone_number) WHERE id = ?',
        [first_name, last_name, ranking, role, fecha_of_birth, identification_number, address, phone_number, id])
    
    if(result.affectedRows === 0) return res.status(404).json({ message: 'Member not found' })

    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    
    res.status(200).json({
        updated_member : rows[0]
    });
}

const dateOfBirthValidation = (date) => {
    if(date === undefined) return true;

    const date_of_birth_member = new Date(date);
    const age = new Date(Date.now() - date_of_birth_member.getTime()).getFullYear() - 1970;
    
    return (age >= 18 && age <= 90);
}

const phoneNumberValidation = async (number) => {
    if(number === undefined) return true;

    const ar = /^((\+?54)?( ?0)?|(0))( ?(11|[2368]\d)( ?|\-)?(\d{4})( ?|\-)?(\d{4}))$/;
    const numberValidation = ar.test(number);
    if(!numberValidation) return false;

    const [result] = await pool.query('SELECT phone_number FROM members WHERE phone_number = ?', [number]);
    
    return (result.length === 0);
}