import { config } from 'dotenv';
config();

export default {
    port: process.env.PORT || 3000,
    db_User: process.env.DB_USER || "",
    db_Password: process.env.DB_PASSWORD || "",
    db_Server: process.env.DB_SERVER || "",
    db_Database: process.env.DB_DATABASE || "",
    jwtkey: process.env.JWTKEY || "",
    smpt_host: process.env.SMTP_HOST || "",
    smpt_port: process.env.SMTP_PORT || "",
    smpt_secure: process.env.SMTP_SECURE || true,
    smpt_user: process.env.SMTP_USER || "",
    smpt_pass: process.env.SMTP_PASS || ""
}