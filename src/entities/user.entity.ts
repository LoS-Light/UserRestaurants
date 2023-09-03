import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Restaurant from "./restaurant.entity";

@Entity({ name: "users" })
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 32, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 72, nullable: false })
    password: string;

    @Column({ name: "facebook_id", type: "varchar", length: 255, nullable: true })
    facebookId: string;

    @Column({ name: "google_id", type: "varchar", length: 255, nullable: true })
    googleId: string;

    @Column({ type: "varchar", length: 16, nullable: true })
    name: string;

    @OneToMany(() => Restaurant, rest => rest.user)
    restaurnts: Restaurant[];
}