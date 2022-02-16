import Product from '../models/product'

export const index = async (req, res) => {
  const products = await Product.find().lean()
  res.render('products/index', {
    title: 'Productos',
    products
  })
}

export const create = (req, res) => {
  res.render('products/create', {
    title: 'Creacion del producto',
  })
}

export const store = async (req, res) => {
  const { name, description, price, quantity } = req.body
  const slug = `${name.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 100)}`
  const images = req.files.map(({ filename }) => filename)

  await Product.create({
    name,
    description,
    price,
    quantity,
    slug,
    images
  })
  
  req.flash('success_message', 'Producto creado correctamente')
  res.redirect('/products')
}

export const find = async (req, res) => {
  const { slug } = req.body
  const product = await Product.findOne({ slug }).lean()
  
  if(!product) {
    req.flash('error_message', 'Producto no encontrado')
    return res.redirect('/products')
  }

  req.flash('success_message', 'Producto encontrado')
  res.redirect(`/products/${product.slug}/show`)
}

export const show = async (req, res) => {
  const { slug } = req.params
  const product = await Product.findOne({ slug }).lean()
  res.render('products/show', {
    title: `Visualizando el producto ${product.name}`,
    product,
  })
}

export const edit = async (req, res) => {
  const { slug } = req.params
  const product = await Product.findOne({ slug }).lean()
  res.render('products/edit', {
    title: 'Editar producto',
    product,
  })
}

export const update = async (req, res) => {
  const { slug } = req.params
  await Product.findOneAndUpdate({ slug }, req.body)

  if(req.files.length > 0) {
    const images = req.files.map(({ filename }) => filename)
    await Product.findOneAndUpdate({ slug }, {
      $push: { images: { $each: images } }
    })
  }

  req.flash('success_message', 'Producto editado correctamente')
  res.redirect('/products')
}

export const destroy = async (req, res) => {
  const { slug } = req.params
  await Product.findOneAndDelete({ slug })
  req.flash('success_message', 'Producto eliminado correctamente')
  res.redirect('/products')
}