import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { getConnection, querysLottery } from '../services/database/index.service';
import { generateEmailHTML } from '../services/email/index.service';
import EmailService from '../services/email/email.service';

export const GenerateLottery = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .execute(querysLottery.generateLottery);
            const generateLotteryResult = result.recordset[0];

        if (generateLotteryResult.Status === 200) {

            const getWinners = await pool.request()
                .execute(querysLottery.getWinners);
            const getWinnersResult = getWinners.recordset;
            
            const workbookWinners = new ExcelJS.Workbook();
            const worksheetWinners = workbookWinners.addWorksheet('Ganadores');
            
            worksheetWinners.columns = [
                { header: 'NOMBRE_TITULAR', key: 'NOMBRE_TITULAR', width: 20 },
                { header: 'CEDULA_TITULAR', key: 'CEDULA_TITULAR', width: 15 },
                { header: 'DIRECCION', key: 'DIRECCION', width: 25 },
                { header: 'CELULAR', key: 'CELULAR', width: 15 },
                { header: 'TELEFONO_2', key: 'TELEFONO_2', width: 15 },
                { header: 'CORREO_ELECTRONICO', key: 'CORREO_ELECTRONICO', width: 20 },
                { header: 'INSTITUCION', key: 'INSTITUCION', width: 15 },
                { header: 'PARENTESCO', key: 'PARENTESCO', width: 15 },
                { header: 'CELUNOMBRE_ESTUDIANTELAR', key: 'NOMBRE_ESTUDIANTE', width: 20 },
            ];
            
            // Define la ruta temporal donde se guardarán los archivos
            const tempDirectory = path.join(__dirname, 'temp'); // Ajusta la ruta según tus necesidades

            // Verifica si el directorio temporal existe, y si no, créalo
            if (!fs.existsSync(tempDirectory)) {
                fs.mkdirSync(tempDirectory, { recursive: true }); // La opción recursive crea directorios intermedios si no existen
            }

            getWinnersResult.forEach((ganador) => {
                worksheetWinners.addRow(ganador);
            });
            
            const filePath1 = path.join(tempDirectory, 'ganadores.xlsx');
            
            workbookWinners.xlsx.writeFile(filePath1)
                .then(() => {
                    console.log('Archivo Excel generado correctamente.');
                })
                .catch((error) => {
                    console.error('Error al generar el archivo Excel:', error);
                });

                const getGetSubstitutes = await pool.request()
                .execute(querysLottery.getSubstitutes);
            const getGetSubstitutesResult = getGetSubstitutes.recordset;
            
            const workbookSubtitutes = new ExcelJS.Workbook();
            const worksheetSubtitutes = workbookSubtitutes.addWorksheet('Suplentes');
            
            worksheetSubtitutes.columns = [
                { header: 'NOMBRE_TITULAR', key: 'NOMBRE_TITULAR', width: 20 },
                { header: 'CEDULA_TITULAR', key: 'CEDULA_TITULAR', width: 15 },
                { header: 'DIRECCION', key: 'DIRECCION', width: 25 },
                { header: 'CELULAR', key: 'CELULAR', width: 15 },
                { header: 'TELEFONO_2', key: 'TELEFONO_2', width: 15 },
                { header: 'CORREO_ELECTRONICO', key: 'CORREO_ELECTRONICO', width: 20 },
                { header: 'INSTITUCION', key: 'INSTITUCION', width: 15 },
                { header: 'PARENTESCO', key: 'PARENTESCO', width: 15 },
                { header: 'CELUNOMBRE_ESTUDIANTELAR', key: 'NOMBRE_ESTUDIANTE', width: 20 },
            ];
            
            getGetSubstitutesResult.forEach((ganador) => {
                worksheetSubtitutes.addRow(ganador);
            });
            
            const filePath2 = path.join(tempDirectory, 'suplentes.xlsx');
            
            await workbookWinners.xlsx.writeFile(filePath1);

        // Rutas de los archivos adjuntos
        const fileAttachments = [filePath1, filePath2];

        // Genera el archivo de suplentes
        await workbookSubtitutes.xlsx.writeFile(filePath2);
            let email = new EmailService();
            
            // Envía el PDF por correo electrónico
            const emailResult = await email.sendEmail(
            ['dannymateoh1@gmail.com', 'danny.hernandez@cotrafasocial.com.co'],
            'danny',
            'Sorteo 2023 - Ganadores',
            generateEmailHTML("https://i.postimg.cc/05wBz9Kp/ssss.png",
                'Cotrafa Social',
                "Hemos adjuntado 2 archivos con los ganadores y suplentes del sorteo estudiantil",
                "Felicidades a los ganadores",
                null,
                null,
                "Este mensaje es importante, lo has recibido porque se ha jugado el sorteo estudiantil 2023.",
                null
            ),
            fileAttachments
            );

            if (emailResult.isError === 0) {
                return res.status(generateLotteryResult.Status).json({ message: generateLotteryResult.Message, isError: generateLotteryResult.IsError });
            } else {
                return res.status(500).json({ message: emailResult.Message, isError: emailResult.IsError });
            }
        } else {
            return res.status(generateWinnerResult.Status).json({ message: generateWinnerResult.Message, isError: generateWinnerResult.IsError });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error en el servidor: ${error.message}`, isError: 1 });
    }
};