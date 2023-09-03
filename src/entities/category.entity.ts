import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Restaurant from "./restaurant.entity";

@Entity({ name: "categories" })
export default class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true, nullable: false })
    name: string;

    @OneToMany(() => Restaurant, res => res.category)
    restaurants: Restaurant[];
}