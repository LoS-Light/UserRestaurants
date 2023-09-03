import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Restaurant from "./restaurant.entity";

@Entity({ name: "restaurant_profiles" })
export default class RestaurantProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 32, nullable: false })
    location: string;

    @Column({ name: "google_map", type: "varchar", length: 2048, nullable: false })
    googleMap: string;

    @Column({ type: "varchar", length: 32, nullable: false })
    phone: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToOne(() => Restaurant, res => res.profile, { nullable: false })
    @JoinColumn({ name: "restaurant_id" })
    restaurant: Restaurant;
}