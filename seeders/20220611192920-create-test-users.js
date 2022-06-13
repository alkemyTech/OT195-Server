"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Manuel",
          lastName: "Conde",
          email: "mconde@test.com",
          password:
            "$2a$10$xB1NFKBvOTEg6OoaaOqYn.ZkLS7oC5fL7/ceUqYXBXXZepcKBVtKm",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Abel",
          lastName: "Castrillón",
          email: "acastrillon@test.com",
          password:
            "$2a$10$GJ/e0KEkVkQ4u5iD7nWikuwogBUdLGdfe62JV7LQSfaODBay2BBCO",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Susana",
          lastName: "Herrera",
          email: "sherrera@test.com",
          password:
            "$2a$10$.omuQcz9siu/6wPcaGL5W.7SG1QtbIu5qDAmDvEBHqKrtmNp14XtW",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Cesar",
          lastName: "Sallent",
          email: "csallent@test.com",
          password:
            "$2a$10$Ht38CE0Bt9s2P3F858XWeOi2dl7Quwf2faSep0ktwzZk42FHC67RK",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Beatriz",
          lastName: "Medina",
          email: "bmedina@test.com",
          password:
            "$2a$10$3uS2S/Ad3XjsvWshGGH4n.WQsNnZj1YuZKlp0LMZhg.Bhwf8/aFqe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Hector",
          lastName: "Pascual",
          email: "hpascual@test.com",
          password:
            "$2a$10$8vLoOK67qb7Rinz1li670OVG0cqGujc/yb7zKiSX0yGFbon.wI58C",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Angel",
          lastName: "Santos",
          email: "asantos@test.com",
          password:
            "$2a$10$zbG85RQ0LBrRgt9.5S7BlOBCgDaktn7nqjRl6zpvA4xQuPOrV5ylm",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Máximo",
          lastName: "Cozzetti",
          email: "mcozzetti@test.com",
          password:
            "$2a$10$XJD/ej3Nudms.qjcfzIMxubGzF8rtaXgzHy1Qktso5BzhUZLua5QC",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Rafael",
          lastName: "Marquez",
          email: "rmarquez@test.com",
          password:
            "$2a$10$402FKhLBjNog4nohx9.xVeLG2zqTdl7ClDgjibhWcCXZXHYRHtsT.",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Elena",
          lastName: "Diaz",
          email: "ediaz@test.com",
          password:
            "$2a$10$E4i89i3cntIRvgqKXsp/aORUwz7d.ll5W2qqL2XuPkvoR4A/msOz2",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Raquel",
          lastName: "Romero",
          email: "rromero@test.com",
          password:
            "$2a$10$P8RBH2ImRms67pc691NXqevRkHXBgv68czZs1lFyFQ3qKvb3kOvda",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "María Soledad",
          lastName: "Saez",
          email: "msaez@test.com",
          password:
            "$2a$10$8cT3QQaytxqetDNmVr9oHuecqtKjmGyKOncyBs.Drx7KDXRDmUkS2",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Ángeles",
          lastName: "Gimenez",
          email: "agimenez@test.com",
          password:
            "$2a$10$4Dcixp8PX.eAYi86pHKxQuV.O2TipJwJk66f5YYeUMIBKQJAXzruC",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daniel",
          lastName: "Duran",
          email: "dduran@test.com",
          password:
            "$2a$10$WM8sjgiP0BzEpdKhocxZH.I8tbRspINeqNvDLXFIsyUcM0PM4W.4G",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Antonio",
          lastName: "Pandolfini",
          email: "apandolfini@test.com",
          password:
            "$2a$10$m1yRFuwRLVHQhYB1ftsCeOlToHRsCrJMkibTSSaoXit7eD8O6JfJG",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Martin",
          lastName: "Sosa",
          email: "msosa@test.com",
          password:
            "$2a$10$lKYoe2SR3iaN3tCqbKQ7v.hYXo8lUJJH6oCupeM1ZuKhie3Snpxbi",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Pablo",
          lastName: "Gallardo",
          email: "pgallardo@test.com",
          password:
            "$2a$10$yjBjsHvke0N82hQx4xvNVuZCOMlE08vcPLO4kKkNX5KryJ6XajRKC",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Tomás",
          lastName: "Vega",
          email: "tvega@test.com",
          password:
            "$2a$10$caf8rwxp531UeVXUCU2x8.1JI3wJdYnze84WC6jH08FUA8eQ7oNPa",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "José",
          lastName: "Aguilar",
          email: "jaguilar@test.com",
          password:
            "$2a$10$6E.sVz55eQdQUUZc/0uFFeUGg4k.MrCoUANsL4Y30MkCBfjhvPiE6",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Oscar",
          lastName: "Cabrera",
          email: "ocabrera@test.com",
          password:
            "$2a$10$nu4J9oMB0GsFHLDJRNeMluMl7hiT.i3Ti9LivQDLmwBpw7/kJ9pmu",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
