import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import seedDataRests from '../seeds/restaurant.json';
import Category from '../../entities/category.entity';
import Restaurant from '../../entities/restaurant.entity';
import RestaurantProfile from '../../entities/restaurant-profile.entity';
import { IRestaurant } from '../../interfaces/restaurant.interface';
import User from '../../entities/user.entity';
import bcrpt from 'bcrypt';
import { getRandomChars } from '../../utils/random';


export default class Restaurants1691533956420 implements Seeder {
    track = false;

    private Users = [
        { email: 'user1@example.com', password: '12345678', rests: [1, 2, 3] },
        { email: 'user2@example.com', password: '12345678', rests: [4, 5, 6] },
    ]

    public async run(dataSource: DataSource): Promise<any> {
        for (const rest of seedDataRests.results) {
            const instanceCategory = await this.seedCategory(rest, dataSource);
            const instanceRestaurant = await this.seedRestaurant(rest, instanceCategory, dataSource);
            await this.seedProfile(rest, instanceRestaurant, dataSource);
        }
        await this.seedUsers(dataSource);
    }

    private async seedCategory(rest: IRestaurant, dataSource: DataSource) {
        const category = rest.category;
        const repoCategory = dataSource.getRepository(Category);
        let targetCategory = await repoCategory.findOne({ where: { name: category } });

        if (!targetCategory) {
            targetCategory = repoCategory.create({ name: category });
            await repoCategory.save(targetCategory);
        }
        return targetCategory;
    }

    private async seedRestaurant(rest: IRestaurant, instanceCategory: Category, dataSource: DataSource) {
        const name = rest.name;
        const repoRestaurant = dataSource.getRepository(Restaurant);
        const hasRestaurant = await repoRestaurant.exist({ where: { name: name } });

        if (!hasRestaurant) {
            const newRestaurant = repoRestaurant.create({
                name: rest.name,
                nameEn: rest.nameEn,
                image: rest.image,
                rating: rest.rating,
                category: instanceCategory,
                user: undefined
            });
            await repoRestaurant.save(newRestaurant);
            return newRestaurant;
        }
        return null;
    }

    private async seedProfile(rest: IRestaurant, instanceRestaurant: Restaurant | null, dataSource: DataSource) {
        if (instanceRestaurant) {
            const repoProfile = dataSource.getRepository(RestaurantProfile);
            const newProfile = repoProfile.create({
                location: rest.location,
                googleMap: rest.googleMap,
                phone: rest.phone,
                description: rest.description,
                restaurant: instanceRestaurant
            });
            await repoProfile.save(newProfile);
        }
    }

    private async seedUsers(dataSource: DataSource) {
        const repoUser = dataSource.getRepository(User);
        const repoRest = dataSource.getRepository(Restaurant);

        for (const item of this.Users) {
            const hasUser = await repoUser.exist({ where: { email: item.email } });
            if (hasUser) continue;

            const user = repoUser.create();
            user.name = `Guest${getRandomChars("0123456789", 5)}`;
            user.email = item.email;
            user.password = bcrpt.hashSync(item.password, 10);
            await repoUser.save(user);

            for (const id of item.rests) {
                const rest = await repoRest.findOne({ where: { id: id } }) as Restaurant;
                rest.user = user;
                await repoRest.save(rest);
            }
        }
    }
}