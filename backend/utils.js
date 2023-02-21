import dotenv from "dotenv";

dotenv.config({
    path: `${process.cwd()}/.env.${process.env.NODE_ENV || "development"}.local`
});

if(process.env.NODE_ENV === "development"){
    console.log(1)
}