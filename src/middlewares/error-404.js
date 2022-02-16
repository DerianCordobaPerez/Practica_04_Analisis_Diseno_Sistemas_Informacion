export default function error404 (req, res) {
  res.render('errors/404', {
    title: '404',
  })
}