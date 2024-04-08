import knex from "../lib/knex.js";
import { Model } from "objection";

Model.knex(knex);

class user extends Model {
    static get tableName() {
        return "users";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["firstname", "lastname", "email", "password"],
            properties: {
                id: { type: "integer" },
                firstname: { type: "string", minLength: 1, maxLength: 255 },
                lastname: { type: "string", minLength: 1, maxLength: 255 },
                email: { type: "string", minLength: 1, maxLength: 255 },
                password: { type: "string", minLength: 1, maxLength: 255 },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        };
    }
}