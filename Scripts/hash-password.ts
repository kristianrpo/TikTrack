import bcrypt from 'bcrypt';

async function generatePasswordHash() {
    const password = "123456"; // Cambia por la contraseña que desees
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hash generado:", hashedPassword);
}

generatePasswordHash();
