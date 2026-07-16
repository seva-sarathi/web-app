import { db } from "../db.js";

export const seedRoles = async () =>{
    const query = `
        INSERT INTO roles (name, description) 
        VALUES 
            ('CONTROLLER', 'Highest privilege system admin'),
            ('ADMIN', 'Hospital administrator'),
            ('USER', 'Hospital staff')
        ON CONFLICT (name) DO NOTHING;
    `;
    await db.query(query);
    console.log('🌱 Roles seeded.');
}