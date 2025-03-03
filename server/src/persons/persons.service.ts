import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { User } from 'src/users/users.model';
import { CreatePersonDetalesDto } from './dto/create-person-detales.dto';
import { PersonDetales } from './person-detales.model';
import { OrgUnit } from 'src/org-unit/org-unit.model';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Op } from 'sequelize';
import { FavoritesService } from 'src/favorites/favorites.service';

const generateRandomNumber = (length: number): string => {
    //TODO вынести в хелперы
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

@Injectable()
export class PersonsService {
    constructor(
        @InjectModel(Person) private personRepository: typeof Person,
        @InjectModel(PersonDetales)
        private personDetalesRepository: typeof PersonDetales,
        @InjectModel(OrgUnit) private orgUnitRepository: typeof OrgUnit,
        private favoritesService: FavoritesService,
    ) {}

    async createPerson(dto: CreatePersonDto) {
        if (dto.isChef) {
            const orgUnit = await this.orgUnitRepository.findByPk(
                dto.orgUnitId,
            );

            if (!orgUnit) {
                throw new HttpException(
                    'OrgUnit с данным ID не найден',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (orgUnit.chefId) {
                throw new HttpException(
                    'В этом оргЮните уже назначен начальник',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const person = await this.personRepository.create(dto);

        // Генерация телефона и табельного номера, если они не переданы

        const formattedOrgUnitId = generateRandomNumber(2);
        const formattedPersonId = generateRandomNumber(2);

        person.phone =
            dto.phone ?? `343-${formattedOrgUnitId}-${formattedPersonId}`;
        person.table =
            dto.table ?? `${formattedOrgUnitId}-${formattedPersonId}`;

        await person.save();

        // Создание пустых записей в PersonDetales
        await this.personDetalesRepository.create({
            personId: person.id,
            items: '',
            hardware: '',
            software: '',
            exams: '',
        });

        if (dto.isChef) {
            const orgUnit = await this.orgUnitRepository.findByPk(
                dto.orgUnitId,
            );
            orgUnit.chefId = person.id;
            await orgUnit.save();
        }

        return person;
    }

    async getAllPersons() {
        const persons = await this.personRepository.findAll();
        return persons;
    }

    async getPersonById(id: string) {
        const role = await this.personRepository.findOne({ where: { id } });
        if (!role) {
            throw new HttpException(
                'Сотрудник с данным ID не найден',
                HttpStatus.BAD_REQUEST,
            );
        }
        return role;
    }

    async getPersonByEmail(email: string) {
        const role = await this.personRepository.findOne({
            where: { email },
            include: [{ all: true }, { model: User }, { model: PersonDetales }],
        });
        return role;
    }

    async createPersonDetales(dto: CreatePersonDetalesDto, personId: string) {
        const person = await this.getPersonById(personId);
        const personDetales = await this.personDetalesRepository.create({
            ...dto,
            personId: person.id,
        });
        return personDetales;
    }

    async getPersonDetalesById(personId: string) {
        const personDetales = await this.personDetalesRepository.findOne({
            where: { personId },
        });
        if (!personDetales) {
            throw new HttpException(
                'Детали для сотрудник с данным ID не найдены',
                HttpStatus.BAD_REQUEST,
            );
        }
        return personDetales;
    }

    async updatePersonDetalesById(
        dto: CreatePersonDetalesDto,
        personId: string,
    ) {
        const personDetales = await this.personDetalesRepository.findOne({
            where: { personId },
        });

        if (!personDetales) {
            throw new HttpException(
                'PersonDetales not found for this personId',
                HttpStatus.NOT_FOUND,
            );
        }

        await personDetales.update(dto);
        return personDetales;
    }

    async updatePerson(id: string, dto: UpdatePersonDto): Promise<Person> {
        try {
            const person = await this.personRepository.findByPk(id);
            if (!person) {
                throw new HttpException(
                    'Person not found',
                    HttpStatus.NOT_FOUND,
                );
            }

            // Обновление полей сотрудника
            await person.update(dto);

            if (dto.isChef !== undefined) {
                const orgUnit = await this.orgUnitRepository.findByPk(
                    person.orgUnitId,
                );

                if (!orgUnit) {
                    throw new HttpException(
                        'OrgUnit not found',
                        HttpStatus.BAD_REQUEST,
                    );
                }

                // Если сотрудник теперь начальник, устанавливаем его как chefId
                if (dto.isChef) {
                    // Обновляем всех сотрудников в этом OrgUnit, чтобы снять с них флаг isChef
                    await this.personRepository.update(
                        { isChef: false },
                        {
                            where: {
                                orgUnitId: person.orgUnitId,
                                id: { [Op.ne]: id },
                            },
                        },
                    );

                    orgUnit.chefId = person.id;
                } else {
                    // Если сотрудник больше не начальник, удаляем его из chefId
                    if (orgUnit.chefId === person.id) {
                        orgUnit.chefId = null;
                    }
                }

                await orgUnit.save();
            }

            return person;
        } catch (error) {
            console.error('Error updating person:', error);
            throw new HttpException(
                'Error updating person',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updatePersonAndDetales(
        id: string,
        updatePersonDto: UpdatePersonDto,
        updatePersonDetalesDto: CreatePersonDetalesDto,
    ): Promise<{ person: Person; personDetales: PersonDetales }> {
        const person = await this.updatePerson(id, updatePersonDto);
        const personDetales = await this.updatePersonDetalesById(
            updatePersonDetalesDto,
            id,
        );

        return { person, personDetales };
    }

    async deletePerson(id: string): Promise<boolean> {
        const person = await this.personRepository.findByPk(id, {
            include: [
                { model: User, attributes: ['email'] }, // Для проверки привязки к User
            ],
        });

        if (!person) {
            throw new HttpException(
                'Сотрудник с данным ID не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        // Проверка привязки к User по email
        const user = await User.findOne({ where: { email: person.email } });
        if (user) {
            throw new HttpException(
                'Невозможно удалить сотрудника, так как он привязан к пользователю.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Удаляем персону из всех списков избранного
        await this.favoritesService.removePersonFromAllFavorites(id);

        // Удаление сотрудника
        await person.destroy();
        return true;
    }

    async searchPersons(searchCriteria: {
        name?: string;
        phone?: string;
        location?: string;
    }) {
        const whereClause: any = {};

        if (searchCriteria.name) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${searchCriteria.name}%` } },
            ];
        }

        if (searchCriteria.phone) {
            whereClause.phone = { [Op.iLike]: `%${searchCriteria.phone}%` };
        }

        if (searchCriteria.location) {
            whereClause.location = {
                [Op.iLike]: `%${searchCriteria.location}%`,
            };
        }

        const persons = await this.personRepository.findAll({
            where: whereClause,
            include: [{ model: OrgUnit }], // Если нужно включать данные об оргюнитах
        });

        return persons;
    }
}
