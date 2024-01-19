import dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import path from 'path';
import url from 'url';
import { Strategy as SamlStrategy } from 'passport-saml';

const port: string | number = process.env.PORT || 3000;
const callbackBaseUrl: string =
  process.env.CALLBACK_BASE_URL || `http://localhost:${port}/`;
let samlSpKey: string | null = null;
if (typeof process.env.SAML_SP_KEY !== 'undefined') {
  samlSpKey = `-----BEGIN PRIVATE KEY-----\n${process.env.SAML_SP_KEY}\n-----END PRIVATE KEY-----`;
}
let samlStrategy = new SamlStrategy(
  {
    callbackUrl: url.resolve(callbackBaseUrl, 'saml/login/callback'),
    entryPoint: process.env.SAML_ENTRY_POINT,
    issuer: process.env.ISSUER || 'saml-wallet-backend',
    cert: process.env.SAML_IDP_CERT || '',
    decryptionPvk: samlSpKey || '',
  },
  function (profile: any, done: any) {
    let user: any = {};
    user.saml = profile;
    user.saml.assertionXml = profile.getAssertionXml();
    done(null, user);
  }
);
passport.use(samlStrategy);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

let app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req: express.Request, res: express.Response) {
  res.status(200).send('Hello');
});

app.get('/logout', function (req: express.Request, res: express.Response) {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect(process.env.LOGOUT_URL || '/');
  });
});

app.get('/saml/login', passport.authenticate('saml'));

app.post(
  '/saml/login/callback',
  passport.authenticate('saml', { failureRedirect: '/' }),
  function (req: express.Request, res: express.Response) {
    let walletCreated = createWallet((req.user as any).saml);
    if (walletCreated) {
      res.send('Wallet successfully created for the authenticated user.');
    } else {
      res.send('Failed to create wallet for the authenticated user.');
    }
  }
);

function createWallet(user: any): boolean {
  console.log(`Creating wallet for user: ${user}`);
  return true;
}

app.get(
  '/saml/metadata',
  function (req: express.Request, res: express.Response) {
    let samlSpCert: string | null = null;
    if (typeof process.env.SAML_SP_CERT !== 'undefined') {
      samlSpCert = `-----BEGIN CERTIFICATE-----\n${process.env.SAML_SP_CERT}\n-----END CERTIFICATE-----`;
    }
    res.type('application/xml');
    res.send(samlStrategy.generateServiceProviderMetadata(samlSpCert));
  }
);

app.listen(Number(port), '0.0.0.0', () =>
  console.log(`Listening on port ${port}`)
);
