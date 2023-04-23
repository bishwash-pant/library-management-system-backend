"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const seed_user_1 = require("./utils/seed-user");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
        };
        try {
            mongoose_1.default.connect(process.env.DB_URL, options);
            console.log("Connected to MongoDB database");
            setTimeout(seed_user_1.seedSuperAdmin, 2000);
        }
        catch (e) {
            console.log("Error connecting to MongoDB database");
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map