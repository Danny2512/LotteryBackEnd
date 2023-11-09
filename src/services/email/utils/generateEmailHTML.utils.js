export const generateEmailHTML = (urlLogo, name, paragraph1, paragraph2 = null, paragraph3 = null, buttons = null, paragraph4, urlLogoFooter) => {
    return `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <style>
        * {
            font-family: 'Google Sans', sans-serif;
        }
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto';
            background: #777;
        }
        .container {
            padding-top: 2rem;
            width: 100%;
            margin: auto;
            max-width: 500px;
            background: #fff;
        }
        .logo {
            display: block;
            width: 150px;
            margin: 0 auto 2rem;
        }
        .body {
            padding: 2rem 0;
            border-radius: 6vh;
            background: #fff;
            width: 100%;
            border: 2px dashed #057dc2;
        }
        .greeting {
            display: block;
            width: 100%;
            margin: 0 auto 1rem;
            text-align: center;
            font-size: 1rem;
            font-weight: 400;
            color: #323942;
        }
        .name {
            display: block;
            width: 100%;
            margin: 0 auto 1rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 900;
            color: #057dc2;
        }
        .code-label {
            display: block;
            width: 90%;
            margin: 0 auto;
            text-align: center;
            font-size: 1rem;
            font-weight: 400;
            color: #323942;
        }
        .code {
            display: block;
            width: 100%;
            margin: 20px auto;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 900;
            color: #06853C;
        }
        .expiration-label {
            display: block;
            width: 90%;
            margin: 0 auto ;
            text-align: center;
            font-size: 1rem;
            font-weight: 400;
            color: #323942;
        }
            .important-message {
            width: 100%;
            margin: 1rem 0;
            background: #057dc2;
            padding: 1rem 0;
        }
            .message-label {
            display: block;
            width: 90%;
            margin: 0 auto;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            color: #fff;
        }
            .footer-logo {
            display: block;
            margin: auto;
        }
        .footer-links {
            text-align: center;
            font-size: 0.8rem;
            color: #323942;
            margin-top: 1rem;
        }
        .footer-links a {
            color: #323942;
            margin: 0 0.5rem;
            font-size: 1rem;
            font-weight: 600;
        }
        .footer-accounts {
            text-align: center;
            font-size: 1rem;
            color: #323942;
            margin-top: 1rem;
        }
        .footer-accounts a {
            text-decoration: none;
            color: #323942;
            margin: 0 1rem;
            font-size: 1rem;
            font-weight: 600;
        }
        .footer-Copyright {
            text-align: center;
            color: #323942;
            padding: 1vh;
            height: 40px;
            background: transparent;
            font-size: 0.7rem;
        }
        .template_button {
            text-decoration: none;
            text-align: center;
            display: block;
            position: relative;
            width: 200px;
            max-width: 100%;
            margin: 3vh auto;
            background: #e49b2c;
            color: #fff !important;
            border: none;
            border-radius: 2vh;
            font-size: 1rem;
            font-weight: 600;
            padding: .8rem;
            cursor: pointer;
            transition: .5s;
        }
        .template_button:hover {
            background: #292D60;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="logo" src="${urlLogo}" alt="Image Cod" draggable="false">
          <div class="body">
            <label class="greeting">Hola</label>
            <label class="name">${name}</label>
            <label class="code-label">${paragraph1}</label>
            ${paragraph2 ? `<label class="code">${paragraph2}</label>` : ''}
            ${paragraph3 ? `<label class="expiration-label">${paragraph3}</label>` : ''}
            ${buttons ? buttons : ''}
            <div class="important-message">
              <label class="message-label">${paragraph4}</label>
            </div>
            ${urlLogoFooter ? `<img class="footer-logo" src="${urlLogoFooter}" alt="Logo Cotrafa Social" draggable="false">` : ''}
            <div class="footer-accounts">
              <a href="https://www.facebook.com/CotrafaSocial/" draggable="false">
                <img src="https://i.postimg.cc/7fM20f7Y/Facebook.png" alt="Facebook" draggable="false" width="30">
              </a>
              <a href="https://www.instagram.com/cotrafa_social/" draggable="false">
                <img src="https://i.postimg.cc/zHHsbyfJ/Instagram.png" alt="Instagram" draggable="false" width="30">
              </a>
              <a href="https://api.whatsapp.com/send/?phone=573117641389&text=Hola,%20estoy%20tramitando%20una%20afiliaci%C3%B3n%20digital%20%E2%9C%8C%F0%9F%93%8B%20y%20necesito%20tu%20ayuda%20%F0%9F%98%80" draggable="false">
                <img src="https://i.postimg.cc/JDzDLLz3/Whatsapp.png" alt="Whatsapp" draggable="false" width="30">
              </a>
            </div>
            <div class="footer-links">
              <a href="https://www.cotrafasocial.com/proteccion-de-datos/" draggable="false">Política de tratamiento de datos</a>
            </div>
            <div class="footer-Copyright">Copyright &reg; 2023 Cotrafa Social. Todos los derechos reservados.</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }