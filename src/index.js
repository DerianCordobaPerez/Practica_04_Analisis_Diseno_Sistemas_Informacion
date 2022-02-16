import app from './server'

const main = async () => {
  const port = app.get('port')
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
