import './config/env'
import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { xframe, xssProtection } from 'lusca'
import compression from 'compression'
import methodOverride from 'method-override'
import expressFlash from 'express-flash'
import session from 'express-session'
import { engine } from 'express-handlebars'
import { join } from 'path'
import headers from './middlewares/headers'
import homeRoutes from './routes/home.routes'
import { PORT, SESSION_SECRET } from './config/constants'

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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// Routes
app.use(homeRoutes)

export default app
