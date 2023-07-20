import { pool } from '../db.js';
import pkg from 'body-parser';
import express, { response } from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { fileURLToPath } from 'url'; // Importa el método fileURLToPath
import multer from 'multer';

let nombre_archivo;
const { json, urlencoded } = pkg;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

  

  // Crear una función para convertir una ruta base64 a un buffer
function base64ToBuffer(base64) {
    // Eliminar el prefijo "data:image/jpeg;base64,"
    const data = base64.replace(/^data:image\/jpeg;base64,/, '');
    // Convertir la cadena base64 a un buffer binario
    const buffer = Buffer.from(data, 'base64');
    // Retornar el buffer
    return buffer;
  }

  // Crear una función para crear un objeto File a partir de un buffer
function bufferToFile(buffer, name) {
    // Crear un objeto File con el buffer, el nombre y el tipo MIME
    const file = new File([buffer], name, { type: 'image/jpeg' });
    // Retornar el objeto File
    return file;
  }

// Obtiene la ruta absoluta del módulo actual
const __dirname = fileURLToPath(import.meta.url);

var usuario, email_, randomNumber;

const oauth2Client = new google.auth.OAuth2(
    // Client ID
    '991258058074-9ghhhbgfvpsm093kjk2e9jvk3s78h4ln.apps.googleusercontent.com',
    // Client Secret
    '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',
    // Redirect URL
    'https://developers.google.com/oauthplayground'
);

// Set credentials and tokens
oauth2Client.setCredentials({
    refresh_token: '1//04Hz1-w1t4AZYCgYIARAAGAQSNgF-L9IrZq0eFKH8TCicplSYTlYrF3w24s6BuuD__COV3jr8fmtimlzWQFT8DLWqocg_0OReJg'
});

// Create transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'esoils.inc@gmail.com',
        clientId: oauth2Client._clientId,
        clientSecret: oauth2Client._clientSecret,
        refreshToken: oauth2Client.credentials.refresh_token,
        accessToken: oauth2Client.credentials.access_token,
        expires: oauth2Client.credentials.expiry_date
    }
});

export const rutaPrincipal = async (req, res) => {
    res.send("hola mundo :D");
};

//#region FUNCTIONS


export const postRegistro_Usuario1 = async (req, res) => {
    try {
        randomNumber = crypto.randomInt(10000, 100000);
        email_ = req.body.email;
        usuario = {
            id_number: req.body.id_number, 
            name: req.body.name, 
            surname: req.body.surname, 
            email: email_,
            password: req.body.password, 
            randomNumber: randomNumber
        };
        const emailTemplate = {
            from: 'esoils.inc@gmail.com',
            to: email_,
            subject: 'Código de verificación',
            body: 'Verificación de dispositivo',
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="esd-header-popover es-header" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <h1 style="font-family: Garamond, serif; text-align: center; color: black;"><b>Código de verificación de registro en E Soils</b></h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="font-family: Garamond, serif; font-size: 20px; color:black;">Estimado usuario:<br>Ha solicitado registrarse en nuestro sitio web E Soils utilizando su dirección de correo electrónico. Para completar su registro, introduzca el siguiente código de verificación en nuestro sitio web:</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="esd-footer-popover es-footer" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <p style="font-family: Garamond, serif; font-size: 20px;"><b>`+ usuario.randomNumber + `</b></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="font-family: Garamond, serif; font-size: 20px;">Si no ha solicitado este código, ignore este correo electrónico. No comparta este código con nadie. Ha recibido este correo electrónico porque introdujo esta dirección de correo electrónico en el formulario de registro de nuestro sitio web. Si cree que se trata de un error, póngase en contacto con nosotros para comunicárnoslo. Gracias por elegir E Soils, la mejor plataforma para la gestión de datos de&nbsp;suelos.<br><br>Atentamente,</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left" style="bottom:20px">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://i.pinimg.com/originals/a4/a0/87/a4a087873d12e2fd6bbe74cf9e30ec77.png" alt style="display: block;" width="200"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
            `
        };

        // Send email
        transporter.sendMail(emailTemplate, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Email sent: ' + info.response);
                return res.json(usuario);
            }
        });

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
};
export const postRegistro_Usuario2 = async (req, res) => {
    usuario=req.body;
    const resultado = await pool.query(`
    INSERT INTO clientes (
        idcli, names_, surnamecli, emailcli, passwordcli)        
        VALUES ('${usuario.id_number}', '${usuario.name}', '${usuario.surname}', '${usuario.email}', '${usuario.password}')`
    );

    if (resultado) return res.status(200).json(resultado.rows[0])
}



// Manejo de la solicitud POST para obtener los datos del formulario Suelos
export const exportIde_suelo = async (req, res, next) => {
    try {
        //suelo = generateUniqueID();
        res.redirect("http://127.0.0.1:5500/PAGINAS/Fisicas-1.html");
        res.redirect("http://127.0.0.1:5500/PAGINAS/Biologicas-1.html");
        res.redirect("http://127.0.0.1:5500/PAGINAS/Quimicas-1.html");
        res.redirect("http://127.0.0.1:5500/PAGINAS/FinalizacionDelRegistro.html");

    }
    catch {
        console.error("Error en la consulta:", error);
        throw error;
    }
}
export const PostRegistro_Suelos = async (req, res) => {
    try {
        const {
            ide_suelo,idcli, codprov, codcan, soil_picture, altitude, latitude, length
        } = req.body;

        //var ide_suelo = generateUniqueID();

        //var idcli = usuario[0];
        //var idcli = "0401751227";

        console.log("El tipo es   ", soil_picture);

        var codprov1 = parseFloat(codprov);
        var codcan1 = parseFloat(codcan);

        //console.log(soil_picture);

        const resultado = await pool.query(`
        INSERT INTO registros_suelos (
            ide_suelo, idcli, codprov, codcan, soil_picture, altitude, latitude, length, active) 
            
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
            [
                ide_suelo, idcli, codprov1, codcan1, soil_picture, altitude, latitude, length, true
            ]
        );
        
        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
};

export const getNameUser = async (req, res) => {
    try {

        //var ide_suelo = generateUniqueID();

        //var idcli = usuario[0];
        //var idcli = "0401751227";



        //console.log(soil_picture);

        const resultado = await pool.query(`
        SELECT names_ FROM clientes WHERE idcli='${req.body.idcli}'`
        );
        const namecli = resultado.rows[0].verificar;
        console.log(namecli);
        return res.json(namecli);

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
};

// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Físicas
export const postFisicas = async (req, res) => {
    try {
        const { ide_suelo,
            apparent_density, real_density, relative_density, maximum_dry_density, compressive_strength,
            thermal_conductivity, liquid, plastic, silt, clay,
            gravel, sand, optimum_moisture_content, plasticity_index, grain_size,
            water_content, color, tensile_strength, porosity, initial_moisture,
            earring, ground_altitude, average_temperature, rainfall_regime
        } = req.body;
        console.log("!!!!!!!!!!!!codigo del suelo post fisicas "+ide_suelo);
        // Parsear los valores a float
        const apparentDensity1 = parseFloat(apparent_density);
        const realDensity1 = parseFloat(real_density);
        const relativeDensity1 = parseFloat(relative_density);
        const maximumDryDensity1 = parseFloat(maximum_dry_density);
        const compressiveStrength1 = parseFloat(compressive_strength);
        const thermal_conductivity1 = parseFloat(thermal_conductivity);
        const liquid1 = parseFloat(liquid);
        const plastic1 = parseFloat(plastic);
        const silt1 = parseFloat(silt);
        const clay1 = parseFloat(clay);
        const gravel1 = parseFloat(gravel);
        const sand1 = parseFloat(sand);
        const optimum_moisture_content1 = parseFloat(optimum_moisture_content);
        const plasticity_index1 = parseFloat(plasticity_index);
        const grain_size1 = parseFloat(grain_size);
        const water_content1 = parseFloat(water_content);
        //const color1 = parseFloat(color);
        const tensile_strength1 = parseFloat(tensile_strength);
        const porosity1 = parseFloat(porosity);
        const initial_moisture1 = parseFloat(initial_moisture);
        const earring1 = parseFloat(earring);
        const ground_altitude1 = parseFloat(ground_altitude);
        const average_temperature1 = parseFloat(average_temperature);
        const rainfall_regime1 = parseFloat(rainfall_regime);

        const resultado = await pool.query(`
        INSERT INTO physical_properties (ide_suelo,
            apparent_density, real_density, relative_density, maximum_dry_density,compressive_strength,
            thermal_conductivity, liquid, plastic, silt, clay,
            gravel, sand, optimum_moisture_content, plasticity_index, grain_size,
            water_content, color, tensile_strength, porosity, initial_moisture,
            earring, ground_altitude, average_temperature, rainfall_regime) 
            
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
        RETURNING *`,

            [   
                ide_suelo,
                apparentDensity1, realDensity1, relativeDensity1, maximumDryDensity1, compressiveStrength1,
                thermal_conductivity1, liquid1, plastic1, silt1, clay1,
                gravel1, sand1, optimum_moisture_content1, plasticity_index1, grain_size1,
                water_content1, color, tensile_strength1, porosity1, initial_moisture1,
                earring1, ground_altitude1, average_temperature1, rainfall_regime1
            ]
        );

        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}

// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Quimicas
export const postQuimicas = async (req, res) => {
    try {
        const {ide_suelo,
            alkalinity_or_acidity, organic_material, total_phosphorus,
            extractable_sulfur, interchangeable_aluminum, electric_conductivity, exchangeable_calcium,
            exchangeable_magnesium, exchangeable_potassium, exchangeable_sodium, extractable_copper,
            removable_iron, extractable_manganese, extractable_zinc, boron
        } = req.body;

        // Parsear los valores a float
        const alkalinity_or_acidity1 = parseFloat(alkalinity_or_acidity);
        const organic_material1 = parseFloat(organic_material);
        const total_phosphorus1 = parseFloat(total_phosphorus);
        const extractable_sulfur1 = parseFloat(extractable_sulfur);
        const interchangeable_aluminum1 = parseFloat(interchangeable_aluminum);
        const electric_conductivity1 = parseFloat(electric_conductivity);
        const exchangeable_calcium1 = parseFloat(exchangeable_calcium);
        const exchangeable_magnesium1 = parseFloat(exchangeable_magnesium);
        const exchangeable_potassium1 = parseFloat(exchangeable_potassium);
        const exchangeable_sodium1 = parseFloat(exchangeable_sodium);
        const extractable_copper1 = parseFloat(extractable_copper);
        const removable_iron1 = parseFloat(removable_iron);
        const extractable_manganese1 = parseFloat(extractable_manganese);
        const extractable_zinc1 = parseFloat(extractable_zinc);
        const boron1 = parseFloat(boron);

        console.log(alkalinity_or_acidity1);

        const resultado = await pool.query(`
        INSERT INTO chemical_properties (ide_suelo,
            alkalinity_or_acidity, organic_material, total_phosphorus,
            extractable_sulfur, interchangeable_aluminum, electric_conductivity, exchangeable_calcium,
            exchangeable_magnesium, exchangeable_potassium, exchangeable_sodium, extractable_copper,
            removable_iron, extractable_manganese, extractable_zinc, boron) 
            
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
        RETURNING *`,
            [   
                ide_suelo,
                alkalinity_or_acidity1, organic_material1, total_phosphorus1,
                extractable_sulfur1, interchangeable_aluminum1, electric_conductivity1, exchangeable_calcium1,
                exchangeable_magnesium1, exchangeable_potassium1, exchangeable_sodium1, extractable_copper1,
                removable_iron1, extractable_manganese1, extractable_zinc1, boron1
            ]
        );

        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}
//#endregion


// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Biologicas
export const postBiologicas = async (req, res) => {
    try {
        const { ide_suelo,
            organisms_description,
            microbial_activity,
            microbial_intensity,
            microbial_description,
            biomass_method,
            biomass_results,
            biomass_description,
            macroinvertebrates_description,
            average_depth,
            measurement_method,
            additional_remarks,
        } = req.body;

        //var ide_suelo = "SOILRRDSQw";

        // Parsear los valores a float
        const average_depth1 = parseFloat(average_depth);
        const biomass_results1 = parseFloat(biomass_results);

        const resultado = await pool.query(`
        INSERT INTO biological_properties (
            ide_suelo, organisms_description, microbial_activity, microbial_intensity,
            microbial_description, biomass_method, biomass_results, biomass_description,
            macroinvertebrates_description, average_depth, measurement_method, 
            additional_remarks
            ) 
            
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
        RETURNING *`,

            [
                ide_suelo, organisms_description, microbial_activity, microbial_intensity,
                microbial_description, biomass_method, biomass_results1, biomass_description,
                macroinvertebrates_description, average_depth1, measurement_method,
                additional_remarks
            ]
        );

        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}

// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Biologicas1
export const postBiologicas1 = async (req, res) => {
    try {
        console.log("--------------------ORGANISMOS-----------------");
        const { ide_suelo,
        organism,
        number_organism,
        } = req.body;

        console.log(organism, number_organism);
        // Parsear los valores a float
        const number_organism1 = parseFloat(number_organism);

        var orga = "organismmmmmmmm";
        var num = 9;
        const resultado = await pool.query(`
        INSERT INTO soil_organisms (
            ide_suelo, organism, number_organism) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
            [
                ide_suelo, organism, number_organism1
            ]
        );

        if (resultado) return res.status(200).json(resultado.rows[0])
        
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}

// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Biologicas1
export const postBiologicas2 = async (req, res) => {
    try {
        console.log("--------------------MACRO-----------------");
        const {
            ide_suelo,
            macroinvertebrates,
            number_macroinvertebrates
        } = req.body;

        // Parsear los valores a float
        const number_macroinvertebrates1 = parseFloat(number_macroinvertebrates);
        console.log("Number: " + number_macroinvertebrates1);

        const resultado = await pool.query(`
        INSERT INTO macroinvertebrates (
            ide_suelo, macroinvertebrates, number_macroinvertebrates
            ) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
            [
                ide_suelo, macroinvertebrates, number_macroinvertebrates1
            ]
        );
        if (resultado) return res.status(200).json(resultado.rows[0])
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}



// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Quimicas
export const postClasification = async (req, res) => {
    try {
        const {ide_suelo,
            orden, suborden, ggroup, sgroup, nomenclature
        } = req.body;

        const resultado = await pool.query(`
        INSERT INTO clasification (ide_suelo,
            orden, suborden, ggroup, sgroup)     
        VALUES ($1, $2, $3, $4, $5);
            `,
            [
                ide_suelo,
                orden, suborden, ggroup, sgroup
            ]
        );
        console.log("si termina clasificacion");
        if (resultado){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}

// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Quimicas
export const postNomenclature = async (req, res) => {
    try {
        const {
            ide_suelo,
            nomenclature
        } = req.body;
        console.log(ide_suelo,nomenclature);
        const resultado = await pool.query(`
        UPDATE registros_suelos SET nomenclature = $1 WHERE ide_suelo = $2
        `,
            [
                nomenclature,
                ide_suelo,
            ]
        );
        console.log("ejecuta hasta nomenclature");
        if (resultado){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
        //if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}




// Manejo de la solicitud POST para obtener los datos del formulario Propiedades Quimicas
export const postEditProfile = async (req, res) => {
    try {
        const { idcli,
            picture, names_, surname, emailcli, passwordcli
        } = req.body;

        console.log("El tipo es   ", picture);

        const resultado = await pool.query(`
        UPDATE INTO clientes (
            picture, names_, surname, passwordcli) 
            
        VALUES ($1, $2, $3, $4) 
        WHERE ($5 = $6)
        RETURNING *`,
            [
                picture, names_, surname, passwordcli,
                idcli, clientes.idcli
            ]
        );

        if (resultado) return res.status(200).json(resultado.rows[0])

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}



//#endregion
////////////////////////////////////////////////
//Intento para hacer el login
export const postIdUser = async (req, res) => {
    try {
        const {
            idcli, passwordcli
        } = req.body;
        console.log("si entra");
        const resultado = await pool.query(`
        SELECT verificar($1,$2);`,
            [
                idcli, passwordcli
            ]
        );
        const id_user = resultado.rows[0].verificar;
        console.log(id_user);
        return res.json(id_user);
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}

// Puedes definir el destino y el nombre de los archivos subidos usando la opción storage 


// Luego, creas un middleware de multer usando la opción storage const upload = multer({ storage: storage })

// Finalmente, puedes usar el middleware de multer en tu ruta donde recibes la imagen de Dropzone // En este caso, usamos “/guardarImg” como ruta y “file” como el nombre del campo del archivo 

// app.post("/guardarImg", upload.single("file"), function (req, res) { // Aquí puedes hacer lo que quieras con el archivo subido // Por ejemplo, enviar una respuesta al cliente 
//     res.send("Archivo guardado con éxito");
// })



// export const guardarImg = async (req, res) => {
//     try {
//         const fileName = req.file.filename;
// // Get the blob url from the container client
// const blobUrl = containerClient.getBlobUrl(fileName);
// // Send the blob url as a response

// // res.send(blobUrl);
//         return res.json(blobUrl);
//     } catch (error) {
//         console.error("Error en la consulta:", error);
//         throw error;
//     }
// }


export const numRegSuelAdd = async (req, res) => {
    try {

        const resultado = await pool.query(`
        SELECT COUNT(*)::text FROM registros_suelos
UNION
SELECT names_ FROM clientes WHERE idcli='${req.body.idcli}';
`
        );
        const num_suel_add1 = {
            numsuelo: resultado.rows[0].count,
            namecli: resultado.rows[1].count
        };
        console.log(num_suel_add1);
        return res.json(num_suel_add1);
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
}


/////////////////////////////////////////////////////
///////////Posible_codigo///////////////////////////
// export const postIdUser = async (req, res) => {
//     try {
//         const { idcli, passwordcli } = req.body;

//         console.log(idcli, passwordcli);
//         const resultado = await pool.query(
//             `
//         SELECT verificar($1, $2);
//       `,
//             [idcli, passwordcli]
//         );
//         const id_user = resultado.rows[0].verificar;

//         // Almacena el ID del usuario en la sesión
//         if (id_user != null) {
//             req.session.id_user = id_user;
//             //redireccionar a indexhtml
//         } else {
//             //regresa al login
//         }
        
        
//     } catch (error) {
//         console.error("Error en la consulta:", error);
//         throw error;
//     }
// }
