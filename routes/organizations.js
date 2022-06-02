var express = require('express');
var router = express.Router();

/* GET Organizatios public listing. */
router.get('/1/public', function (req, res, next) {
  // Public data
  const data = {
    name: "Somos Mas",
    image: "/images/logo.png",
    phone: "1160112988",
    address: "",
    email: "somosfundacionmas@gmail.com",
    instagramURL: "www.instagram.com/alkemy__/",
    facebookURL: "www.facebook.com/AlkemyLATAM/",
    welcomeTitle: "Hola! Bienvenidx",
    welcomeText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dignissim ac et eleifend lacus, rhoncus, dignissim sagittis. Tellus ac a, elementum ut. Tellus a morbi tincidunt ultricies malesuada eget turpis. Lacus enim non enim, velit hac turpis interdum arcu. Suspendisse at vel ultrices amet orci enim lectus porttitor ut.",
    news: [{
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
  res.status(200).json({
    results: data,
    ok: true
  });
});



module.exports = router;