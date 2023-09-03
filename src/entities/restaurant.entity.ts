import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category.entity";
import RestaurantProfile from "./restaurant-profile.entity";
import User from "./user.entity";

@Entity({ name: "restaurants" })
export default class Restaurant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    name: string;

    @Column({ name: "name_en", type: "varchar", length: 30, nullable: false })
    nameEn: string;

    @Column({ type: "varchar", length: 2048, nullable: true })
    image: string;

    @Column({ type: "float", nullable: false, default: 0 })
    rating: number;

    @OneToOne(() => RestaurantProfile, pf => pf.restaurant)
    profile: RestaurantProfile;

    @ManyToOne(() => Category, cg => cg.restaurants, { nullable: false })
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToOne(() => User, user => user.restaurnts, { nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User;
}