import './config/env'
import './database'
import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { xframe, xssProtection } from 'lusca'
import compression from 'compression'
import methodOverride from 'method-override'
import expressFlash from 'express-flash'
import session from 'express-session'
import flash from 'connect-flash'
import { engine } from 'express-handlebars'
import { join } from 'path'
import MongoStore from 'connect-mongo'
import headers from './middlewares/headers'
import homeRoutes from './routes/home.routes'
import productRoutes from './routes/product.routes'
import requestFlash from './middlewares/request-flash'
import error404 from './middlewares/error-404'
import { PORT, SECRET_SESSION, MONGODB_URL } from './config/constants'

// Initialize the server
const app = Express()

// Configure the server
app.set('port', PORT)
app.set('views', join(__dirname, 'views'))
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Middlewares
app.use(Express.static(join(__dirname, 'public')))
app.use(headers)
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(methodOverride('_method'))
app.use(expressFlash())
app.use(xframe('SAMEORIGIN'))
app.use(xssProtection(true))
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: MONGODB_URL })
  })
)
app.use(flash())
app.use(requestFlash)

// Routes
app.use(homeRoutes)
app.use(productRoutes)
app.use(error404)

export default app
