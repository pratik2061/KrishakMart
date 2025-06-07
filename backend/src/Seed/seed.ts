import bcrypt from "bcryptjs";
import prisma from "../Db/db.config";
import { Role } from "@prisma/client";

const seedAdminData = async () => {
  try {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err || !salt) {
        console.log("Error while generating salt", err);
      } else {
        bcrypt.hash("password123", salt, async (err, hash) => {
          if (err || !hash) {
            console.log("Error while hashing password", err);
          } else {
            await prisma.user.create({
              data: {
                name: "admin",
                email: "admin@gmail.com",
                password: hash,
                address: "butwal",
                contact: "9822337423",
                role:Role.ADMIN,
              },
            });
            console.log("Admin data seeded successfully");
          }
        });
      }
    });
  } catch (error) {
    console.log("Error while seeding admin data", error);
  } finally {
    await prisma.$disconnect();
  }
};

const seedFarmerData = async () => {
  try {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err || !salt) {
        console.log("Error while generating salt", err);
      } else {
        bcrypt.hash("password123", salt, async (err, hash) => {
          if (err || !hash) {
            console.log("Error while hashing password", err);
          } else {
            await prisma.user.create({
              data: {
                name: "farmer",
                email: "farmer@gmail.com",
                password: hash,
                address: "butwal",
                contact: "9877384733",
                role:Role.FARMER,
                farmer:{
                  create:{
                    farmName:"Hari Krishi Farm",
                    farmAddress:"Nayamil"
                  }
                }
                }
            });
            console.log("Farmer data seeded successfully");
          }
        });
      }
    });
  } catch (error) {
    console.log("Error while seeding Farmer data", error);
  } finally {
    await prisma.$disconnect();
  }
};

const seedConsumerData = async () => {
  try {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err || !salt) {
        console.log("Error while generating salt", err);
      } else {
        bcrypt.hash("password123", salt, async (err, hash) => {
          if (err || !hash) {
            console.log("Error while hashing password", err);
          } else {
            await prisma.user.create({
              data: {
                name: "consumer",
                email: "consumer@gmail.com",
                password: hash,
                address: "butwal",
                contact: "9842354236",
                role:Role.CONSUMER,
              },
            });
            console.log("Consumer data seeded successfully");
          }
        });
      }
    });
  } catch (error) {
    console.log("Error while seeding consumer data", error);
  } finally {
    await prisma.$disconnect();
  }
};
seedAdminData();
// seedFarmerData();
// seedConsumerData();
