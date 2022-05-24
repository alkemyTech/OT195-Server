var express = require('express');
var router = express.Router();

/* GET Organizatios public listing. */
router.get('/1/public', function (req, res, next) {
  // Public data
  const data = {
    name: "Somos Mas",
    image: "/images/logo.png",
    phone: "",
    address: "",
    welcomeText: "Hola! Bienvenidx",
    news: [
      {
        image: '/images/latest-01.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur laborum distinctio magnam inventore dicta aut molestias dolorum harum ut.',
        link: '/'
      },
      {
        image: '/images/latest-02.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur laborum distinctio magnam inventore dicta aut molestias dolorum harum ut.',
        link: '/'
      },
      {
        image: '/images/latest-03.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur laborum distinctio magnam inventore dicta aut molestias dolorum harum ut.',
        link: '/'
      },
      {
        image: '/images/latest-04.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur laborum distinctio magnam inventore dicta aut molestias dolorum harum ut.',
        link: '/'
      },
      {
        image: '/images/latest-05.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur laborum distinctio magnam inventore dicta aut molestias dolorum harum ut.',
        link: '/'
      },
    ]
  };
  res.status(200).json(data);
});



module.exports = router;