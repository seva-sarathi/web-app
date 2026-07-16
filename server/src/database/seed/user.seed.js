import { db } from "../db.js";
import bcrypt from "bcrypt"


export const seedUser = async () => {
    const defaultPasswordHash = await bcrypt.hash('Controller@123', 10);
    
    const query = `
        INSERT INTO users ( username, email, password_hash, phone, role_id)
        VALUES 
            (
                'CTRL001', 'controller@sevasarathi.com', 
                $1, '0000000000', (SELECT id FROM roles WHERE name = 'CONTROLLER')
            ),
            (
                'ADM001', 'admin@sevasarathi.com', 
                $1, '1111111111', (SELECT id FROM roles WHERE name = 'ADMIN')
            )
        ON CONFLICT (username) DO NOTHING;
    `;
    
    await db.query(query, [defaultPasswordHash]);
    console.log('🌱 Predefined users seeded.');
}