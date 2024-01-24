import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import path from 'path';
import url from 'url';
import { MultiSamlStrategy, SAML } from 'passport-saml';
import Web3 from 'web3';
import crypto from 'crypto';

dotenv.config();

const port: string | number = process.env.PORT || 3000;
const callbackBaseUrl: string =
  process.env.CALLBACK_BASE_URL || `http://localhost:${port}/`;
let samlSpKey: string | null = null;
if (typeof process.env.SAML_SP_KEY !== 'undefined') {
  samlSpKey = `-----BEGIN PRIVATE KEY-----\n${process.env.SAML_SP_KEY}\n-----END PRIVATE KEY-----`;
}
let samlSpCert: string | null = null;
if (typeof process.env.SAML_SP_CERT !== 'undefined') {
  samlSpCert = `-----BEGIN CERTIFICATE-----\n${process.env.SAML_SP_CERT}\n-----END CERTIFICATE-----`;
}
const multipleSamlStrategy = new MultiSamlStrategy(
  {
    passReqToCallback: true,
    getSamlOptions: function (request, done) {
      findProvider(request, function (err, provider) {
        if (err) {
          return done(err);
        }
        return done(null, provider);
      });
    },
  },
  function (req: any, profile: any, done: any) {
    const user: any = {};
    return done(null, user);
  }
);

function findProvider(
  request: any,
  callback: (err: any, provider: any) => void
) {
  const config = idpConfigs['idp1'];
  callback(null, config);
}

const idpConfigs = {
  idp1: {
    callbackUrl: url.resolve(callbackBaseUrl, 'saml/login/callback'),
    entryPoint: process.env.SAML_ENTRY_POINT,
    issuer: process.env.ISSUER || '',
    cert: process.env.SAML_IDP_CERT || '',
    decryptionPvk: samlSpKey || '',
  },
  idp2: {
    callbackUrl: url.resolve(callbackBaseUrl, 'saml/login/callback'),
    entryPoint: process.env.SAML_ENTRY_POINT,
    issuer: process.env.ISSUER_SECOND || '',
    cert: process.env.SAML_IDP_CERT_SECOND || '',
    decryptionPvk: samlSpKey || '',
  },
};

passport.use(multipleSamlStrategy);
passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex'),
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

app.get(
  '/',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })
);

app.get('/logout', function (req: express.Request, res: express.Response) {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      res.redirect('/error');
    } else {
      res.redirect(process.env.LOGOUT_URL || '/');
    }
  });
});

app.get('/saml/login', (req, res, next) => {
  console.log('Received a request to /saml/login');
  passport.authenticate('saml')(req, res, next);
  console.log('End a request to /saml/login');
});

app.post(
  '/saml/login/callback',
  passport.authenticate('saml', { failureRedirect: '/' }),
  function (req: express.Request, res: express.Response) {
    const walletCreated = createWallet();
    if (walletCreated) {
      res
        .status(201)
        .send(`Wallet created with address: ${walletCreated.address}`);
    } else {
      res
        .status(500)
        .send('Failed to create wallet for the authenticated user.');
    }
  }
);

function createWallet(): { address: string; privateKey: string } {
  const web3 = new Web3();
  const account = web3.eth.accounts.create();
  console.log(`Created wallet with address: ${account.address}`);
  return { address: account.address, privateKey: account.privateKey };
}

app.get('/saml/metadata', (req, res) => {
  multipleSamlStrategy._options.getSamlOptions(
    req,
    (err: Error | null, samlOptions: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error obtaining SAML options');
      }
      const samlObj = new SAML(samlOptions);
      const metadata = samlObj.generateServiceProviderMetadata(samlSpCert);
      res.type('application/xml').send(metadata);
    }
  );
});

app.listen(Number(port), '0.0.0.0', () =>
  console.log(`Listening on port ${port}`)
);
