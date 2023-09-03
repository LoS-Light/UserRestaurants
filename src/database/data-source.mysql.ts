import { DataSource } from "typeorm";
import { DbMysqlConfig } from "../env.config";

export const DbMysql = new DataSource(DbMysqlConfig);